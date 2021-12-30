import Sound from "./sounds.js";
import * as helper from "./functions.js";

// list of contrived sound objects, as if from a server
const soundData = [
  new Sound("fire", "https://www.soundjay.com/nature/sounds/campfire-1.mp3", ""),
  new Sound("highway", "https://www.soundjay.com/transportation/sounds/highway-1.mp3", ""),
  new Sound("wave", "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3", "")
];

const maxVolumeLevel = 100;
const masterVolume = document.getElementById("master-volume");
let currentMasterVolume = masterVolume.value;



// get parent container
const outerSoundsContainer = document.querySelector("#sounds-container");

// populate outer container with sound objects
// identify master volume & it's current value ()


helper.initializeSounds(soundData, outerSoundsContainer);

// Functions