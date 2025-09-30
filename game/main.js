// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;

// Hitboxes ------------------------------------------------------------------------------

let omori_htbx = 28; // radius (half-size of hitbox)

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

// Object hitboxes (all centered) ---------------------------------------------------------

let objects = [
    { name: "door", x: 350, y: 90, width: 60, height: 100 },
    { name: "cat", x: 362, y: 447, width: 64, height: 64 },
    { name: "sketchbook", x: 597, y: 177, width: 64, height: 64 },
    { name: "tissues", x: 597, y: 362, width: 64, height: 64 },
    { name: "laptop", x: 432, y: 187, width: 64, height: 64 },
    { name: "lightbulb", x: 482, y: 32, width: 64, height: 64 }
];

const walls = [
    { x: 0, y: 0, width: width, height: 10 },                   
    { x: 0, y: height - 10, width: width, height: 10 },         
    { x: 0, y: 0, width: 10, height: height },                 
    { x: width - 10, y: 0, width: 10, height: height }         
];

const obstacles = [...objects, ...walls];


// Draw Omori and objects ----------------------------------------------------------------

let currentOmori = omori;

function drawOmori(x, y) {
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 300, 250);

    for (let obj of objects) {
        let drawX = obj.x - obj.width / 2;
        let drawY = obj.y - obj.height / 2;

        switch (obj.name) {
            case "door": ctx.drawImage(door, drawX, drawY, obj.width, obj.height); break;
            case "cat": ctx.drawImage(cat, drawX, drawY, obj.width, obj.height); break;
            case "sketchbook": ctx.drawImage(sketchbook, drawX, drawY, obj.width, obj.height); break;
            case "tissues": ctx.drawImage(tissues, drawX, drawY, obj.width, obj.height); break;
            case "laptop": ctx.drawImage(laptop, drawX, drawY, obj.width, obj.height); break;
            case "lightbulb": ctx.drawImage(lightbulb, drawX, drawY, obj.width, obj.height); break;
        }
    }

    ctx.drawImage(
        currentOmori,
        x - omori_htbx,
        y - omori_htbx,
        omori_htbx * 2,
        omori_htbx * 2
    );
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
        case "ArrowUp":    newY -= moveSpeed; break;
        case "ArrowDown":  newY += moveSpeed; break;
        case "ArrowLeft":  newX -= moveSpeed; break;
        case "ArrowRight": newX += moveSpeed; break;
    }

    // Omori's bounding box
    let omoriBox = {
        x: newX - omori_htbx,
        y: newY - omori_htbx,
        width: omori_htbx * 2,
        height: omori_htbx * 2
    };

    // Check collisions with objects
    let blocked = false;
    for (let obj of objects) {
        let objBox = {
            x: obj.x - obj.width / 2,
            y: obj.y - obj.height / 2,
            width: obj.width,
            height: obj.height
        };

        if (isColliding(
            omoriBox.x, omoriBox.y, omoriBox.width, omoriBox.height,
            objBox.x, objBox.y, objBox.width, objBox.height
        )) {
            blocked = true;
            break;
        }
    }

    // Apply movement if not blocked
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

