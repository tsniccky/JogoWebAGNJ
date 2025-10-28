let interactionRange = 60;

// Interaction state
var nearbyObject = null;
var showInteractionPrompt = false;

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function findNearbyObject() {
    for (let obj of objects) {
        if (!obj.interactable) continue;
        
        let objCenterX = obj.x + obj.width / 2;
        let objCenterY = obj.y + obj.height / 2;
        let distance = getDistance(Xplayer, Yplayer, objCenterX, objCenterY);
        
        if (distance <= interactionRange) {
            return obj;
        }
    }
    return null;
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
    
    let title = document.createElement('h2');
    title.textContent = objectName.charAt(0).toUpperCase() + objectName.slice(1);
    title.style.marginTop = '0';
    
    let messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.fontSize = '16px';
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
    
    dialog.appendChild(title);
    dialog.appendChild(messageText);
    dialog.appendChild(closeButton);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            document.body.removeChild(overlay);
        }
    });
    overlay.tabIndex = 0;
    overlay.focus();
}

function handleKeyPress(event) {
    // Handle interaction key (E or Enter)
    if ((event.key === 'e' || event.key === 'E') && nearbyObject) {
        handleObjectInteraction(nearbyObject.name);
    }
}


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

