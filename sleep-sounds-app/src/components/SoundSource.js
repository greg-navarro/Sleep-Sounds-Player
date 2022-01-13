import React, { useRef } from "react";

export default function SoundSource({
  name = "",
  src = "",
  img = "",
  min = 0,
  max = 100,
  step = 2,
  getMasterVolume = f => f,
  id = "" }) {
  // constants
  const MIN = min;
  const MAX = max;
  const STEP = step;
  // set id's for audio element and range
  const audioID = "audio" + id.toString();
  const rangeID = "range" + id.toString();
  // declare refs
  const audioSrc = useRef();
  const volumeControl = useRef();

  // current volme level
  let currentMasterVolume = getMasterVolume();

  // event handler for volume changes
  const adjustVolume = (e) => {
    // check for changes in master volume level
    currentMasterVolume = getMasterVolume();
    const newVolumeLevel = (e.target.value / MAX) * currentMasterVolume;
    // set audio to new level
    audioSrc.current.volume = newVolumeLevel;
    console.log(`new volume level for ${name} is ${newVolumeLevel}`);
  };

  return (
    <div>
      <audio ref={audioSrc} src={src} className="audio-element" id={audioID} loop />
      <img src={img} alt={name}></img>
      <input
        ref={volumeControl}
        type="range"
        name="soundSourceVolume"
        id={rangeID}
        min={MIN.toString()}
        max={MAX.toString()}
        step={STEP.toString()}
        onChange={(e) => adjustVolume(e)}
      ></input>
    </div>
  );
}