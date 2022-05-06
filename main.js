song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
var peter_pan = "";
var frozen = "";
var disney = "";
harry_potter = "";
scoreLeftWrist = 0;

function preload(){
    harry_potter = loadSound("music.mp3");
    peter_pan = loadSound("peter_pan.mp3");
    frozen = loadSound("frozen.mp3");
    disney = loadSound("Disney_music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
  console.log('PoseNet Is Initialized');
}

function draw(){
   image(video, 0, 0, 600, 500);

   fill("#FF0000");
   stroke("FF0000");
   if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20)
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);
   }
}

function play(){
    var name = document.getElementById("name").value;
  
  
  if(name=="peter_pan"){
    song = peter_pan;
  } 
  else if(name=="frozen"){
    song = frozen;
  }
  else if(name=="disney"){
    song = disney;
  }
  else if(name=="harry_potter"){
    song = harry_potter;
  }
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function pause(){
    harry_potter.pause();
    frozen.pause();
    disney.pause();
    peter_pan.pause();
}

function stop(){
    harry_potter.stop();
    frozen.stop();
    disney.stop();
    peter_pan.stop();
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = "+ scoreLeftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX+" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
  }
}