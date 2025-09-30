// ---------------- Initial setup ----------------
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;

let omori_htbx = 28;

// ---------------- Sprites ----------------
const omori = new Image();
omori.src = "sprites/omori/omStanding_F.png";
const omoriRun = new Image();
omoriRun.src = "sprites/omori/omRunning_F.png";

const door = new Image(); door.src = "sprites/door.png";
const cat = new Image(); cat.src = "sprites/cat.png";
const lightbulb = new Image(); lightbulb.src = "sprites/lightbulb.png";
const sketchbook = new Image(); sketchbook.src = "sprites/sketchbook.png";
const tissues = new Image(); tissues.src = "sprites/tissuebox.png";
const laptop = new Image(); laptop.src = "sprites/laptop.png";

let currentOmori = omori;

// ---------------- Object definitions ----------------
// Each object has x, y, width, height for collisions
const objects = [
    { img: door, x: 320, y: 40, width: 64, height: 64 },
    { img: cat, x: 330, y: 415, width: 64, height: 36 },
    { img: lightbulb, x: 450, y: 0, width: 64, height: 64 },
    { img: sketchbook, x: 565, y: 145, width: 64, height: 64 },
    { img: tissues, x: 565, y: 330, width: 64, height: 64 },
    { img: laptop, x: 400, y: 155, width: 45, height: 45 },
];

// ---------------- Draw everything ----------------
function drawOmori(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw boundary (example)
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 300, 250);

    // Draw all objects
    for (let obj of objects) {
        ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }

    // Draw player
    ctx.drawImage(currentOmori, x - omori_htbx, y - omori_htbx, omori_htbx * 2, omori_htbx * 2);
}

// ---------------- Collision detection (AABB) ----------------
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Check if next position collides with any object
function checkCollision(nextX, nextY) {
    let playerRect = { 
        x: nextX - omori_htbx, 
        y: nextY - omori_htbx, 
        width: omori_htbx*2, 
        height: omori_htbx*2 
    };

    for (let obj of objects) {
        if (isColliding(playerRect, obj)) {
            // Example: show messages for certain objects
            if (obj.img === cat) alert("A cute cat. It looks hungry.");
            if (obj.img === lightbulb) alert("A lightbulb flickers occasionally.");

            return true; // collision detected
        }
    }
    return false; // no collision
}

// ---------------- Movement ----------------
function moveByKey(event) {
    currentOmori = omoriRun; // switch to running sprite

    let nextX = Xomori;
    let nextY = Yomori;

    switch (event.key) {
        case "ArrowUp": nextY -= moveSpeed; break;
        case "ArrowDown": nextY += moveSpeed; break;
        case "ArrowLeft": nextX -= moveSpeed; break;
        case "ArrowRight": nextX += moveSpeed; break;
    }

    // Check collisions before moving
    if (!checkCollision(nextX, nextY)) {
        Xomori = nextX;
        Yomori = nextY;

        // Keep player inside canvas boundaries
        if (Xomori - omori_htbx < 0) Xomori = omori_htbx;
        if (Xomori + omori_htbx > width) Xomori = width - omori_htbx;
        if (Yomori - omori_htbx < 0) Yomori = omori_htbx;
        if (Yomori + omori_htbx > height) Yomori = height - omori_htbx;
    }

    drawOmori(Xomori, Yomori);

    currentOmori = omori; // switch back to standing sprite
}

// Stop movement and set sprite to standing
function stopMovement() {
    currentOmori = omori;
}

// ---------------- Event listeners ----------------
document.addEventListener("keydown", moveByKey);
document.addEventListener("keyup", stopMovement);
