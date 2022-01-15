import React, { useState, useRef, createContext } from 'react';
import SoundSourceList from './SoundSourceList';
import { v4 } from "uuid";

export const PlayerContext = createContext(); // FIXME adds context and exports

export default function Player({ present = [], otherSounds = [] }) {
  // FIXME test othersounds and presents
  otherSounds = otherSounds.length === 0 ? present : otherSounds;
  // console.group(present);

  // FIXME start context changes

  // FIXME end context changes

  const masterVolumeRef = useRef();
  const maxVolumeLevel = 100;
  const [playing, setPlaying] = useState(false);
  const [masterVolumeLevel, setMasterVolumeLevel] = useState(0.5);

  // In order to manipulate the individual volume sources with the master volume control
  // we need to associate a unique id with each sound source.
  const initialSoundSources = present.map(sound => ({ ...sound, id: v4() }));
  const [soundSources, setSoundSources] = useState(initialSoundSources);

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
      console.log(`${soundSrc.name}: (${rangeElement.value} / ${maxVolumeLevel}) * ${e.target.value / maxVolumeLevel} = ${newVolumeLevel}`);
      audioElement.volume = newVolumeLevel;
    }
  };

  const getMasterVolume = () => (masterVolumeLevel);

  const registerNewSound = (newSound) => {
    setSoundSources([...soundSources, newSound]);
  };

  return (
    <PlayerContext.Provider value={{}}>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => play()}>
          PLAY/PAUSE
        </button>
      </div>
      {/* sound ranges */}
      <SoundSourceList present={present} otherSounds={otherSounds} getMasterVolume={getMasterVolume} registerNewSound={registerNewSound} masterVolumeRef={masterVolumeRef} />
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
          ref={masterVolumeRef}
        >
        </input>
      </div>
    </PlayerContext.Provider>
  );
}