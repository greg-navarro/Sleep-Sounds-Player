import React, { useEffect, useRef, useContext } from "react";
import { PlayerContext } from "./Player";

export default function SoundSource({
  name = "",
  src = "",
  img = "",
  min = 0,
  max = 100,
  step = 2,
  id = "" }) {
  // FIXME retrieve Player state from the parent Player component
  const { playing, masterVolumeLevel } = useContext(PlayerContext);

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

  // event handler for volume changes
  const adjustVolume = (e) => {
    // calculate new volume level
    const newVolumeLevel = (e.target.value / MAX) * (masterVolumeLevel);
    // FIXME debug line
    // console.log(`${name}(sound source): (${e.target.value} / ${MAX}) * ${masterVolumeLevel} = ${newVolumeLevel}`);
    // set audio to new volume level
    audioSrc.current.volume = newVolumeLevel;
    // console.log(`new volume level for ${name} is ${newVolumeLevel}`);
  };

  // TODO if the player is playing then start playing
  useEffect(() => {
    if (playing) {
      // console.log(`${name}: The player is set to play`);
      audioSrc.current.play();
    } else {
      // console.log(`${name}: The player is set to pause`)
      audioSrc.current.pause();
    }
  });

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