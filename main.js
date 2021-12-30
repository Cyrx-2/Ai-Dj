RightWristScore = 0;
LeftWristScore = 0;
song ="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
    song = loadSound("music.mp3");
}



function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses)
}

function draw(){
    image(video, 0, 0, 600, 500);

        if(LeftWristScore > 0.2)
        {
    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX, leftWristY,20);
}

if(RightWristScore > 0.2)
        {
fill("#FF0000");
stroke("#FF0000");

    circle(rightWristX, rightWristY,20);

    LeftWristYNum = Number(leftWristY);
    LeftYRounded = floor(LeftWristYNum)
    volume =LeftYRounded/500
    document.getElementById("volButton").innerHTML = "Volume: " + volume
    song.setVolume(volume);

    if(rightWristY > 0 && rightWristY <=100)
    {
        document.getElementById("speedButton").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY > 100 && rightWristY <=200)
    {
        document.getElementById("speedButton").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    if(rightWristY > 200 && rightWristY <=300)
    {
        document.getElementById("speedButton").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY <=400)
    {
        document.getElementById("speedButton").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    if(rightWristY > 400 && rightWristY <=500)
    {
        document.getElementById("speedButton").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
        }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("loaded");
}

function gotPoses(results)
{

    if(results.length > 0){
    console.log(results);
    RightWristScore = results[0].pose.keypoints[10].score;
    LeftWristScore = results[0].pose.keypoints[9].score;
    console.log(LeftWristScore);
    console.log(RightWristScore);

   

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
        console.log("Right Wrist X,Y" + rightWristX+rightWristY + "Left Wrist X,Y" + leftWristX + leftWristY) ;

    }
}