const dialogueQueue = {
    "waiter": ["...", "The Waiter keeps silent", "He stares at you"]
};

function showNextDialogue(character) {
  const queue = dialogueQueue[character];
  
  if (!queue || queue.length === 0) {
    document.querySelector('.dialogue').textContent = "Dialogue finished.";
    return;
  }

  const nextLine = queue.shift();
  return nextLine;
}

function handleObjectInteraction(objectName) {
    let state = objectStates[objectName];
    if (!state) return;
    
    state.interactions++;
    
    let message = "";
    
    switch (objectName) {
        case "door1":
            if (confirm("Do you want to go to the bathroom?")) {
                window.location.href = "salas/banheiro.html";
            }
            return;
            
        case "cat":
        case "sketchbook":
        case "tissues":
        case "television":
        case "lightbulb":
            if (state.messages) {
                let messageIndex = (state.interactions - 1) % state.messages.length;
                message = state.messages[messageIndex];
            } else {
                message = state.message;
            }
            showMessageDialog(objectName, message);
        case "waiter":
            Talk2Waiter();
            return;
        case "necker":
            Talk2JNecker2();
            return;
    }
}