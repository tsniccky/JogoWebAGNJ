// CUTSCENE MECHANICS ----------------------------------------------------------------

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
            lines[currentStep]();
            currentStep++;
        } else {
            console.log("Finished Cutscene");
            document.querySelector('.cutscene').style.display = 'none';
            document.removeEventListener('keydown', onKey);
        }
    }

    function onKey(e) {
        if (e.key === 'Enter') nextStep();
    }

    document.addEventListener('keydown', onKey);

    nextStep();
}

// CUTSCENES ----------------------------------------------------------------

function tutorial() {
    const lines = [
        () => YOUshallSPEAK("I am Omori. I'm just a placeholder. I'm replaceable :(", "sprites/omori/omStanding_F.png"),
        () => YOUshallSPEAK("Meow", "sprites/cat.png"),
        () => YOUshallSPEAK("Yeah, I guess you're right...", "sprites/omori/omStanding_F.png"),
    ];

    playCutscene(lines);
}
