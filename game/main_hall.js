// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xplayer = width / 2;
let Yplayer = height / 2;

let moveSpeed = 5;

let player_htbx = 20;

// Sprite loading ------------------------------------------------------------------------

const player = new Image();
player.src = "sprites/omori/stickman.png";

const playerRun = new Image();
playerRun.src = "sprites/omori/stickman.png";

const door = new Image();
door.src = "sprites/omori/door.png";

const cat = new Image();
cat.src = "sprites/omori/cat.png";

const lightbulb = new Image();
lightbulb.src = "sprites/omori/lightbulb.png";

const sketchbook = new Image();
sketchbook.src = "sprites/omori/sketchbook.png";

const tissues = new Image();
tissues.src = "sprites/omori/tissuebox.png";

const laptop = new Image();
laptop.src = "sprites/omori/laptop.png";

// Initial draw --------------------------------------------------------------------------

player.onload = () => {
    drawplayer(Xplayer, Yplayer);
};

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 40, width: 34, height: 52 },
    { name: "cat", x: 330, y: 415, width: 32, height: 32 },
    { name: "sketchbook", x: 565, y: 145, width: 35, height: 35 },
    { name: "tissues", x: 565, y: 330, width: 32, height: 32 },
    { name: "laptop", x: 400, y: 155, width: 37, height: 37 },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32 }
];

// Collision detection -------------------------------------------------------------------

function isColliding(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}

// Draw player and objects ----------------------------------------------------------------

let currentplayer = player;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Hitbox do player
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xplayer - player_htbx, Yplayer - player_htbx, player_htbx * 2, player_htbx * 2);
}


function drawplayer(x, y) {
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 300, 250);

    for (let obj of objects) {
        switch (obj.name) {
            case "door": ctx.drawImage(door, obj.x, obj.y, obj.width, obj.height); break;
            case "cat": ctx.drawImage(cat, obj.x, obj.y, obj.width, obj.height); break;
            case "sketchbook": ctx.drawImage(sketchbook, obj.x, obj.y, obj.width, obj.height); break;
            case "tissues": ctx.drawImage(tissues, obj.x, obj.y, obj.width, obj.height); break;
            case "laptop": ctx.drawImage(laptop, obj.x, obj.y, obj.width, obj.height); break;
            case "lightbulb": ctx.drawImage(lightbulb, obj.x, obj.y, obj.width, obj.height); break;
        }
    }

    ctx.drawImage(
        currentplayer,
        x - player_htbx,
        y - player_htbx,
        player_htbx * 2,
        player_htbx * 2
    );
    drawHitboxes();
}


// Movement ------------------------------------------------------------------------------

function moveByKey(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentplayer = playerRun;

    let newX = Xplayer;
    let newY = Yplayer;

    switch (event.key) {
        case "ArrowUp":
            newY -= moveSpeed;
            break;
        case "ArrowDown":
            newY += moveSpeed;
            break;
        case "ArrowLeft":
            newX -= moveSpeed;
            break;
        case "ArrowRight":
            newX += moveSpeed;
            break;
    }

    // player's bounding box for collision check
    let playerBox = {
        x: newX - player_htbx,
        y: newY - player_htbx,
        width: player_htbx * 2,
        height: player_htbx * 2
    };

    // Check collision with all objects
    let blocked = false;
    for (let obj of objects) {
        if (
            isColliding(
                playerBox.x, playerBox.y, playerBox.width, playerBox.height,
                obj.x, obj.y, obj.width, obj.height
            )
        ) {
            blocked = true;
            break;
        }
    }

    // Only move if not blocked
    if (!blocked) {
        Xplayer = newX;
        Yplayer = newY;

        // Screen boundaries
        if (Xplayer - player_htbx < 0) Xplayer = player_htbx;
        if (Xplayer + player_htbx > width) Xplayer = width - player_htbx;
        if (Yplayer - player_htbx < 0) Yplayer = player_htbx;
        if (Yplayer + player_htbx > height) Yplayer = height - player_htbx;
    }

    drawplayer(Xplayer, Yplayer);
    currentplayer = player;
}

function stopMovement() {
    currentplayer = player;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawplayer(Xplayer, Yplayer);
}

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", moveByKey);
document.addEventListener("keyup", stopMovement);