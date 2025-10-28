// CUTSCENES 

function tutorial() {

    lines = [
        () => YOUshallSPEAK("Boa tarde, como posso ajudar?", "sprites/waiter.webp"),
        () => YOUshallSPEAK("Olá, estou um pouco perdido…", "sprites/jogador.webp"),
        () => YOUshallSPEAK("Ah, sim, entendo bem… Bom, seja bem vindo ao Café Fantôme.", "sprites/waiter.webp"),
        () => YOUshallSPEAK("Agradeço, mas gostaria de voltar para casa-", "sprites/jogador.webp"),
        () => YOUshallSPEAK("Sinto muito, meu caro, mas pelo visto não sabe as regras do jogo?", "sprites/waiter.webp"),
        () => YOUshallSPEAK("Jogo?", "sprites/jogador.webp"),
        () => YOUshallSPEAK("A única forma de ir embora é escolhendo o café certo para sua última xícara. Para isso, tens 2 opções de café antes: Caffè Latte, formado por uma suave e refrescante bebida com o equilíbrio perfeito de um café expresso,  leite e toda a cremosidade da espuma do leite.", "sprites/waiter.webp"),
        () => YOUshallSPEAK("E por fim o café Mocha, parecido com cappuccino, mistura de expresso, leite vaporizado e espuma de leite. A diferença é que pode ir chocolate, mas você decide conforme seu gosto.", "sprites/waiter.webp"),
        () => YOUshallSPEAK("Porém adianto, tenha cautela ao escolher, somente poderá escolher o mesmo uma vez. Dica: vá primeiro de Caffè Latte. Caso precise, pode se dirigir ao banheiro quantas vezes quiser, apenas venha aqui que o levamos.", "sprites/waiter.webp"),
        () => YOUshallSPEAK("Certo. Então eu quero um…", "sprites/jogador.webp"),
        () => YOUshallSPEAK("Antes que eu me esqueça, cuide o que faz ou fala por aí… Ah-", "sprites/waiter.webp"),
        () => {YOUshallSPEAK("Boa noite, Waiter.", "sprites/waiter.webp");
            localStorage.setItem("CompletedTutorial", true);},
        () => Talk2Waiter()
    ];

    if (localStorage.getItem("CompletedTutorial") === false) {
        localStorage.setItem ("PlayerName", prompt("What's your name again?"));
        console.log("Comencing tutorial");
        playCutscene(lines, "TUTORIAL");
    } else {
        console.log("Tutorial already completed");
        playCutscene(lines, "TUTORIAL");
   
    }
}

function Talk2Waiter() {
    cutsceneActive = true;

    const lines = [
      
        () => YOUshallSPEAK("...?", "sprites/waiter.webp"),

        // Escolha do café
        () => YOUshallCHOOSE(
            "Ahn.. eu gostaria de...",
            "sprites/jogador.webp",
            [
                { text: "Um Caffè Latte", value: "Caffè Latte" },
                { text: "Um Mocha", value: "Mocha" },
                { text: "Ver o menu (voltar)", value: "Back" }
            ],
            (choice) => {
                PlayerChoice = choice; 

                YOUshallSPEAK("Você escolheu um " + choice + ".", "sprites/waiter.webp");

                
                nextStep();
            }
        ),

        // Reação do Barista
        () => {
            switch(PlayerChoice) {
                case "Caffè Latte":
                    YOUshallSPEAK("O Barista alcança ao Waiter um Caffè Latte.", "sprites/waiter.webp");
                    break;
                case "Mocha":
                    YOUshallSPEAK("O Barista alcança ao Waiter um Mocha.", "sprites/waiter.webp");
                    break;
                case "Back":
                    YOUshallSPEAK('O Waiter olha pro Barista e faz um sinal de "Não".', "sprites/waiter.webp");
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
                    YOUshallSPEAK("O Barista acena com a cabeça.", "sprites/waiter.webp");
                    break;
            }
        }
    ];

    playCutscene(lines, "Talk2Waiter");
}


function Talk2JNecker1() {
    lines = [
        () => YOUshallSPEAK("Quem- O que é você?", "sprites/jogador.webp"),
        () => YOUshallSPEAK("J. Necker, responsável pela contabilidade e departamento de recursos espectrais.", "sprites/necker.webp"),
        () => YOUshallSPEAK("Seja muito bem vindo, " + PlayerName + ".", "sprites/necker.webp"),
        () => YOUshallSPEAK("!!", "sprites/jogador.webp"),
        () => YOUshallSPEAK("Ah, não se preocupe. Não é o único. Sei o nome de cada alma que pisa neste café.", "sprites/necker.webp"),
        () => YOUshallCHOOSE(
            "Agora, vamos às questões? O café está esfriando.",
            "sprites/necker.webp",
            [
                { text: "Sim", value: "sim" },
                { text: "Ainda não", value: "não" },
                { text: "Questões? Não estou aqui para ser interrogado.", value: "huh" }
            ],
            (PlayerChoice) => {
                YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/necker.webp");
                nextStep(); 

                // log pra debug
                console.log("DEBUG: escolha JNecker1 = ", PlayerChoice);

                // inicia temporizador imediatamente se escolheu "sim" (case-insensitive)
                if (typeof PlayerChoice === "string" && PlayerChoice.toLowerCase() === "sim") {
                    if (!window.cancelarTimer) {
                        window.cancelarTimer = iniciarTemporizador();
                        console.log("DEBUG: temporizador iniciado via callback da escolha");
                    }
                }
            }
        ),
        () => {
            switch (PlayerChoice) {
                case ("sim"):
                    YOUshallSPEAK("Ótimo. Vamos à primeira então.", "sprites/waiter.webp");
                    // nota: iniciamos o temporizador no callback acima para maior confiabilidade
                    break;
                case ("não"):
                    YOUshallSPEAK("Certo. Só lembre que o tempo está correndo.", "sprites/waiter.webp");
                    break;
                case ("huh"):
                    YOUshallSPEAK("... sussurro Olha, eu só tô tentando te ajudar. Só confie em mim e responda, sim?", "sprites/waiter.webp");
                    break;
            }
        },
        () => {
            switch (PlayerChoice) {
                case ("sim"):
                case ("huh"):
                    // cancela o temporizador quando o quiz realmente começa
                    if (window.cancelarTimer) {
                        window.cancelarTimer();
                        window.cancelarTimer = null;
                    }
                    quiz();
                    break;
            }
        }
    ];

    playCutscene(lines, "Talk2JNecker1");
}



function Talk2JNecker2() {

    lines = [
        () => YOUshallCHOOSE("Pronto para as perguntas?", "sprites/necker.webp",
            [
                { text: "Sim", value: "sim" },
                { text: "Ainda não", value: "não" },
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/waiter.webp");
                nextStep(); 
            }),
        () => {
            switch(PlayerChoice) {
            case ("sim"):
                YOUshallSPEAK("Ótimo. Vamos à primeira então.", "sprites/necker.webp");
                break;
            case ("não"):
                YOUshallSPEAK("Okay. Não diga que não tentei te avisar.", "sprites/necker.webp");
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
        () => YOUshallCHOOSE("Qual o maior produtor de café do mundo?", "sprites/necker.webp",
            [
                { text: "Vietnã", value: "Vietnã" },
                { text: "Brasil", value: "Brasil" },
                { text: "Haiti", value: "huh" }
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/necker.webp");
                nextStep(); 
            }),
        () => {
            switch(PlayerChoice) {
            case ("Vietnã"):
                YOUshallSPEAK("okay...", "sprites/necker.webp");
                break;
            case ("Brasil"):
                YOUshallSPEAK("Correto.", "sprites/necker.webp");
                break;
            case ("huh"):
                YOUshallSPEAK("Tá...", "sprites/necker.webp");
                quiz();
                break;
            }
        },


        () => YOUshallCHOOSE("Qual a diferença entre café especial e gourmet?", "sprites/necker.webp",
            [
                { text: "No especial vão sementes maduras, enquanto no gourmet tem poucos grãos ruins.", value: "a opção 1" },
                { text: "No especial é só café arábica, enquanto o gourmet utiliza só o robusta.", value: "a opção 2" } 
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/necker.webp");
                nextStep(); 
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Perfeito.", "sprites/necker.webp");
                break;

            case ("a opção 2"):
                YOUshallSPEAK("Você sabe que gourmet quer dizer algo mais requintado, certo?", "sprites/necker.webp");
                break;
            }
        },

        () => YOUshallCHOOSE("O que acontece quando moemos o café na hora do preparo da bebida?", "sprites/necker.webp",
            [
                { text: "Ele fica mais cheiroso", value: "a opção 1" },
                { text: "O nível de açúcar reduz", value: "a opção 2" },
                { text: "O teor de cafeína aumenta", value: "a opção 3" } 
            ],
            (PlayerChoice) => {YOUshallSPEAK("Você escolheu '" + PlayerChoice + "'.", "sprites/necker.webp");
                nextStep();
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Certo.", "sprites/necker.webp");
                break;
            case ("a opção 2"):
                YOUshallSPEAK("Ele só te encara", "sprites/necker.webp");
                break;
            case ("a opção 3"):
                YOUshallSPEAK("Não, isso depende do grão.", "sprites/necker.webp");
                break;
            }
        },

        () => YOUshallCHOOSE("E por último, qual o principal motivo para torrar o café?", "sprites/necker.webp",
            [
                { text: "Tirar possíveis impurezas dos grãos", value: "a opção 1" },
                { text: "Revelar diferentes características, sabores e aromas", value: "a opção 2" },
                { text: "Diminuir o nível de cafeína...?", value: "a opção 3"}
            ],
            (PlayerChoice) => {YOUshallSPEAK("Parabéns! Uma dica: lembre-se do café robusta...", "sprites/necker.webp");
                nextStep();
            }),
        () => {
            switch(PlayerChoice) {
            case ("a opção 1"):
                YOUshallSPEAK("Boa tentativa, mas não.", "sprites/necker.webp");
                break;
            case ("a opção 2"):
                YOUshallSPEAK("Uhum.", "sprites/necker.webp");
                break;
            case ("a opção 3"):
                YOUshallSPEAK("...Não vou nem comentar.", "sprites/necker.webp");
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
            lineFunc(); 
        } else {
            cutsceneActive = false;
            console.log("Cutscene ended:", nextSceneName);
            window.nextStep = null; 
        }
    }

    nextStep(); 
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
        "sprites/henriete.webp",
        [
            { text: "Saco 1", value: "saco1" },
            { text: "Saco 2", value: "saco2" },
            { text: "Saco 3", value: "saco3" },
            { text: "Ainda não olhei.", value: "nao" }
        ],
        (choice) => {
            PlayerChoice = choice;
            HenrietteFirstVisit = false; 

            switch(choice) {
                case "saco1":
                case "saco2":
                    YOUshallSPEAK("Você escolheu o " + choice + "… errou! Infelizmente. Mas talvez possamos ser amigos?...", "sprites/henriete.webp");
                    window.location.href = "game_over.html"; 
                    break;
                case "saco3":
                    YOUshallSPEAK("Você escolheu o Saco 3… Acertou! Parabéns!", "sprites/henriete.webp");
                    window.location.href = "win_game.html";
                    break;
                case "nao":
                    cutsceneActive = false; 
                    YOUshallSPEAK("Tudo bem! Explore o café e volte quando estiver pronto.", "sprites/henriete.webp");
                    break;
            }
        }
    );
}


function iniciarTemporizador() {
    let tempo = 30;
    const temporizadorEl = document.getElementById("temporizador");
    temporizadorEl.style.display = "block";
    temporizadorEl.textContent = tempo;

    // 🎵 Cria e inicia o áudio
    const audio = new Audio("correbixo.mp3");
    audio.loop = true; 
    audio.volume = 1; 
    audio.play().catch(err => console.log("Erro ao tocar áudio:", err));

    //  Timer
    const intervalo = setInterval(() => {
        tempo--;
        temporizadorEl.textContent = tempo;

        if (tempo <= 0) {
            clearInterval(intervalo);
            temporizadorEl.textContent = "Tempo esgotado!";
            
            // Para o áudio quando o tempo acabar
            audio.pause();
            audio.currentTime = 0;

            setTimeout(() => (window.location.href = "main_hall.html"), 1000);
        }
    }, 1000);

   
    return () => {
        clearInterval(intervalo);
        audio.pause();
        audio.currentTime = 0;
        temporizadorEl.style.display = "none";
    };
}




