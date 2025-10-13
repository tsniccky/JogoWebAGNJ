// CUTSCENE MECHANICS ----------------------------------------------------------------
let lines = [];
let options = [];
let PlayerChoice = "";
localStorage.setItem("CompletedTutorial", false);
const PlayerName = localStorage.getItem("PlayerName");

function YOUshallSPEAK(text, img) {
    const cutsceneQuery = document.querySelector('.cutscene');
    cutsceneQuery.style.display = 'block';
    document.querySelector('.cutsceneDialogue').innerHTML = text;
    document.querySelector('.cutsceneImg').src = img;
}

function playCutscene(lines, cutsceneName) {
    let currentStep = 0;
    console.log("Comencing cutscene - " + cutsceneName);

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

    // apenas uma vez
    document.addEventListener('keydown', onKey);

    window.nextStep = nextStep;
    window.pauseCutsceneInput = () => document.removeEventListener('keydown', onKey);
    window.resumeCutsceneInput = () => document.addEventListener('keydown', onKey);

    nextStep();
}

// CUTSCENES ----------------------------------------------------------------

function tutorial() {

    lines = [
        () => YOUshallSPEAK("Boa tarde, como posso ajudar?", "sprites/omori/omStanding_F.png"),
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
        () => {
            YOUshallSPEAK("Boa noite, Waiter.", "sprites/omori/omStanding_F.png");
            localStorage.setItem("CompletedTutorial", true);
        },
        () => Talk2Waiter()
    ];

    if (localStorage.getItem("CompletedTutorial") !== "true") {
        localStorage.setItem("PlayerName", prompt("What's your name again?"));
        console.log("Comencing tutorial");
        playCutscene(lines, "TUTORIAL");
    } else {
        console.log("Tutorial already completed");
    }
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
            (choice) => {
                window.PlayerChoice = choice;
                YOUshallSPEAK("Você escolheu um " + choice + ".", "sprites/omori/omStanding_F.png");
                nextStep();
            }),
        () => {
            switch (PlayerChoice) {
                case "Caffè Latte":
                    YOUshallSPEAK("O Barista alcança ao Waiter um Caffè Latte.", "sprites/omori/omStanding_F.png");
                    break;
                case "Mocha":
                    YOUshallSPEAK("O Barista alcança ao Waiter um Mocha.", "sprites/omori/omStanding_F.png");
                    break;
                case "Back":
                    YOUshallSPEAK('O Waiter olha pro Barista e faz um sinal de "Não".', "sprites/omori/omStanding_F.png");
                    break;
            }
        },
        () => {
            switch (PlayerChoice) {
                case "Mocha": window.location.href = "stock.html"; break;
                case "Caffè Latte": window.location.href = "game_room.html"; break;
                case "Back": YOUshallSPEAK("O Barista acena com a cabeça.", "sprites/omori/omStanding_F.png"); break;
            }
        }
    ];

    playCutscene(lines, "Talk2Waiter");
}

function quiz() {

    lines = [
        () => YOUshallCHOOSE("Qual o maior produtor de café do mundo?", "sprites/omori/omStanding_F.png",
            [
                { text: "Vietnã", value: "Vietnã" },
                { text: "Brasil", value: "Brasil" },
                { text: "Haiti", value: "huh" }
            ],
            (choice) => {
                window.PlayerChoice = choice;
                YOUshallSPEAK("Você escolheu '" + choice + "'.", "sprites/omori/omStanding_F.png");
                nextStep();
            }),
        () => {
            switch (PlayerChoice) {
                case "Vietnã":
                    YOUshallSPEAK("okay...", "sprites/omori/omStanding_F.png");
                    break;
                case "Brasil":
                    YOUshallSPEAK("Correto.", "sprites/omori/omStanding_F.png");
                    break;
                case "huh":
                    YOUshallSPEAK("Tá...", "sprites/omori/omStanding_F.png");
                    currentStep -= 2; // volta pra pergunta anterior
                    nextStep();
                    break;
            }
        },

        () => YOUshallCHOOSE("Qual a diferença entre café especial e gourmet?", "sprites/omori/omStanding_F.png",
            [
                { text: "No especial vão sementes maduras, enquanto no gourmet tem poucos grãos ruins.", value: "a opção 1" },
                { text: "No especial é só café arábica, enquanto o gourmet utiliza só o robusta.", value: "a opção 2" }
            ],
            (choice) => {
                window.PlayerChoice = choice;
                YOUshallSPEAK("Você escolheu '" + choice + "'.", "sprites/omori/omStanding_F.png");
                nextStep();
            }),
        () => {
            switch (PlayerChoice) {
                case "a opção 1":
                    YOUshallSPEAK("Perfeito.", "sprites/omori/omStanding_F.png");
                    break;
                case "a opção 2":
                    YOUshallSPEAK("Você sabe que gourmet quer dizer algo mais requintado, certo?", "sprites/omori/omStanding_F.png");
                    break;
            }
        },

        () => YOUshallCHOOSE("O que acontece quando moemos o café na hora do preparo da bebida?", "sprites/omori/omStanding_F.png",
            [
                { text: "Ele fica mais cheiroso", value: "a opção 1" },
                { text: "O nível de açúcar reduz", value: "a opção 2" },
                { text: "O teor de cafeína aumenta", value: "a opção 3" }
            ],
            (choice) => {
                window.PlayerChoice = choice;
                YOUshallSPEAK("Você escolheu '" + choice + "'.", "sprites/omori/omStanding_F.png");
                nextStep();
            }),
        () => {
            switch (PlayerChoice) {
                case "a opção 1":
                    YOUshallSPEAK("Certo.", "sprites/omori/omStanding_F.png");
                    break;
                case "a opção 2":
                    YOUshallSPEAK("*Ele só te encara*", "sprites/omori/omStanding_F.png");
                    break;
                case "a opção 3":
                    YOUshallSPEAK("Não, isso depende do grão.", "sprites/omori/omStanding_F.png");
                    break;
            }
        },

        () => YOUshallCHOOSE("E por último, qual o principal motivo para torrar o café?", "sprites/omori/omStanding_F.png",
            [
                { text: "Tirar possíveis impurezas dos grãos", value: "a opção 1" },
                { text: "Revelar diferentes características, sabores e aromas", value: "a opção 2" },
                { text: "Diminuir o nível de cafeína...?", value: "a opção 3" }
            ],
            (choice) => {
                window.PlayerChoice = choice;
                YOUshallSPEAK("Você escolheu '" + choice + "'.", "sprites/omori/omStanding_F.png");
                nextStep();
            }),
        () => {
            switch (PlayerChoice) {
                case "a opção 1":
                    YOUshallSPEAK("Boa tentativa, mas não.", "sprites/omori/omStanding_F.png");
                    break;
                case "a opção 2":
                    YOUshallSPEAK("Uhum.", "sprites/omori/omStanding_F.png");
                    break;
                case "a opção 3":
                    YOUshallSPEAK("...Não vou nem comentar.", "sprites/omori/omStanding_F.png");
                    break;
            }
        },
    ];

    playCutscene(lines, "QUIZ");
}


