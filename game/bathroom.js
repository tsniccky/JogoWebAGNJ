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

const toilet = new Image();
toilet.src = "sprites/toilet.png";

const sink = new Image();
sink.src = "sprites/sink.png";

const toiletpaper = new Image();
toiletpaper.src = "sprites/toiletpaper.png";

// Initial draw --------------------------------------------------------------------------

omori.onload = () => {
    drawOmori(Xomori, Yomori);
};

// Object hitboxes -----------------------------------------------------------------------
// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "porte", x: 320, y: 91, width: 40, height: 58 },          
    { name: "plante2", x: 555, y: 290, width: 50, height: 50 },      
    { name: "plante", x: 320, y: 290, width: 50, height: 50 },      
    { name: "toilettes", x: 550, y: 145, width: 60, height: 60 },     
    { name: "papier_toilette", x: 515, y: 150, width: 55, height: 55 }, 
    { name: "lavabo", x: 425, y: 145, width: 65, height: 45 },        
    { name: "ampoule", x: 450, y: 0, width: 32, height: 32 }         
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


function drawOmori(x, y) {
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 280, 195);

   for (let obj of objects) {
    switch (obj.name) {
        case "porte": ctx.drawImage(door, obj.x, obj.y, obj.width, obj.height); break;
        case "plante": ctx.drawImage(plant, obj.x, obj.y, obj.width, obj.height); break;
        case "plante2": ctx.drawImage(plant2, obj.x, obj.y, obj.width, obj.height); break;
        case "toilettes": ctx.drawImage(toilet, obj.x, obj.y, obj.width, obj.height); break;
        case "papier_toilette": ctx.drawImage(toiletpaper, obj.x, obj.y, obj.width, obj.height); break;
        case "lavabo": ctx.drawImage(sink, obj.x, obj.y, obj.width, obj.height); break;
        case "ampoule": ctx.drawImage(lightbulb, obj.x, obj.y, obj.width, obj.height); break;
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
