// Initial setup -------------------------------------------------------------------------
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let Xomori = width / 2;
let Yomori = height / 2;
let moveSpeed = 5;
let omori_htbx = 20;
let interactionRange = 60;

// Interaction state
let nearbyObject = null;
let showInteractionPrompt = false;

// Object interaction states
let objectStates = {
    door: { interactions: 0, message: "A mysterious door..." },
    cat: { interactions: 0, messages: ["Meow!", "The cat purrs...", "The cat seems happy!", "Meow meow!"] },
    sketchbook: { interactions: 0, messages: ["A sketchbook full of drawings", "Beautiful artwork inside", "Someone is very creative!"] },
    tissues: { interactions: 0, messages: ["A box of tissues", "Soft and comfortable", "You feel prepared for anything"] },
    laptop: { interactions: 0, messages: ["A laptop computer", "The screen shows some code", "It's running smoothly"] },
    lightbulb: { interactions: 0, messages: ["A bright lightbulb", "It illuminates the room", "Energy efficient!"] }
};

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

// Initial draw --------------------------------------------------------------------------

omori.onload = () => {
    drawOmori(Xomori, Yomori);
};

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 40, width: 34, height: 52, interactable: true },
    { name: "cat", x: 330, y: 415, width: 32, height: 32, interactable: true },
    { name: "sketchbook", x: 565, y: 145, width: 35, height: 35, interactable: true },
    { name: "tissues", x: 565, y: 330, width: 32, height: 32, interactable: true },
    { name: "laptop", x: 400, y: 155, width: 37, height: 37, interactable: true },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32, interactable: true }
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

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function findNearbyObject() {
    for (let obj of objects) {
        if (!obj.interactable) continue;
        
        let objCenterX = obj.x + obj.width / 2;
        let objCenterY = obj.y + obj.height / 2;
        let distance = getDistance(Xomori, Yomori, objCenterX, objCenterY);
        
        if (distance <= interactionRange) {
            return obj;
        }
    }
    return null;
}

// Draw Omori and objects ----------------------------------------------------------------

let currentOmori = omori;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Omori hitbox
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xomori - omori_htbx, Yomori - omori_htbx, omori_htbx * 2, omori_htbx * 2);
}

function drawInteractionPrompt() {
    if (showInteractionPrompt && nearbyObject) {
        // Draw prompt background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(width / 2 - 80, height - 60, 160, 40);
        
        // Draw prompt text
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to interact', width / 2, height - 35);
        
        // Highlight nearby object
        if (nearbyObject) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.strokeRect(nearbyObject.x - 2, nearbyObject.y - 2, nearbyObject.width + 4, nearbyObject.height + 4);
        }
    }
}

function drawOmori(x, y) {
    // Draw room boundary
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(width / 2 - 150, height / 2 - 125, 300, 250);

    // Draw all objects
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

    // Draw Omori
    ctx.drawImage(
        currentOmori,
        x - omori_htbx,
        y - omori_htbx,
        omori_htbx * 2,
        omori_htbx * 2
    );
    
    // Draw hitboxes (for debugging - can be removed)
    // drawHitboxes();
    
    // Draw interaction prompt
    drawInteractionPrompt();
}


// Movement ------------------------------------------------------------------------------

function moveByKey(event) {
    // Skip if it's a repeat event (key being held)
    if (event.repeat) return;
    
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
        default:
            return; // Exit if key isn't an arrow key
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
        if (isColliding(
            omoriBox.x, omoriBox.y, omoriBox.width, omoriBox.height,
            obj.x, obj.y, obj.width, obj.height
        )) {
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

    // Check for nearby objects
    nearbyObject = findNearbyObject();
    showInteractionPrompt = nearbyObject !== null;

    drawOmori(Xomori, Yomori);
}

function stopMovement(event) {
    // Only change sprite on arrow key release
    if (event.key.startsWith("Arrow")) {
        currentOmori = omori;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOmori(Xomori, Yomori);
    }
}

// Object interaction --------------------------------------------------------------------

function handleObjectInteraction(objectName) {
    let state = objectStates[objectName];
    if (!state) return;
    
    state.interactions++;
    
    let message = "";
    
    switch (objectName) {
        case "door":
            // Special case - door can lead to different rooms
            if (confirm("Do you want to go through the door?")) {
                // Change to main_hall or bathroom depending on context
                window.location.href = "main_hall.html";
            }
            return;
            
        case "cat":
        case "sketchbook":
        case "tissues":
        case "laptop":
        case "lightbulb":
            if (state.messages) {
                let messageIndex = (state.interactions - 1) % state.messages.length;
                message = state.messages[messageIndex];
            } else {
                message = state.message;
            }
            break;
    }
    
    // Display message in a custom dialog
    showMessageDialog(objectName, message);
}

function showMessageDialog(objectName, message) {
    // Create overlay
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    
    // Create dialog box
    let dialog = document.createElement('div');
    dialog.style.backgroundColor = 'white';
    dialog.style.padding = '30px';
    dialog.style.borderRadius = '10px';
    dialog.style.border = '3px solid black';
    dialog.style.maxWidth = '400px';
    dialog.style.textAlign = 'center';
    dialog.style.fontFamily = "'Courier New', Courier, monospace";
    
    // Title
    let title = document.createElement('h2');
    title.textContent = objectName.charAt(0).toUpperCase() + objectName.slice(1);
    title.style.marginTop = '0';
    
    // Message
    let messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.fontSize = '16px';
    
    // Close button
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontFamily = "'Courier New', Courier, monospace";
    closeButton.style.border = '2px solid black';
    closeButton.style.backgroundColor = '#f0f0f0';
    closeButton.style.marginTop = '10px';
    
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
    };
    
    // Assemble dialog
    dialog.appendChild(title);
    dialog.appendChild(messageText);
    dialog.appendChild(closeButton);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Allow closing with Enter or Escape
    overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            document.body.removeChild(overlay);
        }
    });
    
    // Focus on the overlay so keydown works
    overlay.tabIndex = 0;
    overlay.focus();
}

function handleKeyPress(event) {
    // Handle interaction key (E or Enter)
    if ((event.key === 'e' || event.key === 'E' || event.key === 'Enter') && nearbyObject) {
        handleObjectInteraction(nearbyObject.name);
    }
}

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", function(event) {
    moveByKey(event);
    handleKeyPress(event);
});

document.addEventListener("keyup", stopMovement);

// Mouse interaction - click on nearby object
canvas.addEventListener("click", function(event) {
    if (nearbyObject) {
        handleObjectInteraction(nearbyObject.name);
    }
});

// Change cursor when hovering over nearby interactable objects
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    let isOverNearbyObject = false;
    
    if (nearbyObject) {
        if (mouseX >= nearbyObject.x && 
            mouseX <= nearbyObject.x + nearbyObject.width &&
            mouseY >= nearbyObject.y && 
            mouseY <= nearbyObject.y + nearbyObject.height) {
            isOverNearbyObject = true;
        }
    }
    
    canvas.style.cursor = isOverNearbyObject ? "pointer" : "default";
});
