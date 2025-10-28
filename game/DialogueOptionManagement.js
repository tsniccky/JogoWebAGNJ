function YOUshallCHOOSE(text, img, options, onComplete) {
  const cutsceneEl = document.querySelector('.cutscene');
  cutsceneEl.style.display = 'block';
  document.querySelector('.cutsceneImg').src = img;

  const dialogueText = document.querySelector('.cutsceneDialogue');
  dialogueText.textContent = text;

  const optionsContainer = document.getElementById('cutsceneOptions');
  optionsContainer.innerHTML = '';
  optionsContainer.style.display = 'flex';

  options.forEach((option) => {
    const optEl = document.createElement('p');
    optEl.className = 'option';
    optEl.textContent = option.text;
    optionsContainer.appendChild(optEl);
  });

  let selectedIndex = 0;
  const optionElements = Array.from(optionsContainer.querySelectorAll('.option'));
  optionElements[selectedIndex].classList.add('highlighted');

  function updateHighlight() {
    optionElements.forEach((el, i) => {
        el.classList.toggle('highlighted', i === selectedIndex);
    });
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % optionElements.length;
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      selectedIndex = (selectedIndex - 1 + optionElements.length) % optionElements.length;
      updateHighlight();
    } else if (e.key === 'Enter') {
      const selectedOption = options[selectedIndex];

      optionsContainer.style.display = 'none';
      optionsContainer.innerHTML = '';

      document.removeEventListener('keydown', onKeyDown);

      console.log("Option chosen:", selectedOption);

      if (selectedOption.callback) selectedOption.callback();

      if (onComplete) onComplete(PlayerChoice = selectedOption.value);

      if (window.resumeCutsceneInput) window.resumeCutsceneInput();

    }
  }

  document.addEventListener('keydown', onKeyDown);
  if (window.pauseCutsceneInput) window.pauseCutsceneInput();
}

