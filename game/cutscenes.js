// CUTSCENE MECHANICS ----------------------------------------------------------------
let lines = [];
let options = [];
let PlayerChoice = "";

function YOUshallSPEAK(text, img) {
    console.log("Tutorial cutscene");
    const cutsceneEl = document.querySelector('.cutscene');
    cutsceneEl.style.display = 'block';
    document.querySelector('.cutsceneDialogue').innerHTML = text;
    document.querySelector('.cutsceneImg').src = img;
}

function playCutscene(lines) {
    let currentStep = 0;

    function nextStep() {
        if (currentStep < lines.length) {
            const step = lines[currentStep];
            currentStep++;
            step();
        } else {
            console.log("Finished Cutscene");
            document.querySelector('.cutscene').style.display = 'none';
            document.removeEventListener('keydown', onKey);
        }
    }

    function onKey(e) {
        if (e.key === 'Enter') nextStep();
    }

    window.nextStep = nextStep;

    document.addEventListener('keydown', onKey);

// expose both to other scripts
    document.addEventListener('keydown', onKey);

    // expose both to other scripts
    window.nextStep = nextStep;
    window.pauseCutsceneInput = () => document.removeEventListener('keydown', onKey);
    window.resumeCutsceneInput = () => document.addEventListener('keydown', onKey);

    nextStep();

}

// CUTSCENES ----------------------------------------------------------------

function tutorial() {

    lines = [
        () => YOUshallSPEAK("Boa tarde! Como posso ajudar?", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Olá, estou um pouco perdido…", "sprites/cat.png"),
        () => YOUshallSPEAK("Ah, sim, entendo bem… Bom, seja bem vindo ao Café Fantôme.", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Agradeço, mas gostaria de voltar para casa-", "sprites/cat.png"),
        () => YOUshallSPEAK("Sinto muito, meu caro, mas pelo visto não sabe as regras do jogo?", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Jogo?", "sprites/cat.png"),
        () => YOUshallSPEAK("A única forma de ir embora é escolhendo o café certo para sua última xícara. Para isso, tens 2 opções de café antes: Caffè Latte, formado por uma suave e refrescante bebida com o equilíbrio perfeito de um café expresso,  leite e toda a cremosidade da espuma do leite.", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("E por fim o café Mocha, parecido com cappuccino, mistura de expresso, leite vaporizado e espuma de leite. A diferença é que pode ir chocolate, mas você decide conforme seu gosto.", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Porém adianto, tenha cautela ao escolher, somente poderá escolher o mesmo uma vez. Dica: vá primeiro de Caffè Latte. Caso precise, pode se dirigir ao banheiro quantas vezes quiser, apenas venha aqui que o levamos.", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Certo. Então eu quero um…", "sprites/cat.png"),
        () => YOUshallSPEAK("Antes que eu me esqueça, cuide o que faz ou fala por aí… Ah-", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Boa noite, Waiter.", "sprites/omori/omStanding_F.png"),
        () => Talk2Waiter()
    ];


    playCutscene(lines);
}

function Talk2Waiter() {

    lines = [
        () => YOUshallSPEAK("...?", "sprites/omori/omStanding_F.png"),
        () => YOUshallCHOOSE("Ahn.. eu gostaria de...", "sprites/cat.png",
            [
                { text: "Um Caffè Latte", value: "Caffè Latte" },
                { text: "Um Mocha", value: "Mocha" },
                { text: "Ver o menu (voltar)", value: "Back" }
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu um " + PlayerChoice + ".", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("Caffè Late"):
                YOUshallSPEAK("O Barista alcança ao Waiter um Caffè Latte.", "sprites/omori/omStanding_F.png");
            case ("Mocha"):
                YOUshallSPEAK("O Barista alcança ao Waiter um Mocha.", "sprites/omori/omStanding_F.png");
            case ("Back"):
                YOUshallSPEAK('O Waiter olha pro Barista e faz um sinal de "Não".', "sprites/omori/omStanding_F.png");
            }
        },
        () => {
            switch(PlayerChoice) {
            case ("Mocha"): window.location.href = "stock.html";
            case ("Caffè Latte"): window.location.href = "stock.html";
            case ("Back"): YOUshallSPEAK("O Barista acena com a cabeça.", "sprites/omori/omStanding_F.png");
            };
        }
    ];


    playCutscene(lines);
}