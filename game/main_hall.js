// Initial setup -------------------------------------------------------------------------
let bgMusic = new Audio("musica.mp3");
bgMusic.loop = true;
bgMusic.volume = 1.0;
document.addEventListener("click", () => {
    bgMusic.play();
}, 
{ 
    once: true });

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xplayer = width/2;
let Yplayer = height/2;

let moveSpeed = 5;
let player_htbx = 20;

// Object interaction states
let objectStates = {
    door1: { interactions: 0, message: "A mysterious door..." },
    cat: { interactions: 0, messages: ["Meow!", "The cat purrs...", "The cat seems happy!", "Meow meow!"] },
    sketchbook: { interactions: 0, messages: ["A sketchbook full of drawings", "Beautiful artwork inside", "The book is on the table"] },
    tissues: { interactions: 0, messages: ["A box of tissues", "Soft and comfortable", "You feel prepared for anything"] },
    television: { interactions: 0, messages: ["A television", "The screen is static", "It won't turn on"] },
    lightbulb: { interactions: 0, messages: ["A bright lightbulb", "It illuminates the room", "Energy efficient!"] },
    waiter: { interactions: 0, messages: ["...", "The Waiter keeps silent", "He stares at you"] }
};

// Sprite loading

const player = new Image();
player.src = "sprites/jogador.webp";

const playerRun = new Image();
playerRun.src = "sprites/jogador.webp";

const door1 = new Image();
door1.src = "sprites/door.png";

const door_blue = new Image();
door_blue.src = "sprites/door_blue.png";

const cat = new Image();
cat.src = "sprites/cat.png";

const lightbulb = new Image();
lightbulb.src = "sprites/lightbulb.png";

const sketchbook = new Image();
sketchbook.src = "sprites/sketchbook.png";

const tissues = new Image();
tissues.src = "sprites/tissuebox.png";

const television = new Image();
television.src = "sprites/laptop.png";

const waiter = new Image();
waiter.src = "sprites/waiter.webp";

// Initial draw 

player.onload = () => {
    drawplayer(Xplayer, Yplayer);
    tutorial();
};

// Object hitboxes
let objects = [
    { name: "door1", x: 650, y: 10, width: 34, height: 52, interactable: true },
    { name: "door2", x: 203, y: 430, width: 34, height: 52, interactable: true },
    { name: "door3", x: 203, y: 60, width: 34, height: 52, interactable: true },
    { name: "table1", x: 630, y: 100, width: 100, height: 50 },
    { name: "table2", x: 630, y: 225, width: 100, height: 50 },
    { name: "table3", x: 630, y: 350, width: 100, height: 50 },
    { name: "counter", x: 330, y: 200, width: 30, height: 140 },
    { name: "side-counter1", x: 230, y: 150, width: 150, height: 50 },
    { name: "side-counter2", x: 230, y: 340, width: 150, height: 50 },
    { name: "doorBlue", x: 555, y: 460, width: 34, height: 52, interactable: true },
    { name: "cat", x: 633, y: 315, width: 32, height: 32, interactable: true },
    { name: "sketchbook", x: 330, y: 201, width: 25, height: 25, interactable: true },
    { name: "tissues", x: 330, y: 310, width: 25, height: 25, interactable: true },
    { name: "television", x: 250, y: 155, width: 37, height: 37, interactable: true },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32, interactable: true },
    { name: "waiter", x: 295, y: 250, width: 40, height: 40, interactable: true }
];


// Collision detection 

function isColliding(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}


// Draw player and objects 

let currentplayer = player;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Player hitbox
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xplayer - player_htbx, Yplayer - player_htbx, player_htbx * 2, player_htbx * 2);
}

function drawplayer(x, y) {
    // Draw room boundary
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(width / 2 - 250, height / 2 - 230, 500, 460);


   // Draw all objects
    for (let obj of objects) {
        switch (obj.name) {
            case "door1": ctx.drawImage(door1, obj.x, obj.y, obj.width, obj.height); break;
            case "door2": ctx.drawImage(door1, obj.x, obj.y, obj.width, obj.height); break;
            case "door3": ctx.drawImage(door1, obj.x, obj.y, obj.width, obj.height); break;
            case "table1": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "table2": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "table3": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "counter": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "side-counter1": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "side-counter2": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "doorBlue": ctx.drawImage(door_blue, obj.x, obj.y, obj.width, obj.height); break;
            case "cat": ctx.drawImage(cat, obj.x, obj.y, obj.width, obj.height); break;
            case "sketchbook": ctx.drawImage(sketchbook, obj.x, obj.y, obj.width, obj.height); break;
            case "tissues": ctx.drawImage(tissues, obj.x, obj.y, obj.width, obj.height); break;
            case "television": ctx.drawImage(television, obj.x, obj.y, obj.width, obj.height); break;
            case "lightbulb": ctx.drawImage(lightbulb, obj.x, obj.y, obj.width, obj.height); break;
            case "waiter": ctx.drawImage(waiter, obj.x, obj.y, obj.width, obj.height); break;
        }
    }

    // Draw player
    ctx.drawImage(
        currentplayer,
        x - player_htbx,
        y - player_htbx,
        player_htbx * 2,
        player_htbx * 2
    );
    
    
    // Draw interaction prompt
    drawInteractionPrompt();

}


// Movement

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
        default:
            newY = Yplayer;
            newX = Xplayer;
            break; // Exit if key isn't an arrow key
    }

    // Player's bounding box for collision check
    let playerBox = {
        x: newX - player_htbx,
        y: newY - player_htbx,
        width: player_htbx * 2,
        height: player_htbx * 2
    };

    // Check collision with all objects
    let blocked = false;
    for (let obj of objects) {
        if (isColliding(
            playerBox.x, playerBox.y, playerBox.width, playerBox.height,
            obj.x, obj.y, obj.width, obj.height
        )) {
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

    // Check for nearby objects
    nearbyObject = findNearbyObject();
    showInteractionPrompt = nearbyObject !== null;

    drawplayer(Xplayer, Yplayer);
    currentplayer = player;
}

function stopMovement(event) {
    // Only change sprite on arrow key release
    if (event.key.startsWith("Arrow")) {
        currentplayer = player;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawplayer(Xplayer, Yplayer);
    }
}

// Event listeners

document.addEventListener("keydown", function(event) {
    moveByKey(event);
    handleKeyPress(event);
});


document.addEventListener("keyup", stopMovement);






