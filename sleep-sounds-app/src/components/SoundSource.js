import React, { useRef } from "react";

export default function SoundSource({
  name = "",
  src = "",
  img = "",
  min = 0,
  max = 100,
  step = 2,
  getMasterVolume = f => f,
  id = "",
  masterVolumeRef }) {
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
    currentMasterVolume = masterVolumeRef.current.value;
    const newVolumeLevel = (e.target.value / MAX) * (currentMasterVolume / MAX);
    console.log(`${name}(sound source): (${e.target.value} / ${MAX}) * ${currentMasterVolume / MAX} = ${newVolumeLevel}`);
    // set audio to new level
    audioSrc.current.volume = newVolumeLevel;
    console.log(`new volume level for ${name} is ${newVolumeLevel}`);
  };

  // TODO initialize volume to correct level
  // TODO if the player is playing then start playing
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