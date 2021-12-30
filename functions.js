// helper functions
export function setAttributes(element, attributes) {
  for (let [attribute, value] of Object.entries(attributes)) {
    element.setAttributes(attribute, value);
  }
}

// Creates an individual sound/range slider element.
export function createSoundsElement(soundObject) {
  // constants
  const MIN = 0;
  const MAX = 100;
  const STEP = 2;
  // generate audio element
  let audioElement = document.createElement("audio");
  let audioSourceElement = document.createElement("source");
  setAttributes(audioSourceElement, {
    src: "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3",
    type: "audio/mpeg"
  });
  audioElement.append(audioSourceElement);
  // generate the HTML for a sound volume slider
  let soundContainer = document.createElement("div"); //.classList.add("sounds-container")
  let soundImage = document.createElement("img");
  setAttributes(soundImage, {
    src: "",
    alt: "TEST STRING"  // TODO set src & alt properties of the image
  });
  let rangeInput = document.createElement("input");
  setAttributes(rangeInput, {
    type: "range",
    name: "sound-volume",
    min: MIN.toString(),
    max: MAX.toString(),
    step: STEP.toString()
  });
  // TODO add event handler to the range
  rangeInput
  // assemble sound slider html
  soundContainer.append(audioElement, soundImage, rangeInput);
  return soundContainer;
}

// Given an array of Sound objects, create a list of HTML elements and insert them into the provided node.
export function initializeSounds(soundsObjects, outerSoundsContainer) {
  // create sound html elements and add them to the document
  for (const soundObject of soundsObjects) {
    outerSoundsContainer.append(createSoundsElement(soundObject));
  }
}