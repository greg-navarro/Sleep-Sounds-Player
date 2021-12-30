// helper functions
function setAttributes(element, attributes) {
  for (let [attribute, value] of Object.entries(attributes)) {
    element.setAttributes(attribute, value);
  }
}

function createSoundsElement(soundObject) {
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

  // assemble sound slider html
  soundContainer.append(audioElement, soundImage, rangeInput);
  return soundContainer;
}

function initializeSounds(soundsObjects) {
  // get parent container
  const outerSoundsContainer = document.querySelector("#sounds-container");
  // create sound html elements and add them to the document
  for (const soundObject of soundsObjects) {
    outerSoundsContainer.append(createSoundsElement(soundObject));
  }
}