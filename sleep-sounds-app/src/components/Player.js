import React, { useState } from 'react';
import SoundSourceList from './SoundSourceList';
import { v4 } from "uuid";

export default function Player({ present = [], otherSoundss = [] }) {
  // FIXME test present
  const otherSounds = present;
  console.group(present);

  const maxVolumeLevel = 100;
  const [playing, setPlaying] = useState(false);
  const [masterVolumeLevel, setMasterVolumeLevel] = useState(0.5);

  // In order to manipulate the individual volume sources with the master volume control
  // we need to associate a unique id with each sound source.
  const soundSources = present.map(sound => ({ ...sound, id: v4() }));

  let justLoaded = true;
  const play = () => {
    // if page has just loaded then reduce initial volume to 50% to match default range value
    if (justLoaded) {
      justLoaded = false;
      for (const soundSrc of soundSources) {
        const audioID = "#audio" + soundSrc.id.toString();
        const rangeID = "#range" + soundSrc.id.toString();
        const audioElement = document.querySelector(audioID);
        const rangeElement = document.querySelector(rangeID);

        const newVolumeLevel = (rangeElement.value / maxVolumeLevel) * masterVolumeLevel;
        audioElement.volume = newVolumeLevel;
      }
    }

    const audioElements = document.querySelectorAll(".audio-element");
    for (const audioElement of audioElements) {
      if (playing) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
    setPlaying(!playing);
  };

  const adjustMasterVolume = (e) => {
    // update state
    setMasterVolumeLevel(e.target.value / maxVolumeLevel);
    // iterate thorugh sound sources, each has a range and audio source associated with it
    for (const soundSrc of soundSources) {
      const audioID = "#audio" + soundSrc.id.toString();
      const rangeID = "#range" + soundSrc.id.toString();
      const audioElement = document.querySelector(audioID);
      const rangeElement = document.querySelector(rangeID);

      const newVolumeLevel = (rangeElement.value / maxVolumeLevel) * (e.target.value / maxVolumeLevel);
      console.log(`(${rangeElement.value} / ${maxVolumeLevel}) * ${e.target.value / maxVolumeLevel} = ${newVolumeLevel}`);
      audioElement.volume = newVolumeLevel;
    }
  };

  const getMasterVolume = () => (masterVolumeLevel);

  return (
    <>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => play()}>
          PLAY/PAUSE
        </button>
      </div>
      {/* sound ranges */}
      <SoundSourceList soundList={soundSources} getMasterVolume={getMasterVolume} />
      {/* master volume */}
      <div id="master-volume-container">
        <label htmlFor="master-volume">Master volume</label>
        <input
          type="range"
          name="master-volume"
          id="master-volume"
          min="0"
          max="100"
          step="2"
          onChange={(e) => { adjustMasterVolume(e); }}
        >
        </input>
      </div>
      {/* Add additional sounds */}
      <div>
        <label htmlFor="otherSounds">Add sound</label>
        <select
          name="otherSounds"
          value="Sounds"
          onChange={e => console.log("optioned selected")}>
          <option value="Select a sound">Select a sound</option>
          {otherSounds.map((sound, i) =>
          (
            <option key={i} value={sound.name}>{sound.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}