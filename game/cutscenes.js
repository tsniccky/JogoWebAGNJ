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
        () => {YOUshallSPEAK("Boa noite, Waiter.", "sprites/omori/omStanding_F.png");
            localStorage.setItem("CompletedTutorial", true);},
        () => Talk2Waiter()
    ];

    if (localStorage.getItem("CompletedTutorial") === false) {
        localStorage.setItem ("PlayerName", prompt("What's your name again?"));
        console.log("Comencing tutorial");
        playCutscene(lines, "TUTORIAL");
    } else {
        console.log("Tutorial already completed");
        //playCutscene(lines, "TUTORIAL");
        //un-comment to make cutscene play regardless
    }
}

function Talk2Waiter() {
    cutsceneActive = true;

    const lines = [
        // Linha inicial
        () => YOUshallSPEAK("...?", "sprites/omori/omStanding_F.png"),

        // Escolha do café
        () => YOUshallCHOOSE(
            "Ahn.. eu gostaria de...",
            "sprites/cat.png",
            [
                { text: "Um Caffè Latte", value: "Caffè Latte" },
                { text: "Um Mocha", value: "Mocha" },
                { text: "Ver o menu (voltar)", value: "Back" }
            ],
            (choice) => {
                PlayerChoice = choice; // salva escolha global

                // Mostra fala do jogador sobre a escolha
                YOUshallSPEAK("Você escolheu um " + choice + ".", "sprites/omori/omStanding_F.png");

                // Continua a cutscene
                nextStep();
            }
        ),

        // Reação do Barista
        () => {
            switch(PlayerChoice) {
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

        // Decisão final
        () => {
            switch(PlayerChoice) {
                case "Mocha":
                    window.location.href = "stock.html";
                    break;
                case "Caffè Latte":
                    window.location.href = "game_room.html";
                    break;
                case "Back":
                    YOUshallSPEAK("O Barista acena com a cabeça.", "sprites/omori/omStanding_F.png");
                    break;
            }
        }
    ];

    playCutscene(lines, "Talk2Waiter");
}


function Talk2JNecker1() {

    lines = [
        () => YOUshallSPEAK("Quem- O que é você?", "sprites/cat.png"),
        () => YOUshallSPEAK("J. Necker, responsável pela contabilidade e departamento de recursos espectrais.", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Seja muito bem vindo, " + PlayerName + ".", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("!!", "sprites/cat.png"),
        () => YOUshallSPEAK("Ah, não se preocupe. Não é o único. Sei o nome de cada alma que pisa neste café.", "sprites/omori/omStanding_F.png"),
        () => YOUshallCHOOSE("Agora, vamos às questões? O café está esfriando.", "sprites/omori/omStanding_F.png",
            [
                { text: "Sim", value: "sim" },
                { text: "Ainda não", value: "não" },
                { text: "Questões? Não estou aqui para ser interrogado.", value: "huh" }
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("sim"):
                YOUshallSPEAK("Ótimo. Vamos à primeira então.", "sprites/omori/omStanding_F.png");;
                break;
            case ("não"):
                YOUshallSPEAK("Certo. Só lembre que o tempo está correndo.", "sprites/omori/omStanding_F.png");
                break;
            case ("huh"):
                YOUshallSPEAK("... sussurro Olha, eu só tô tentando te ajudar. Só confie em mim e responda, sim?", "sprites/omori/omStanding_F.png");
                break;
            }
        },
        () => {
            switch(PlayerChoice) {
            case ("sim"):
                quiz();
                break;
            case ("huh"):
                quiz();
                break;
            }
        }
    ];

    playCutscene(lines, "Talk2JNecker1");
}

function Talk2JNecker2() {

    lines = [
        () => YOUshallCHOOSE("Pronto para as perguntas?", "sprites/omori/omStanding_F.png",
            [
                { text: "Sim", value: "sim" },
                { text: "Ainda não", value: "não" },
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("sim"):
                YOUshallSPEAK("Ótimo. Vamos à primeira então.", "sprites/omori/omStanding_F.png");;
                break;
            case ("não"):
                YOUshallSPEAK("Okay. Não diga que não tentei te avisar.", "sprites/omori/omStanding_F.png");
                break;
            }
        },
        () => {
            switch(PlayerChoice) {
            case ("sim"):
                quiz();
                break;
            }
        }
    ];

    playCutscene(lines, "Talk2JNecker2");
}

function quiz() {

    lines = [
        () => YOUshallCHOOSE("Qual o maior produtor de café do mundo?", "sprites/omori/omStanding_F.png",
            [
                { text: "Vietnã", value: "Vietnã" },
                { text: "Brasil", value: "Brasil" },
                { text: "Haiti", value: "huh" }
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("Vietnã"):
                YOUshallSPEAK("okay...", "sprites/omori/omStanding_F.png");
                break;
            case ("Brasil"):
                YOUshallSPEAK("Correto.", "sprites/omori/omStanding_F.png");
                break;
            case ("huh"):
                YOUshallSPEAK("Tá...", "sprites/omori/omStanding_F.png");
                quiz();
                break;
            }
        },


        () => YOUshallCHOOSE("Qual a diferença entre café especial e gourmet?", "sprites/omori/omStanding_F.png",
            [
                { text: "No especial vão sementes maduras, enquanto no gourmet tem poucos grãos ruins.", value: "a opção 1" },
                { text: "No especial é só café arábica, enquanto o gourmet utiliza só o robusta.", value: "a opção 2" } 
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Perfeito.", "sprites/omori/omStanding_F.png");
                break;
         
                case ("a opção 2"):
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
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Certo.", "sprites/omori/omStanding_F.png");
                break;
            case ("a opção 2"):
                YOUshallSPEAK("Ele só te encara", "sprites/omori/omStanding_F.png");
                break;
            case ("a opção 3"):
                YOUshallSPEAK("Não, isso depende do grão.", "sprites/omori/omStanding_F.png");
                break;
            }
        },

        () => YOUshallCHOOSE("E por último, qual o principal motivo para torrar o café?", "sprites/omori/omStanding_F.png",
            [
                { text: "Tirar possíveis impurezas dos grãos", value: "a opção 1" },
                { text: "Revelar diferentes características, sabores e aromas", value: "a opção 2" },
                { text: "Diminuir o nível de cafeína...?", value: "a opção 3"}
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/omori/omStanding_F.png");
                nextStep(); // continue to the next line in the cutscene
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Boa tentativa, mas não.", "sprites/omori/omStanding_F.png");
                break;
            case ("a opção 2"):
                YOUshallSPEAK("Uhum.", "sprites/omori/omStanding_F.png");
                break;
            case ("a opção 3"):
                YOUshallSPEAK("...Não vou nem comentar.", "sprites/omori/omStanding_F.png");
                break;
            }
        },
    ];

    playCutscene(lines, "QUIZ");

}


function playCutscene(lines, nextSceneName) {
    cutsceneActive = true;

    let i = 0;

    window.nextStep = function() {
        if (i < lines.length) {
            const lineFunc = lines[i];
            i++;
            lineFunc(); // executa a função atual da linha
        } else {
            cutsceneActive = false;
            console.log("Cutscene ended:", nextSceneName);
            window.nextStep = null; // limpa referência
        }
    }

    nextStep(); // inicia a primeira linha
}
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && cutsceneActive) {
        if (window.nextStep) window.nextStep();
    }
});


function YOUshallSPEAK(text, img) {
    const cutsceneEl = document.querySelector('.cutscene');
    cutsceneEl.style.display = 'block';

    const dialogueText = document.querySelector('.cutsceneDialogue');
    dialogueText.textContent = text;

    const dialogueImg = document.querySelector('.cutsceneImg');
    dialogueImg.src = img;

    
}




let HenrietteFirstVisit = true;

function Talk2Henri() {
    cutsceneActive = true;

    const promptText = HenrietteFirstVisit 
        ? "Oiii, tudo bem? Sou Henriette, vou te ajudar na decisão do café. Temos 3 sacos, qual você escolhe?"
        : "Ah, você voltou! Então, qual saco você escolhe agora?";

    YOUshallCHOOSE(
        promptText,
        "sprites/omori/omStanding_F.png",
        [
            { text: "Saco 1", value: "saco1" },
            { text: "Saco 2", value: "saco2" },
            { text: "Saco 3", value: "saco3" },
            { text: "Ainda não olhei.", value: "nao" }
        ],
        (choice) => {
            PlayerChoice = choice;
            HenrietteFirstVisit = false; // marca que já visitou

            switch(choice) {
                case "saco1":
                case "saco2":
                    YOUshallSPEAK("Você escolheu o " + choice + "… errou! Infelizmente. Mas talvez possamos ser amigos?...", "sprites/omori/omStanding_F.png");
                    window.location.href = "game_over.html"; 
                    break;
                case "saco3":
                    YOUshallSPEAK("Você escolheu o Saco 3… Acertou! Parabéns!", "sprites/omori/omStanding_F.png");
                    window.location.href = "win_game.html";
                    break;
                case "nao":
                    cutsceneActive = false; // libera movimento
                    YOUshallSPEAK("Tudo bem! Explore o café e volte quando estiver pronto.", "sprites/omori/omStanding_F.png");
                    break;
            }
        }
    );
}


