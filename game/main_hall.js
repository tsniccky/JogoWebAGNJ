// Initial setup -------------------------------------------------------------------------
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let Xomori = width / 2;
let Yomori = height / 2;
let moveSpeed = 5;
let omori_htbx = 20;

// Sistema de áudio
let musica = new Audio("musica.mp3"); // Arquivo chamado "musica.mp3"
let audioStarted = false;

// Sistema de diálogo
let dialogActive = false;
let currentDialog = "";
let dialogText = "";
let currentChar = 0;
let typingSpeed = 30;
let dialogTimer = 0;

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

// Configurar música
function setupMusica() {
    // Configurações da música
    musica.loop = true; // Fazer loop infinito
    musica.volume = 0.5; // Volume em 50%
    
    // Política de autoplay - só inicia após interação do usuário
    document.addEventListener('click', startMusica, { once: true });
    document.addEventListener('keydown', startMusica, { once: true });
}

function startMusica() {
    if (!audioStarted) {
        musica.play().catch(error => {
            console.log("Erro ao reproduzir música:", error);
        });
        audioStarted = true;
    }
}

// Funções para controlar a música
function pausarMusica() {
    musica.pause();
}

function continuarMusica() {
    if (audioStarted) {
        musica.play();
    }
}

function ajustarVolume(volume) {
    // Volume entre 0.0 e 1.0
    musica.volume = Math.max(0, Math.min(1, volume));
}

// Initial draw --------------------------------------------------------------------------
omori.onload = () => {
    drawOmori(Xomori, Yomori);
    setupMusica(); // Configurar música quando o jogo carregar
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

// Sistema de Diálogo no estilo Omori ----------------------------------------------------
function showDialog(text) {
    dialogActive = true;
    currentDialog = text;
    dialogText = "";
    currentChar = 0;
    dialogTimer = 0;
}

function updateDialog() {
    if (!dialogActive) return;
    
    dialogTimer++;
    if (dialogTimer >= typingSpeed && currentChar < currentDialog.length) {
        dialogText += currentDialog[currentChar];
        currentChar++;
        dialogTimer = 0;
    }
}

function drawDialog() {
    if (!dialogActive) return;
    
    // Caixa de diálogo - estilo Omori (preto e branco)
    const dialogWidth = width - 100;
    const dialogHeight = 120;
    const dialogX = 50;
    const dialogY = height - dialogHeight - 30;
    
    // Fundo da caixa de diálogo (preto com borda branca)
    ctx.fillStyle = 'black';
    ctx.fillRect(dialogX, dialogY, dialogWidth, dialogHeight);
    
    // Borda branca
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeRect(dialogX, dialogY, dialogWidth, dialogHeight);
    
    // Linha divisória
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(dialogX + 10, dialogY + 30);
    ctx.lineTo(dialogX + dialogWidth - 10, dialogY + 30);
    ctx.stroke();
    
    // Texto do diálogo
    ctx.fillStyle = 'white';
    ctx.font = '16px "Courier New", monospace';
    ctx.textAlign = 'left';
    
    // Quebra de texto para caber na caixa
    const maxWidth = dialogWidth - 40;
    const lineHeight = 20;
    let lines = [];
    let currentLine = '';
    
    for (let char of dialogText) {
        const testLine = currentLine + char;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = char;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    
    // Desenhar linhas de texto
    for (let i = 0; i < Math.min(lines.length, 3); i++) {
        ctx.fillText(lines[i], dialogX + 20, dialogY + 60 + (i * lineHeight));
    }
    
    // Indicador de continuar (piscante)
    if (currentChar >= currentDialog.length) {
        if (Math.floor(dialogTimer / 30) % 2 === 0) {
            ctx.fillText("▼", dialogX + dialogWidth - 30, dialogY + dialogHeight - 15);
        }
    }
}

function handleDialogInput(event) {
    if (!dialogActive) return;
    
    if (event.key === " " || event.key === "Enter" || event.key === "Escape") {
        if (currentChar < currentDialog.length) {
            // Pular animação de digitação
            dialogText = currentDialog;
            currentChar = currentDialog.length;
        } else {
            // Fechar diálogo
            dialogActive = false;
            // Redesenhar a cena
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawOmori(Xomori, Yomori);
        }
    }
}

// Draw Omori and objects ----------------------------------------------------------------
let currentOmori = omori;

function drawHitboxes() {
    ctx.strokeStyle = 'red';
    for (let obj of objects) {
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // Hitbox do Omori
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(Xomori - omori_htbx, Yomori - omori_htbx, omori_htbx * 2, omori_htbx * 2);
}

function drawOmori(x, y) {
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
        currentOmori,
        x - omori_htbx,
        y - omori_htbx,
        omori_htbx * 2,
        omori_htbx * 2
    );
    
    drawHitboxes();
    drawDialog();
}

// Movement ------------------------------------------------------------------------------
function moveByKey(event) {
    if (dialogActive) return;
    
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
    if (!dialogActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOmori(Xomori, Yomori);
    }
}

// Interações com objetos ----------------------------------------------------------------
function handleObjectClick(objectName) {
    if (dialogActive) return;
    
    switch (objectName) {
        case "door":
            showDialog("A porta está trancada... Talvez eu deva terminar minhas tarefas primeiro.");
            break;
        case "cat":
            showDialog("Mewo parece feliz em me ver. Ela ronrona suavemente.");
            break;
        case "sketchbook":
            showDialog("Meus desenhos... Eles me trazem memórias confusas.");
            break;
        case "tissues":
            showDialog("Sempre bom ter lenços por perto. Nunca se sabe quando vou precisar.");
            break;
        case "laptop":
            showDialog("O laptop está desligado. Melhor não mexer agora.");
            break;
        case "lightbulb":
            showDialog("A luz está um pouco fraca... Assim como tudo aqui.");
            break;
    }
}

// Event listeners -----------------------------------------------------------------------
document.addEventListener("keydown", function(event) {
    if (dialogActive) {
        handleDialogInput(event);
    } else {
        moveByKey(event);
    }
});

document.addEventListener("keyup", stopMovement);

// Door interaction
canvas.addEventListener("click", function(event) {
    if (dialogActive) return;
    
    // Get click position relative to canvas
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    
    // Check if clicked on any object
    for (let obj of objects) {
        if (
            clickX >= obj.x && 
            clickX <= obj.x + obj.width &&
            clickY >= obj.y && 
            clickY <= obj.y + obj.height
        ) {
            handleObjectClick(obj.name);
            return;
        }
    }
});

// Game loop para atualizar diálogo
function gameLoop() {
    updateDialog();
    if (dialogActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOmori(Xomori, Yomori);
    }
    requestAnimationFrame(gameLoop);
}

// Iniciar game loop
gameLoop();
