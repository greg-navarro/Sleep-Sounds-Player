import React, { useRef } from "react";

export default function SoundSource({ name = "", src = "", img = "" }) {
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
  const adjustVolume = () => {
    // get new volume level
    // set audio to new level  
  };

  return (
    <div>
      <audio ref={audioSrc} src={src} />
      <img src={img} alt={name}></img>
      <input
        ref={volumeControl}
        type="range"
        name="soundSourceVolume"
        id=""
        min={MIN.toString()}
        max={MAX.toString()}
        step={STEP.toString()}
      ></input>
    </div>
  );
}