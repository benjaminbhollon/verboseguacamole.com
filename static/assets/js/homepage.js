/* Typewriter */
const addCharDelay = 75;
const removeCharDelay = 45;
const wordDelay = 1500;
const typewriterElement = document.getElementById('typewriter');
const typewriterPrompts = [
  'Novel-writing made simple',
  'Simplicity + Control = VerbGuac',
  'Burrito-fueled creativity',
  'Easy version control',
  'Community-built software',
  'Whimsy-based design',
  'NaNoWriMo Compatible',
];
let currentTypewriterIndex = 0;

function typeNextPrompt() {
  function typeChar(char) {
    typewriterElement.innerText += char;
  }
  function removeChar() {
    typewriterElement.innerText = typewriterElement.innerText.slice(0, -1);
  }

  const word = typewriterPrompts[currentTypewriterIndex];
  let delaySoFar = 0;
  // Type it
  for (const char of word) {
    setTimeout(typeChar.bind(this, char), delaySoFar);
    delaySoFar += addCharDelay;
  }

  delaySoFar += wordDelay;

  for (const char of word.split('').reverse()) {
    setTimeout(removeChar, delaySoFar);
    delaySoFar += removeCharDelay;
  }

  currentTypewriterIndex = (currentTypewriterIndex + 1) % typewriterPrompts.length;
  setTimeout(typeNextPrompt, delaySoFar);
}

setTimeout(typeNextPrompt, wordDelay);
