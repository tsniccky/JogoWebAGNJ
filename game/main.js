// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;

// Hitboxes ------------------------------------------------------------------------------

let omori_htbx = 20;

// Sprite loading ------------------------------------------------------------------------

const omori = new Image();
omori.src = "sprites/omori/omStanding_F.png";
const omoriRun = new Image();
omoriRun.src = "sprites/omori/omRunning_F.png";

const door = new Image();
door.src = "sprites/door.png";

const cat = new Image();
cat.src = "sprites/cat.png";

const lightbulb = new Image();
lightbulb.src = "sprites/lightbulb.png";

const sketchbook = new Image();
sketchbook.src = "sprites/sketchbook.png";

const tissues = new Image();
tissues.src = "sprites/tissuebox.png";

const laptop = new Image();
laptop.src = "sprites/laptop.png";

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 40, width: 32, height: 50 },
    { name: "cat", x: 330, y: 415, width: 32, height: 32 },
    { name: "sketchbook", x: 565, y: 145, width: 32, height: 32 },
    { name: "tissues", x: 565, y: 330, width: 32, height: 32 },
    { name: "laptop", x: 400, y: 155, width: 32, height: 32 },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32 }
];


// Draw Omori and objects ----------------------------------------------------------------

let currentOmori = omori;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Hitbox do Omori
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xomori - omori_htbx, Yomori - omori_htbx, omori_htbx * 2, omori_htbx * 2);
}


function drawOmori(x, y) {
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
        currentOmori,
        x - omori_htbx,
        y - omori_htbx,
        omori_htbx * 2,
        omori_htbx * 2
    );
    drawHitboxes();
}

// Collision detection -------------------------------------------------------------------

function isColliding(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}

// Movement ------------------------------------------------------------------------------

function moveByKey(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentOmori = omoriRun;

    let newX = Xomori;
    let newY = Yomori;

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

    // Omori's bounding box for collision check
    let omoriBox = {
        x: newX - omori_htbx,
        y: newY - omori_htbx,
        width: omori_htbx * 2,
        height: omori_htbx * 2
    };

    // Check collision with all objects
    let blocked = false;
    for (let obj of objects) {
        if (
            isColliding(
                omoriBox.x, omoriBox.y, omoriBox.width, omoriBox.height,
                obj.x, obj.y, obj.width, obj.height
            )
        ) {
            blocked = true;
            break;
        }
    }

    // Only move if not blocked
    if (!blocked) {
        Xomori = newX;
        Yomori = newY;

        // Screen boundaries
        if (Xomori - omori_htbx < 0) Xomori = omori_htbx;
        if (Xomori + omori_htbx > width) Xomori = width - omori_htbx;
        if (Yomori - omori_htbx < 0) Yomori = omori_htbx;
        if (Yomori + omori_htbx > height) Yomori = height - omori_htbx;
    }

    drawOmori(Xomori, Yomori);
    currentOmori = omori;
}

function stopMovement() {
    currentOmori = omori;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOmori(Xomori, Yomori);
}

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", moveByKey);
document.addEventListener("keyup", stopMovement);

// Initial draw --------------------------------------------------------------------------

omori.onload = () => {
    drawOmori(Xomori, Yomori);
};
