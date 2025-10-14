// game.js
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xomori = width / 2;
let Yomori = height / 2;

let moveSpeed = 5;
let omori_htbx = 30;
let interactionRange = 70;

let nearbyObject = null;
let showInteractionPrompt = false;
let cutsceneActive = false;
let PlayerChoice = null;

// Object interaction states
let objectStates = {
    door: { interactions: 0, message: "A mysterious door..." },
    cat: { interactions: 0, messages: ["Meow!", "The cat purrs...", "The cat seems happy!", "Meow meow!"] },
    plant: { interactions: 0, messages: ["A plant!"] },
    saco1: { interactions: 0, messages: ["Arabica coffee"] },
    saco2: { interactions: 0, messages: ["Liberica coffee"] },
    saco3: { interactions: 0, messages: ["Robusta coffee"] },
    counter1: { interactions: 0, messages: ["A counter"] },
    lightbulb: { interactions: 0, messages: ["A bright lightbulb", "It illuminates the room", "Energy efficient!"] },
    counter3: { interactions: 0, messages: [".Let's make a coffee!"] },
    Henriette: { interactions: 0, messages: ["She stares at you","..."] },
    counter2: { interactions: 0, messages: ["A television", "The screen is static", "It won't turn on"] }
};

// Sprites
const omori = new Image(); omori.src = "sprites/omori/omStanding_F.png";
const omoriRun = new Image(); omoriRun.src = "sprites/omori/omRunning_F.png";
const door = new Image(); door.src = "sprites/door.png";
const plant2 = new Image(); plant2.src = "sprites/plant.png";
const lightbulb = new Image(); lightbulb.src = "sprites/lightbulb.png";
const counter2 = new Image(); counter2.src = "sprites/counter2.png";
const counter1 = new Image(); counter1.src = "sprites/counter1.png";
const saco2 = new Image(); saco2.src = "sprites/saco2.png";
const saco1 = new Image(); saco1.src = "sprites/saco1.png";
const saco3 = new Image(); saco3.src = "sprites/saco3.png";
const counter3 = new Image(); counter3.src = "sprites/counter3.png";

let currentOmori = omori;

// Objects
let objects = [
    { name: "door", x: 320, y: 91, width: 44, height: 62, interactable: true },
    { name: "saco2", x: 520, y: 290, width: 60, height: 60, interactable: true },
    { name: "saco1", x: 525, y: 150, width: 45, height: 45, interactable: true },
    { name: "saco3", x: 380, y: 285, width: 45, height: 45, interactable: true },
    { name: "counter1", x: 405, y: 140, width: 60, height: 60, interactable: true },
    { name: "counter3", x: 350, y: 285, width: 75, height: 60, interactable: true },
    { name: "Henriette", x: 375, y: 155, width: 32, height: 32, interactable: true },
    { name: "lightbulb", x: 450, y: 0, width: 32, height: 32, interactable: true }
];

// Collision & distance
function isColliding(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function findNearbyObject() {
    for (let obj of objects) {
        if (!obj.interactable) continue;
        let objCenterX = obj.x + obj.width/2;
        let objCenterY = obj.y + obj.height/2;
        if(getDistance(Xomori, Yomori, objCenterX, objCenterY) <= interactionRange) return obj;
    }
    return null;
}

// Draw
function drawOmori(x, y) {
    ctx.clearRect(0,0,width,height);
    ctx.strokeStyle="black"; ctx.lineWidth=2;
    ctx.strokeRect(width/2-150, height/2-125, 250, 210);

    for (let obj of objects){
        switch(obj.name){
            case "door": ctx.drawImage(door,obj.x,obj.y,obj.width,obj.height); break;
            case "counter3": ctx.drawImage(counter3,obj.x,obj.y,obj.width,obj.height); break;
            case "plant2": ctx.drawImage(plant2,obj.x,obj.y,obj.width,obj.height); break;
            case "saco3": ctx.drawImage(saco3,obj.x,obj.y,obj.width,obj.height); break;
            case "counter1": ctx.drawImage(counter1,obj.x,obj.y,obj.width,obj.height); break;
            case "counter2": ctx.drawImage(counter2,obj.x,obj.y,obj.width,obj.height); break;
            case "saco1": ctx.drawImage(saco1,obj.x,obj.y,obj.width,obj.height); break;
            case "saco2": ctx.drawImage(saco2,obj.x,obj.y,obj.width,obj.height); break;
            case "lightbulb": ctx.drawImage(lightbulb,obj.x,obj.y,obj.width,obj.height); break;
            case "Henriette": 
                ctx.beginPath();
                ctx.arc(obj.x+obj.width/2,obj.y+obj.height/2,10,0,Math.PI*2);
                ctx.fillStyle="purple"; ctx.fill(); ctx.closePath();
                break;
        }
    }

    ctx.drawImage(currentOmori, x-omori_htbx, y-omori_htbx, omori_htbx*2, omori_htbx*2);

    if(showInteractionPrompt && nearbyObject){
        ctx.fillStyle='rgba(0,0,0,0.7)';
        ctx.fillRect(width/2-80,height-60,160,40);
        ctx.fillStyle='white'; ctx.font='16px Arial'; ctx.textAlign='center';
        ctx.fillText('Press E to interact', width/2, height-35);
        ctx.strokeStyle='yellow'; ctx.lineWidth=3;
        ctx.strokeRect(nearbyObject.x-2, nearbyObject.y-2, nearbyObject.width+4, nearbyObject.height+4);
    }
}

// Movement
function moveByKey(event){
    if(cutsceneActive) return;
    currentOmori = omoriRun;
    let newX=Xomori, newY=Yomori;
    switch(event.key){
        case "ArrowUp": newY-=moveSpeed; break;
        case "ArrowDown": newY+=moveSpeed; break;
        case "ArrowLeft": newX-=moveSpeed; break;
        case "ArrowRight": newX+=moveSpeed; break;
    }
    let playerBox={x:newX-omori_htbx, y:newY-omori_htbx, width:omori_htbx*2, height:omori_htbx*2};
    let blocked = objects.some(obj=>isColliding(playerBox.x,playerBox.y,playerBox.width,playerBox.height,obj.x,obj.y,obj.width,obj.height));
    if(!blocked){Xomori=Math.max(omori_htbx,Math.min(width-omori_htbx,newX));
                 Yomori=Math.max(omori_htbx,Math.min(height-omori_htbx,newY));}
    nearbyObject = findNearbyObject();
    showInteractionPrompt = nearbyObject !== null;
    drawOmori(Xomori,Yomori);
    
}
function stopMovement(event){ if(event.key.startsWith("Arrow")){currentOmori=omori; drawOmori(Xomori,Yomori);}}

// Interaction dialog
function showMessageDialog(objectName,message){
    let overlay=document.createElement('div');
    overlay.style.position='fixed'; overlay.style.top=0; overlay.style.left=0; overlay.style.width='100%'; overlay.style.height='100%';
    overlay.style.backgroundColor='rgba(0,0,0,0.7)'; overlay.style.display='flex'; overlay.style.justifyContent='center'; overlay.style.alignItems='center'; overlay.style.zIndex=1000;
    let dialog=document.createElement('div');
    dialog.style.backgroundColor='white'; dialog.style.padding='30px'; dialog.style.borderRadius='10px'; dialog.style.border='3px solid black'; dialog.style.maxWidth='400px'; dialog.style.textAlign='center'; dialog.style.fontFamily="'Courier New', monospace";
    let title=document.createElement('h2'); title.textContent=objectName.charAt(0).toUpperCase()+objectName.slice(1); title.style.marginTop=0;
    let messageText=document.createElement('p'); messageText.textContent=message;
    let closeButton=document.createElement('button'); closeButton.textContent='Close'; closeButton.style.padding='10px 20px'; closeButton.style.cursor='pointer'; closeButton.onclick=()=>document.body.removeChild(overlay);
    dialog.append(title,messageText,closeButton); overlay.appendChild(dialog); document.body.appendChild(overlay); overlay.tabIndex=0; overlay.focus();
}

// Key press
function handleKeyPress(event){
    if(cutsceneActive) return;
    if((event.key==='e'||event.key==='E'||event.key==='Enter') && nearbyObject){
         console.log("Interagindo com:", nearbyObject.name);
        if(nearbyObject.name==="Henriette"){Talk2Henri(); return;}
        const state = objectStates[nearbyObject.name];
        let message = state.message || state.messages[state.interactions % state.messages.length];
        state.interactions++;
        showMessageDialog(nearbyObject.name,message);
    }
}

// Event listeners
document.addEventListener("keydown", event=>{moveByKey(event); handleKeyPress(event);});
document.addEventListener("keyup", stopMovement);
canvas.addEventListener("mousemove", e=>{
    const rect=canvas.getBoundingClientRect();
    const mouseX=e.clientX-rect.left;
    const mouseY=e.clientY-rect.top;
    if(nearbyObject && mouseX>=nearbyObject.x && mouseX<=nearbyObject.x+nearbyObject.width && mouseY>=nearbyObject.y && mouseY<=nearbyObject.y+nearbyObject.height){
        canvas.style.cursor="pointer";
    } else {canvas.style.cursor="default";}
});

// Initial draw
omori.onload = ()=>{drawOmori(Xomori,Yomori);}
tutorial();
