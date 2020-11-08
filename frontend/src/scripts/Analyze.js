
// import * as tf from '@tensorflow/tfjs';
// import * as tmPose from '@teachablemachine/pose';

const tf = require('@tensorflow/tfjs');
const tmPose = require('@teachablemachine/pose');
global.fetch = require("node-fetch");
//const { Image, createCanvas } = require('canvas');

class Analyze {
    constructor() {
        this.init();
        this.poses = [];
        this.times = [];
        this.time = 0;
        this.i = 0;
        this.URL = "https://teachablemachine.withgoogle.com/models/o-TZh3sFa/";
        //let model, webcam, ctx, labelContainer, maxPredictions;

        
        this.model = {};
        this.maxPredictions = 0;
        
    }

    //model, webcam, ctx, labelContainer, maxPredictions;

    // var poses = [];
    // var times = [];
    // var time = 0;
    // var i = 0;
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

    // the link to your model provided by Teachable Machine export panel
    //const URL = "https://teachablemachine.withgoogle.com/models/o-TZh3sFa/";
    

    async init() {
        const modelURL = ;
        const metadataURL = this.URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        this.model = await tmPose.load(modelURL, metadataURL);

        tmPose.load(modelURL, metadataURL).then(mod => {
            this.model = mod;
            this.maxPredictions = this.model.getTotalClasses();

        }).catch(err => console.log(err));
       
        // Convenience function to setup a webcam
        // const size = 200;
        // const flip = true; // whether to flip the webcam
        // webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        // await webcam.setup(); // request access to the webcam
        // await webcam.play();
       // window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        // const canvas = document.getElementById("canvas");
        // canvas.width = size; canvas.height = size;
        // ctx = canvas.getContext("2d");
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }
    }

    async loop(timestamp) {
        if(this.time == 0){
            let start = Date.now();
        }
        //webcam.update(); // update the webcam frame
        var temp = (await this.predict());
        if(temp != this.poses[this.i - 1]){
        this.poses.push(temp);
        this.times.push(this.time - Date.now());
        this.i++;
    }
    if(this.done){
    var jsonString = "{pos:" + this.poses + ",time:" + this.times + "}";
    }else{ 
    //window.requestAnimationFrame(loop);
    
    }
}

    async predict(video) {
        // Prediction #1: run input through posenet
        const { pose, posenetOutput } = await this.model.estimatePose(video);
        // // Prediction 2: run input through teachable machine classification model
        const prediction = await this.model.predict(posenetOutput);

        let classPrediction;

        for (let i = 0; i < this.maxPredictions; i++) {
            classPrediction =
                prediction[i].className;
            //labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        console.log(classPrediction);
        return classPrediction;
        // finally draw the poses
        //drawPose(pose);
    }

}



//    module.exports = function drawPose(pose) {
//         if (webcam.canvas) {
//             ctx.drawImage(webcam.canvas, 0, 0);
//             // draw the keypoints and skeleton
//             if (pose) {
//                 const minPartConfidence = 0.5;
//                 tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
//                 tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
//             }
//         }
//     }



// async function main() {
//     await init();
//     //predict();
// }

// main();

// module.exports = loop;

module.exports = Analyze;