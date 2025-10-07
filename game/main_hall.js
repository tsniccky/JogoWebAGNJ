// Initial setup -------------------------------------------------------------------------

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let Xplayer = width / 2;
let Yplayer = height / 2;

let moveSpeed = 5;

let player_htbx = 20;

// Sprite loading ------------------------------------------------------------------------

const player = new Image();
player.src = "sprites/stickman.png";

const playerRun = new Image();
playerRun.src = "sprites/stickman.png";

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

player.onload = () => {
    drawplayer(Xplayer, Yplayer);
};

// Object hitboxes -----------------------------------------------------------------------

let objects = [
    { name: "door", x: 320, y: 40, width: 34, height: 52 },
    { name: "cat", x: 330, y: 415, width: 32, height: 32 },
    { name: "sketchbook", x: 565, y: 145, width: 35, height: 35 },
    { name: "tissues", x: 565, y: 330, width: 32, height: 32 },
    { name: "laptop", x: 400, y: 155, width: 37, height: 37 },
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

// Draw player and objects ----------------------------------------------------------------

let currentplayer = player;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Hitbox do player
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xplayer - player_htbx, Yplayer - player_htbx, player_htbx * 2, player_htbx * 2);
}


function drawplayer(x, y) {
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
        currentplayer,
        x - player_htbx,
        y - player_htbx,
        player_htbx * 2,
        player_htbx * 2
    );
    drawHitboxes();
}


// Movement ------------------------------------------------------------------------------

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
    }

    // player's bounding box for collision check
    let playerBox = {
        x: newX - player_htbx,
        y: newY - player_htbx,
        width: player_htbx * 2,
        height: player_htbx * 2
    };

    // Check collision with all objects
    let blocked = false;
    for (let obj of objects) {
        if (
            isColliding(
                playerBox.x, playerBox.y, playerBox.width, playerBox.height,
                obj.x, obj.y, obj.width, obj.height
            )
        ) {
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

    drawplayer(Xplayer, Yplayer);
    currentplayer = player;
}

function stopMovement() {
    currentplayer = player;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawplayer(Xplayer, Yplayer);
}

// Adicione esta função para detectar cliques nos objetos
function handleCanvasClick(event) {
    // Obter as coordenadas do clique relativas ao canvas
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Verificar se o clique foi em algum objeto
    for (let obj of objects) {
        if (
            clickX >= obj.x && 
            clickX <= obj.x + obj.width &&
            clickY >= obj.y && 
            clickY <= obj.y + obj.height
        ) {
            // Objeto clicado!
            handleObjectClick(obj.name);
            break; // Para após encontrar o primeiro objeto clicado
        }
    }
}

// Função para lidar com o clique em um objeto específico
function handleObjectClick(objectName) {
    console.log(`Objeto clicado: ${objectName}`);
    
    // Aqui você pode adicionar ações específicas para cada objeto
    switch (objectName) {
        case "door":
            alert("Você clicou na porta!");
            // Exemplo: abrir um menu, mudar de cena, etc.
            break;
        case "cat":
            alert("O gato miou!");
            // Exemplo: reproduzir som, animação, etc.
            break;
        case "sketchbook":
            alert("Você abriu o sketchbook!");
            break;
        case "tissues":
            alert("Caixa de lenços!");
            break;
        case "laptop":
            alert("Laptop ligado!");
            break;
        case "lightbulb":
            alert("Lâmpada acesa!");
            break;
    }
}

// Adicione este event listener ao canvas (coloque junto com os outros event listeners)
canvas.addEventListener("click", handleCanvasClick);

// Opcional: mudar o cursor quando estiver sobre um objeto clicável
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    let isOverObject = false;
    
    for (let obj of objects) {
        if (
            mouseX >= obj.x && 
            mouseX <= obj.x + obj.width &&
            mouseY >= obj.y && 
            mouseY <= obj.y + obj.height
        ) {
            isOverObject = true;
            break;
        }
    }
    
    // Muda o cursor para "pointer" quando sobre um objeto clicável
    canvas.style.cursor = isOverObject ? "pointer" : "default";
});

// Event listeners -----------------------------------------------------------------------

document.addEventListener("keydown", moveByKey);
document.addEventListener("keyup", stopMovement);
