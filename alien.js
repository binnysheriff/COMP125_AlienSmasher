// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 544;
document.getElementById("theCanvas").appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "space.jpeg";

// ALIEN image
let alienReady = false;
let alienImage = new Image();
alienImage.onload = function () {
    alienReady = true;
};
alienImage.src = "ufo.jpeg";

// initialize score to 0
let score = 0;
// initialize hop interval to 2 seconds
let hopInterval = 3000;
//set hopping
let hop = setInterval(function () {
    resetLocation();
}, hopInterval);

let alien = {
    speed: 200 // movement in pixels per second
};


canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    // Get the location of the mouse click
    let x = e.clientX;
    let y = e.clientY;

    // check if the player clicked on the alien
    if (x > alien.x && x < alien.x + 61 && y > alien.y && y < alien.y + 169) {
        // increment score by 10
        score += 10;
        resetLocation();
        // reduce hop interval, but should not be less than 0
        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function () {
                resetLocation();
            }, hopInterval);

        }
    }
}

// Reset the alien location when the player restarts or catches a alien
let resetLocation = function () {
    // Throw the alien somewhere on the screen randomly
    alien.x = 32 + (Math.random() * (canvas.width - 64));
    alien.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset hopping interval
let resetSpeed = function () {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function () {
        resetLocation();
    }, hopInterval);
};
let resetScore = function () {
    score = 0;
    // reset the speed
    resetSpeed();
};

// Draw everything
let render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (alienReady) {
        ctx.drawImage(alienImage, alien.x, alien.y);
    }

    // Score
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score : " + score;
};

// The main game loop
var main = function () {
    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Play this game!
main();
original.js

// Create the canvas
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
bgReady = false;
bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "space.jpeg";

// Hero image
alienReady = false;
alienImage = new Image();
alienImage.onload = function () {
    alienReady = true;
};
alienImage.src = "ufo.jpeg";

// boss image
let bossReady = false;
let bossImage = new Image();
bossImage.onload = function () {
    bossReady = true;
};
bossImage.src = "bart.jpeg";

// Game objects
alien = {
    speed: 256 // movement in pixels per second
};
let boss = {};
let bossCaught = 0;

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a boss
var reset = function () {
    alien.x = canvas.width / 2;
    alien.y = canvas.height / 2;

    // Throw the boss somewhere on the screen randomly
    boss.x = 32 + (Math.random() * (canvas.width - 64));
    boss.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
let update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        alien.y -= alien.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        alien.y += alien.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        alien.x -= alien.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        alien.x += alien.speed * modifier;
    }

    // Are they touching?
    if (
        alien.x <= (boss.x + 32)
        && boss.x <= (alien.x + 32)
        && alien.y <= (boss.y + 32)
        && boss.y <= (alien.y + 32)
    ) {
        ++bossCaught;
        reset();
    }
};

// Draw everything
render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (alienReady) {
        ctx.drawImage(alienImage, alien.x, alien.y);
    }

    if (bossReady) {
        ctx.drawImage(bossImage, boss.x, boss.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + bossCaught, 32, 32);
};

// The main game loop
var main = function () {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
// Let's play this game!
reset();
main();
