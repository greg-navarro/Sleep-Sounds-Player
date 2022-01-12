import React, { useRef } from "react";

export default function SoundSource({ name = "", src = "", img = "", getMasterVolume = f => f }) {
  // constants
  const MIN = 0;
  const MAX = 100;
  const STEP = 2;

  // current volme level
  let volumeLevel = MAX / 2;

  // declare refs
  const audioSrc = useRef();
  const volumeControl = useRef();

  // event handler for volume changes
  const adjustVolume = (e) => {
    // TODO adjust volume of track based ONLY on the current range value
    // get new volume level
    const newVolumeLevel = e.target.value / MAX;
    // console.log(e);
    // set audio to new level
    audioSrc.current.volume = newVolumeLevel;
    console.log(`new volume level for ${name} is ${newVolumeLevel}`);
  };

  return (
    <div>
      <audio ref={audioSrc} src={src} className="audio-element" />
      <img src={img} alt={name}></img>
      <input
        ref={volumeControl}
        type="range"
        name="soundSourceVolume"
        id=""
        min={MIN.toString()}
        max={MAX.toString()}
        step={STEP.toString()}
        onChange={(e) => adjustVolume(e)}
      ></input>
    </div>
  );
}