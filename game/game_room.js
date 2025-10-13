// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let omori_htbx = 30;
let moveSpeed = 5;
let interactionRange = 60;

// Object interaction states
let objectStates = {
    door: { interactions: 0, message: "A mysterious door..." },
    cat: { interactions: 0, messages: ["Meow!", "The cat purrs...", "The cat seems happy!", "Meow meow!"] },
    plant: { interactions: 0, messages: ["A plant!"] },
    lightbulb: { interactions: 0, messages: ["A bright lightbulb", "It illuminates the room", "Energy efficient!"] },
    desk: { interactions: 0, messages: ["Let's play"] },
    counter1: { interactions: 0, messages: ["A counter"] },
    "finances book": { interactions: 0, messages: ["A finances book"] },
    waiter: { interactions: 0, messages: ["He stares at you","..."] }
};

// Sprite loading ------------------------------------------------------------------------

const omori = new Image();
omori.src = "sprites/omori/omStanding_F.png";

const omoriRun = new Image();
omoriRun.src = "sprites/omori/omRunning_F.png";

const door = new Image();
door.src = "sprites/door.png";

const plant = new Image();
plant.src = "sprites/plant.png";

const lightbulb = new Image();
lightbulb.src = "sprites/lightbulb.png";

const counter1 = new Image();
counter1.src = "sprites/counter1.png";

const sketchbook = new Image();
sketchbook.src = "sprites/sketchbook.png"; // agora representa o "finances book"

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 91, width: 44, height: 62, interactable: true },
    { name: "counter1", x: 515, y: 140, width: 60, height: 60, interactable: true },
    { name: "desk", x: 415, y: 250, width: 90, height: 50, interactable: true },
    { name: "plant", x: 515, y: 305, width: 60, height: 50, interactable: true },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32, interactable: true },
    { name: "finances book", x: 420, y: 250, width: 32, height: 32, interactable: true },
    { name: "waiter", x: 450, y: 299, width: 20, height: 20, interactable: true }
];

// Spawn Omori perto da porta -----------------------------------------------------------

const doorObj = objects.find(o => o.name === "door");
let Xomori = doorObj.x + doorObj.width / 2;
let Yomori = doorObj.y + doorObj.height + omori_htbx + 10; // 10 pixels abaixo da porta

// Collision & interaction ---------------------------------------------------------------

function isColliding(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function findNearbyObject() {
    for (let obj of objects) {
        if (!obj.interactable) continue;
        let objCenterX = obj.x + obj.width / 2;
        let objCenterY = obj.y + obj.height / 2;
        if (getDistance(Xomori, Yomori, objCenterX, objCenterY) <= interactionRange) return obj;
    }
    return null;
}

// Drawing ------------------------------------------------------------------------------

let currentOmori = omori;
let nearbyObject = null;
let showInteractionPrompt = false;

function drawOmori(x, y) {
    ctx.clearRect(0, 0, width, height);

    // Room boundary
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 250, 210);

    // Draw objects
    for (let obj of objects) {
        switch (obj.name) {
            case "door": ctx.drawImage(door, obj.x, obj.y, obj.width, obj.height); break;
            case "counter1": ctx.drawImage(counter1, obj.x, obj.y, obj.width, obj.height); break;
            case "plant": ctx.drawImage(plant, obj.x, obj.y, obj.width, obj.height); break;
            case "lightbulb": ctx.drawImage(lightbulb, obj.x, obj.y, obj.width, obj.height); break;
            case "finances book": ctx.drawImage(sketchbook, obj.x, obj.y, obj.width, obj.height); break;
            case "desk": ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); break;
            case "waiter":
                ctx.beginPath();
                const centerX = obj.x + obj.width / 2;
                const centerY = obj.y + obj.height / 2;
                ctx.arc(centerX, centerY, 10, 0, Math.PI*2);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
                break;
        }
    }

    // Draw Omori
    ctx.drawImage(currentOmori, x - omori_htbx, y - omori_htbx, omori_htbx*2, omori_htbx*2);

    drawInteractionPrompt();
}

function drawInteractionPrompt() {
    if (showInteractionPrompt && nearbyObject) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(width/2 - 80, height - 60, 160, 40);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to interact', width/2, height - 35);

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.strokeRect(nearbyObject.x - 2, nearbyObject.y - 2, nearbyObject.width + 4, nearbyObject.height + 4);
    }
}

// Movement ------------------------------------------------------------------------------

function moveByKey(event) {
    currentOmori = omoriRun;
    let newX = Xomori;
    let newY = Yomori;

    switch (event.key) {
        case "ArrowUp": newY -= moveSpeed; break;
        case "ArrowDown": newY += moveSpeed; break;
        case "ArrowLeft": newX -= moveSpeed; break;
        case "ArrowRight": newX += moveSpeed; break;
    }

    let playerBox = { x: newX - omori_htbx, y: newY - omori_htbx, width: omori_htbx*2, height: omori_htbx*2 };
    let blocked = objects.some(obj => isColliding(playerBox.x, playerBox.y, playerBox.width, playerBox.height, obj.x, obj.y, obj.width, obj.height));

    if (!blocked) {
        Xomori = Math.max(omori_htbx, Math.min(width - omori_htbx, newX));
        Yomori = Math.max(omori_htbx, Math.min(height - omori_htbx, newY));
    }

    nearbyObject = findNearbyObject();
    showInteractionPrompt = nearbyObject !== null;

    drawOmori(Xomori, Yomori);
}

function stopMovement(event) {
    if (event.key.startsWith("Arrow")) {
        currentOmori = omori;
        drawOmori(Xomori, Yomori);
    }
}

// Interaction ---------------------------------------------------------------------------

function showMessageDialog(objectName, message) {
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0; overlay.style.left = 0;
    overlay.style.width = '100%'; overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlay.style.display = 'flex'; overlay.style.justifyContent = 'center'; overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1000;

    let dialog = document.createElement('div');
    dialog.style.backgroundColor = 'white';
    dialog.style.padding = '30px';
    dialog.style.borderRadius = '10px';
    dialog.style.border = '3px solid black';
    dialog.style.maxWidth = '400px';
    dialog.style.textAlign = 'center';
    dialog.style.fontFamily = "'Courier New', monospace";

    let title = document.createElement('h2');
    title.textContent = objectName.charAt(0).toUpperCase() + objectName.slice(1);
    title.style.marginTop = 0;

    let messageText = document.createElement('p');
    messageText.textContent = message;

    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(overlay);

    dialog.append(title, messageText, closeButton);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    overlay.tabIndex = 0;
    overlay.focus();
}

function handleKeyPress(event) {
    if ((event.key === 'e' || event.key === 'E' || event.key === 'Enter') && nearbyObject) {
        const objName = nearbyObject.name;
        const state = objectStates[objName];
        let message = state.message || state.messages[state.interactions % state.messages.length];
        state.interactions++;
        showMessageDialog(objName, message);
    }
}

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", event => { moveByKey(event); handleKeyPress(event); });
document.addEventListener("keyup", stopMovement);

canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (nearbyObject &&
        mouseX >= nearbyObject.x &&
        mouseX <= nearbyObject.x + nearbyObject.width &&
        mouseY >= nearbyObject.y &&
        mouseY <= nearbyObject.y + nearbyObject.height) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});

// Initial draw --------------------------------------------------------------------------
omori.onload = () => {
    drawOmori(Xomori, Yomori);
};
