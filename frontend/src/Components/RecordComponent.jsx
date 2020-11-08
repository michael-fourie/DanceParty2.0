import React, { useState, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';
import axios from "axios";
import Grid from "@material-ui/core/Grid"



//import Analyze from "../scripts/Analyze"

import {init, loop, predict, startPredicting, stopPredicting } from "../scripts/Analyzetest.js";

import Button from "@material-ui/core/Button"

var poses = [];
var times = [];
var time = 0;
var i = 0;
//let vid;

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

    let vid;
    

    const [isRecording, setIsRecording] = useState(false);
    const [videoStream, setVideoStream] = useState();

    const [isCamera, setIsCamera] = useState(false);
    const [fileReady, setFileReady] = useState(false);
    const [finishedRecording, setFinishedRecording] = useState(false);
    const [moves, setMoves] = useState();
    const [startTime, setStartTime] = useState();
    const [finishTime, setFinishTime] = useState();
    


    // const sendFileToBackend = (fileBlob) => {
    //     let file = new File([fileBlob], "inputVideo.webm", {
    //         type: "video/webm"
    //     });
    //     console.log(file);

    //     let formData = new FormData();
    //     formData.append('file', file);

    //     console.log(formData);

    //     // axios
    //     // .post("placeholderURl", formData)
    //     // .then(res => {
    //     //     console.log(res.data);
    //     // })
    //     // .catch(err => console.log(err));
    // }

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

    // const download = () => {
    //     var blob = new Blob(recordedChunks);

    //     var url = URL.createObjectURL(blob);
        
    //     console.log(url);

    //     let link = document.getElementById('dload');

    //     link.href = url;
    //     link.download = "test.webm";

    //     sendFileToBackend(blob);

        
    // }


    // const handleClick = () => {

    //     let facingMode = "user";
    //     let constraints = {
    //         audio: false,
    //         video: {
    //             facingMode: facingMode
    //         }
    //     };
    //     navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    //         console.log(stream);
    //         setIsRecording(true);
    //         setVideoStream(stream);
            
            

    //         let video = document.getElementById('vid');
    //         video.srcObject = stream;

    //     })
    // }

    const enableCamera = () => {
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



    // useEffect(async () => {

    //     if(isRecording) {
    //         let options = {
    //             mimeType: 'video/webm',
    //             audioBitsPerSecond: 128000,
    //             videoBitsPerSecond: 2500000
    //         };

    //         let options2 = {
    //             mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"'
    //         }
    //         mediaRecorder = new MediaRecorder(videoStream, options);
    //         mediaRecorder.ondataavailable = handleDataAvailable;
    //         mediaRecorder.start();
    //         console.log(videoStream.getVideoTracks());
    //         let track = videoStream.getVideoTracks()[0];
    //         vid = document.getElementById('vid');
    //         console.log(vid);
    //         vid.onloadeddata = dataLoaded;
    //         //predict(vid);
    //         //let ret = Test.predict(videoStream);
    //         //console.log(ret);

    //         console.log(mediaRecorder);

    //     }

    // }, [videoStream]);

    const startRecording = async () => {
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
            vid = document.getElementById('vid');

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

   

//    const handlePrediction = () => {
//        predict(vid);
//   }

   //Called once the video is displayed
   //starts the prediction, and starts recording
   const dataLoaded = () => {
       console.log("a");
    //    startPredicting(vid).then(data => {
    //         setMoves(data);
    //    });

    //    mediaRecorder.start();
   }

    // async function handleStart() {
    //     startPredicting(vid);
    // }

    //Called when the stop recording button is pressed
   const stopRecording = () => {
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
        let playerVid = document.getElementById("playback");

        let blb = new Blob(recordedChunks, { type: "video/webm" });

        console.log(blb);
        console.log(recordedChunks);

        playerVid.srcObject = null;
        playerVid.src = window.URL.createObjectURL(blb);
        

    }

    

   }, [fileReady]);
    



    // useEffect(async () => {

    //     //modelObj = init();
    //     modelObj = await init();
    //     console.log(modelObj.model)

    // }, []);

    useEffect(async () => {
        await init();
    }, []);
 
    // const handleStopRecording = (e) => {
    //     e.preventDefault();
    //     mediaRecorder.stop();
    //     console.log("b")
    //     let blob = new Blob(recordedChunks);
    //     sendFileToBackend(blob);
    // }

    const uploadFile = () => {
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

            let link = document.getElementById('dload');

            link.href = url;
            link.download = "test.wav";

            console.log(audio);
            console.log(url);
            aud.srcObject = null;
            aud.src = url;
            setFileReady(true);
        })
        .catch(err => console.log(err));
    }

    // return (
    //     <div>
    //         <Button onClick={handleClick}>
    //             Click to Record!
    //         </Button>

    //         {
    //             isRecording ? (
    //                 <video id="vid" autoPlay>
                        
    //                 </video>
    //             ) : ("")
    //         }

    //         <Button onClick={handleStopRecording}>
    //             Click to stop recording!
    //         </Button>

    //         <a id="dload">Download!</a>

    //         <Button onClick={handleStart}>Start Predicting</Button>
    //         <Button onClick={handleStop}>Stop Predicting</Button>
            
    //     </div>
       
    // )

    return (
        <Grid container xs={12} direction="column">
            <Grid item xs={12}>
                {
                    
                        <video id="vid" autoPlay>

                        </video>
                    
                }
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={2}>
                    <Button onClick={enableCamera}>Enable Camera</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={startRecording} disabled={!isCamera}>Start Recording</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={stopRecording} disabled={!isRecording}>Stop Recording</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={uploadFile} disabled={!finishedRecording}>Upload File</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={downloadFile} disabled={!fileReady}>Download File</Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                
                    
                        <video id="playback" autoPlay controls>
                            
                        </video>

                        <audio id="audio" controls>

                        </audio>
                    
                        <a id="dload">Download</a>
                
            </Grid>
        </Grid>
    );

}

export default RecordComponent;