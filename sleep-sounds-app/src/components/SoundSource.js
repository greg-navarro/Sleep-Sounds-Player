import React, { useEffect, useRef, useContext } from "react";
import { PlayerContext } from "./Player";
import { FaTrash } from "react-icons/fa";

export default function SoundSource({
  name = "",
  src = "",
  img = "",
  min = 0,
  max = 100,
  step = 2,
  id = "" }) {
  const { playing, masterVolumeLevel, removeSound, customPlayer } = useContext(PlayerContext);

  // constants for volume range
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
    // set audio to new volume level
    audioSrc.current.volume = newVolumeLevel;
  };

  // Effect: if the player is playing then start set audio component to play
  useEffect(() => {
    if (playing) {
      audioSrc.current.play();
    } else {
      audioSrc.current.pause();
    }
  });

  return (
    <div className="sound-source">
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
      {customPlayer && <button onClick={() => removeSound(id)}><FaTrash /></button>}
    </div>
  );
}