//Source Code of Flappy Rick
//Copyright 2021 John
//Setup Canvas
var CanvasConfig = {
    canvas: document.getElementById('canvas'),
    ctx: this.canvas.getContext('2d'),
}
//ImageSetup
var background = new Image();
var pipe = new Image();
var RickAstley = new Image();
var ground = new Image();
var gameover = new Image();
var scoreBoard = new Image();
background.src = "ImageSource/background.png";
pipe.src = "ImageSource/pipe.png";
ground.src = "ImageSource/groundloop.png";
RickAstley.src = "ImageSource/RickAstleyFinal.png";
gameover.src = "ImageSource/GameOver.png";
scoreBoard.src = "ImageSource/scoreboard.png";
//SoundObject
var RickAudio = [];
RickAudio.push(new Audio('Sound/Words/Anyother.mp3'), new Audio('Sound/Words/Around.mp3'), new Audio('Sound/Words/Cry.mp3'), new Audio('Sound/Words/Desert.mp3'), new Audio('Sound/Words/Down.mp3'), new Audio('Sound/Words/Feeling.mp3'), new Audio('Sound/Words/Give.mp3'), new Audio('Sound/Words/Goodbye.mp3'), new Audio('Sound/Words/Hurt.mp3'), new Audio('Sound/Words/I.mp3'), new Audio('Sound/Words/Just.mp3'), new Audio('Sound/Words/Let.mp3'), new Audio('Sound/Words/Lie.mp3'), new Audio('Sound/Words/Run.mp3'), new Audio('Sound/Words/Say.mp3'), new Audio('Sound/Words/tell.mp3'), new Audio('Sound/Words/Understand.mp3'), new Audio('Sound/Words/Up.mp3'), new Audio('Sound/Words/Wanna.mp3'), new Audio('Sound/Words/You.mp3'));
//GameData
var RickY = 400;
var StartUpAnimationUD = true;
var StartGame = false;
var pipeData = [];
var RickJump = 0;
var pipeRicked = [];
var crashPlayed = false;
pipeData[0] = {
    x: 590,
    y: -400,
}
var Point = 0;
//true up false down
//SetCanvasSize
CanvasConfig.ctx.canvas.width = 590;
CanvasConfig.ctx.canvas.height = 900;
//StartupDraw
function StartupDraw() {
    CanvasConfig.ctx.drawImage(background, 0, 0, 590, 900);
    if (StartUpAnimationUD) {
        RickY--;
    } else {
        RickY++;
    }
    if (RickY <= 270) {
        StartUpAnimationUD = false;
    } else if (RickY >= 420) {
        StartUpAnimationUD = true;
    }
    CanvasConfig.ctx.drawImage(RickAstley, 60, RickY, 117, 164);
    CanvasConfig.ctx.drawImage(ground, 0, 772, 590, 128);
    CanvasConfig.ctx.font = '48px Arial';
    CanvasConfig.ctx.fillStyle = "#000000";
    CanvasConfig.ctx.fillText('Flappy Rick', 165, 100);
    if (!StartGame) {
        requestAnimationFrame(StartupDraw);
    } else {
        Gaming();
    }
}

function Gaming() {
    //pass next frame
    var PassNext = true;
    CanvasConfig.ctx.drawImage(background, 0, 0, 590, 900);
    //Gravity of rick is 1
    if (RickJump > 0) {
        RickY -= 2;
        RickJump -= 2;
    } else {
        RickY++;
    }
    CanvasConfig.ctx.drawImage(RickAstley, 60, RickY, 117, 164);
    for (i = 0; i < pipeData.length; i++) {
        CanvasConfig.ctx.drawImage(pipe, pipeData[i].x, pipeData[i].y, 52, 640);
        CanvasConfig.ctx.drawImage(pipe, pipeData[i].x, pipeData[i].y + 950, 52, 640);
        pipeData[i].x--;
        if (pipeData[i].x == 220) {
            pipeData.push({
                x: 590,
                y: Math.floor(Math.random() * 500) - 640,
            });
        }
        if (pipeData[i].x < 177 && (pipeData[i].x + 52) > 60) {
            if (RickY <= (pipeData[i].y + 640) || (RickY + 164) >= (pipeData[i].y + 950)) {
                PassNext = false;
                var CrashSound = new Audio('Sound/sounds_ouch.mp3');
                CrashSound.play();
            } else if ((RickY + 164) >= 772 || RickY <= 0) {
                PassNext = false;
            } else {
                PassNext = true;
            }
        } else if (pipeData[i].x + 52 < 60 && !pipeRicked.includes(i)) {
            Point++;
            pipeRicked.push(i);
            var AudioPlayNum = Math.floor(Math.random() * 19);
            RickAudio[AudioPlayNum].play();
        }
    }
    CanvasConfig.ctx.drawImage(ground, 0, 772, 590, 128);
    if (!PassNext) {
        StartGame = false;
    }
    if (!StartGame) {
        GameOver();
    } else {
        requestAnimationFrame(Gaming);
    }
}
function GameOver() {
    CanvasConfig.ctx.drawImage(background, 0, 0, 590, 900);
    CanvasConfig.ctx.drawImage(RickAstley, 60, RickY, 117, 164);
    if (RickY + 164 >= 772) {
        CanvasConfig.ctx.drawImage(scoreBoard, 200, 250, 226, 144);
        CanvasConfig.ctx.fillStyle = "#a88332";
        CanvasConfig.ctx.font = "28px Arial";
        var GameOverText = "Rickrolled:" + Point;
        CanvasConfig.ctx.drawImage(gameover, 210, 180, 192, 44);
        CanvasConfig.ctx.fillText(GameOverText, 210, 280);
        CanvasConfig.ctx.fillText("Reload to start", 210, 330);
        if (!crashPlayed) {
            var crash = new Audio('Sound/sounds_crash.mp3');
            crash.play();
            var NoSound = new Audio('Sound/EndGame.mp3');
            NoSound.play();
            crashPlayed = true;
        }
    } else {
        RickY += 4;
        StartGame = false;
        requestAnimationFrame(GameOver);
    }
    CanvasConfig.ctx.drawImage(ground, 0, 772, 590, 128);
}
document.addEventListener('keypress', function () {
    JumpControl();
});

CanvasConfig.canvas.addEventListener('click', function () {
    JumpControl();
});

function JumpControl() {
    if (!StartGame) {
        RickY = 400;
        StartGame = true;
        pipeData = [];
        pipeData[0] = {
            x: 590,
            y: -400,
        }
    } else {
        RickJump = 60;
        var SoundFlap = new Audio('Sound/sounds_flap.mp3');
        SoundFlap.play();
    }
}
StartupDraw();
