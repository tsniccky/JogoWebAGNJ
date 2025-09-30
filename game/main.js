// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;

// Hitboxes ------------------------------------------------------------------------------

let omori_htbx = 28;

//Sprite loading -------------------------------------------------------------------------

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

omori.onload = () => {
    drawOmori(Xomori, Yomori);
};

// Movement ------------------------------------------------------------------------------

let currentOmori = omori;

function drawOmori(x, y) {
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 300, 250);
    ctx.drawImage(door, 320, 40);
    ctx.drawImage(cat, 330, 415);
    ctx.drawImage(sketchbook, 565, 145);
    ctx.drawImage(tissues, 565, 330);
    ctx.drawImage(laptop, 400, 155);
    ctx.drawImage(currentOmori, x - omori_htbx, y - omori_htbx, omori_htbx * 2, omori_htbx * 2);
    ctx.drawImage(lightbulb, 450, 0);

    return;
}

function moveByKey(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentOmori = omoriRun;

    switch (event.key) {
        case "ArrowUp":
            if (!isColliding){
                Yomori -= moveSpeed;
                if (Yomori - omori_htbx < 0) {Yomori = 0 + omori_htbx};
            break;
        }
        case "ArrowDown":
            if (!isColliding){
                Yomori += moveSpeed;
                if (Yomori + omori_htbx > height) {Yomori = height - omori_htbx};
                break;
            }
        case "ArrowLeft":
            if (!isColliding){
                Xomori -= moveSpeed;
                if (Xomori - omori_htbx < 0) {Xomori = 0 + omori_htbx};
                break;
            }
        case "ArrowRight":
            if (!isColliding){
                Xomori += moveSpeed;
                if (Xomori + omori_htbx > width) {Xomori = width - omori_htbx};
                break;
            }
    }

    drawOmori(Xomori, Yomori);
    currentOmori = omori;
}

function stopMovement() {
    currentOmori = omori;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOmori(Xomori, Yomori);
}

function isColliding(a,b) {
    return a.x<b.x+b.width &&
    a.x+a.width>b.x &&
    a.y<b.y+b.height &&
    a.y+a.height>b.y;
}

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", moveByKey);
document.addEventListener("keyup", stopMovement);