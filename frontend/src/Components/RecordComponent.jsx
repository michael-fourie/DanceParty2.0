import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';
import axios from "axios";
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import Loader from 'react-loader-spinner';

//import Analyze from "../scripts/Analyze"

import {init, loop, predict, startPredicting, stopPredicting } from "../scripts/Analyzetest.js";

import Button from "@material-ui/core/Button"

var poses = [];
var times = [];
var time = 0;
var i = 0;
//let vid;

const useStyles = makeStyles(theme => ({
    control: {
        padding: theme.spacing(2)
    }
}))

let modelObj;



const constraints = {
    audio: false,
    video: {
        facingMode: "user"
    }
};

let recordedChunks = [];
let mediaRecorder;


function RecordComponent(props) {

    //let vid;
    
    const classes = useStyles();

    const [isRecording, setIsRecording] = useState(false);
    const [videoStream, setVideoStream] = useState();

    const [isCamera, setIsCamera] = useState(false);
    const [fileReady, setFileReady] = useState(false);
    const [finishedRecording, setFinishedRecording] = useState(false);
    const [moves, setMoves] = useState();
    const [startTime, setStartTime] = useState();
    const [finishTime, setFinishTime] = useState();
    

    const [videoLoading, setVideoLoading] = useState(false);
    

    //Called once recording is done
    function handleDataAvailable(event) {
        console.log(event);
        console.log("a");

        if(event.data.size > 0) {
            recordedChunks.push(event.data);
            //download();
            console.log(recordedChunks);
            setFileReady(true);
        }
    }

    
    const enableCamera = (e) => {
        e.preventDefault();
        let constraints = {
            audio: false,
            video: {
                facingMode: "user"
            }
        };

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            setIsCamera(true);
            setVideoStream(stream);

            let video = document.getElementById('vid');
            video.srcObject = stream;
        });
    }



    const startRecording = async (e) => {
        e.preventDefault();
        if(isCamera) {
            let options = {
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000
            };

            mediaRecorder = new MediaRecorder(videoStream, options);

            //called once recording stops, i think
            mediaRecorder.ondataavailable = handleDataAvailable;
            //mediaRecorder.start();

            //Global variable for the video tags
            let vid = document.getElementById('vid');

            //Once data is loaded in the tags, this will be called
            //vid.onloadeddata = dataLoaded;
            mediaRecorder.start();

            startPredicting(vid, Date.now()).then(data => {
                setMoves(data)
            })
            .catch(err => console.log(err));

            setIsRecording(true);

            //setStartTime(new Date(Date.now()));

            //starts recording
            //mediaRecorder.start();

        }
    }

    useEffect(() => {
        console.log(moves);
    }, [moves]);

   



   //Called once the video is displayed
   //starts the prediction, and starts recording
   const dataLoaded = () => {
       console.log("a");
    //    startPredicting(vid).then(data => {
    //         setMoves(data);
    //    });

    //    mediaRecorder.start();
   }

    

    //Called when the stop recording button is pressed
   const stopRecording = (e) => {
       e.preventDefault();
        stopPredicting();
        mediaRecorder.stop();
        //setFinishTime(new Date.now())
        let file = new Blob(recordedChunks);
        setFinishedRecording(true);

        //will remove later
        //setFileReady(true);

   }

   const downloadFile = () => {



   }

   useEffect(() => {
    console.log("b");
    console.log(fileReady);
    if(fileReady) {
        console.log("c");
        let playerVid = document.getElementById('vid');

        let blb = new Blob(recordedChunks, { type: "video/webm" });



        console.log(blb);
        console.log(recordedChunks);

        playerVid.srcObject = null;
        playerVid.src = window.URL.createObjectURL(blb);
        playerVid.autoPlay = true;
        

    }

    

   }, [fileReady]);
    



    

    useEffect(async () => {
        await init();
    }, []);
 
    

    const uploadFile = (e) => {
        e.preventDefault();
        setVideoLoading(true);
        console.log("a");
        console.log(moves);
        let options = {
            
        }
        axios
        .post("http://localhost:5000/upload", moves, { responseType: 'blob' })
        .then(res => {
            //Make file available for download
            console.log(res);
            console.log(res.data);
            let aud = document.getElementById('audio');
            let audio = new Blob([res.data], { type: 'audio/wav' });
            let url = window.URL.createObjectURL(audio);

            // let link = document.getElementById('dload');

            // link.href = url;
            // link.download = "test.wav";
            setVideoLoading(false);
            let video = document.getElementById('vid');
            
            console.log(audio);
            console.log(url);
            aud.srcObject = null;
            aud.src = url;
            video.autoPlay = true;
            setFileReady(true);
            
        })
        .catch(err => console.log(err));
    }

    

    return (
        
        <Grid container xs={12} direction="column" spacing={2}>
            <Paper className={classes.control}>
            <Grid item xs={12}>
                {
                    !videoLoading ? (
                        <video id="vid" autoPlay controls>

                        </video>

                    ) :( <Loader
                            type="puff"
                        /> )
                }
                
                <audio id="audio" autoPlay loop>

                </audio>
            </Grid>
            <Grid item container xs={12} align="center">
                <Grid item xs={3}>
                    <Button onClick={enableCamera} variant="contained" color="primary">Enable Camera</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={startRecording} disabled={!isCamera} variant="contained" color="primary">Start Recording</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={stopRecording} disabled={!isRecording} variant="contained">Stop Recording</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={uploadFile} disabled={!finishedRecording} variant="contained">Upload File</Button>
                </Grid>
                {/* <Grid item xs={3}>
                    <Button onClick={downloadFile} disabled={!fileReady} variant="contained">Download File</Button>
                </Grid> */}
            </Grid>
            <Grid item xs={12}>
                
                    
                        {/* <video id="playback" autoPlay loop>
                            
                        </video> */}

                        

                        
                    
                        {/* <a id="dload">Download</a> */}
                
            </Grid>
            </Paper>
        </Grid>
        
    );

}

export default RecordComponent;