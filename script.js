import Sound from "./sounds.js";

// list of contrived sound objects, as if from a server
const soundData = [
  new Sound("fire", "https://www.soundjay.com/nature/sounds/campfire-1.mp3", ""),
  new Sound("highway", "https://www.soundjay.com/transportation/sounds/highway-1.mp3", ""),
  new Sound("wave", "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3", "")
];

// Important values
const maxVolumeLevel = 100;
let AUDIORANGES = [];

// identify master volume & it's current value
const masterVolume = document.querySelector("#master-volume");
let currentMasterVolume = masterVolume.value;

// get parent container for individual volume ranges
const outerSoundsContainer = document.querySelector("#sounds-container");

// populate outer container with audio elements/inputs
initializeSounds(soundData, outerSoundsContainer, masterVolume);

// collect all audio elements, attach event handler to master volume range
if (masterVolume.addEventListener) {
  masterVolume.addEventListener("change", function () {
    currentMasterVolume = masterVolume.value;
    // go through each audio reference and adjust it's audio
    for (let [currentRange, currentAudio] of AUDIORANGES) {
      currentAudio.volume = (currentRange.value / maxVolumeLevel) * (masterVolume.value / maxVolumeLevel);
    }
  })
}

/* Functions */
// Set multiple html attributes at once w/ object literal syntax.
// element is the HTML whose attributes we are setting,
// attributes is an object storing mappings of attributes & values. 
function setAttributes(element, attributes) {
  for (let [attribute, value] of Object.entries(attributes)) {
    element.setAttributes(attribute, value);
  }
}

// Creates an individual sound/range slider element from a given Sound object.
// Registers an event handlers for individual and master volume controls 
// (that are Input objects of the range type). Therefore a reference to that 'master volume'
// Input object is required.
function createSoundsElement(soundObject, masterVolumeControl) {
  // constants
  const MIN = 0;
  const MAX = 100;
  const STEP = 2;

  // generate html audio element with provided source
  let audioElement = document.createElement("audio");
  let audioSourceElement = document.createElement("source");
  setAttributes(audioSourceElement, {
    src: soundObject.soundSrc, // "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3", 
    type: "audio/mpeg"
  });
  audioElement.loop = true; // play audio file on repeat
  audioElement.append(audioSourceElement); // add source to html audio element

  // generate the HTML for a range slider controlling audio sources volume
  let soundContainer = document.createElement("div"); // TODO .classList.add("sounds-container")
  let soundImage = document.createElement("img");
  setAttributes(soundImage, {
    src: soundObject.imgSrc,
    alt: soundObject.name
  });
  let rangeInput = document.createElement("input");
  setAttributes(rangeInput, {
    type: "range",
    name: "sound-volume",
    min: MIN.toString(),
    max: MAX.toString(),
    step: STEP.toString()
  });
  // add event handler to individual range input for volume control
  let currentMasterVolumeLevel = masterVolumeControl.value;
  rangeInput.addEventListener("change", function () {
    // get the new volume, between 0 and 1.0 inclusive
    const newVolumeLevel = (this.value / MAX) * (currentMasterVolumeLevel / MAX);
    // set the value of the current audio source volume to the new value
    audioElement.volume = newVolumeLevel;
  }, false);
  // assemble sound slider html
  soundContainer.append(audioElement, soundImage, rangeInput);
  // add to global array with mappings of audio nodes and their respective ranges
  let thisMapping = [rangeInput, audioElement];
  AUDIORANGES.push(thisMapping);
  return soundContainer;
}

// Given an array of Sound objects, create a list of HTML elements and 
// insert them into the provided node.
function initializeSounds(soundsObjects, outerSoundsContainer, masterVolumeControl) {
  // create sound html elements and add them to the document
  for (const soundObject of soundsObjects) {
    outerSoundsContainer.append(createSoundsElement(soundObject, masterVolumeControl));
  }
}