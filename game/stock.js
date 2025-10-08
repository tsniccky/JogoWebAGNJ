// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;

let omori_htbx = 30;

// Sprite loading ------------------------------------------------------------------------

const omori = new Image();
omori.src = "sprites/omori/omStanding_F.png";

const omoriRun = new Image();
omoriRun.src = "sprites/omori/omRunning_F.png";

const door = new Image();
door.src = "sprites/door.png";

const plant2 = new Image();
plant2.src = "sprites/plant.png";

const plant = new Image();
plant.src = "sprites/plant.png";

const lightbulb = new Image();
lightbulb.src = "sprites/lightbulb.png";

const counter2 = new Image();
counter2.src = "sprites/counter2.png";

const counter1 = new Image();
counter1.src = "sprites/counter1.png";

const saco2 = new Image();
saco2.src = "sprites/saco2.png";

const saco1= new Image();
saco1.src = "sprites/saco1.png";

const saco3= new Image();
saco3.src = "sprites/saco3.png";

const counter3= new Image();
counter3.src = "sprites/counter3.png";

// Initial draw --------------------------------------------------------------------------

omori.onload = () => {
    drawOmori(Xomori, Yomori);
};

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 91, width: 40, height: 58 },
    /*{ name: "plant2", x: 555, y: 290, width: 50, height: 50 },/*/
    /*{ name: "plant", x: 550, y: 200, width: 50, height: 50 },/*/
    { name: "saco2", x: 550, y: 290, width: 60, height: 60},
    { name: "saco1", x: 550, y: 155, width: 55, height: 55 },
     { name: "saco3", x: 370, y: 285, width: 45, height: 45 },
     { name: "counter1", x: 385, y: 140, width: 60, height: 60},
      { name: "counter3", x: 350, y: 285, width: 75, height: 60},
   /* { name: "counter2", x: 410, y: 145, width: 55, height: 55 },*/
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

// Draw Omori and objects ----------------------------------------------------------------

let currentOmori = omori;

function drawHitboxes() {}
omori.onload = () => {
    console.log("Omori loaded!");
    drawOmori(Xomori, Yomori);
};

function drawOmori(x, y) {
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 280, 200);

    omori.onload = () => {
    console.log("Omori loaded!");
    drawOmori(Xomori, Yomori);
};
    for (let obj of objects) {
        switch (obj.name) {
            case "door": ctx.drawImage(door, obj.x, obj.y, obj.width, obj.height); break;
            case "counter3": ctx.drawImage(counter3, obj.x, obj.y, obj.width, obj.height); break;
            case "plant2": ctx.drawImage(plant2, obj.x, obj.y, obj.width, obj.height); break;
            case "saco3": ctx.drawImage(saco3, obj.x, obj.y, obj.width, obj.height); break;
            case "counter1": ctx.drawImage(counter1, obj.x, obj.y, obj.width, obj.height); break;
             case "counter2": ctx.drawImage(counter2, obj.x, obj.y, obj.width, obj.height); break;
              case "saco1": ctx.drawImage(saco1, obj.x, obj.y, obj.width, obj.height); break;
            case "saco2": ctx.drawImage(saco2, obj.x, obj.y, obj.width, obj.height); break;
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
