import React, { useState, useRef, createContext } from 'react';
import { useParams } from 'react-router-dom';
import SoundSourceList from './SoundSourceList';

export const PlayerContext = createContext(); // FIXME adds context and exports

export default function Player({ presentOptions = {}, soundObjects = [] }) {
  // FIXME custom or present
  // Step 1: is the present present? (if not, player is custom)
  const { id } = useParams(); // TODO see what happens if no id is given, this will determine how to create custom player
  console.log("Provided id: " + id);
  console.log(presentOptions);
  console.log(soundObjects);
  const presentFromParam = Object.values(presentOptions).find(present => present.id === id);
  const soundSourcesFromPresent = presentFromParam.sounds.map(soundID => soundObjects.find(sound => sound.id === soundID));
  const [soundSources, setSoundSources] = useState(soundSourcesFromPresent);
  console.log(soundSources);

  const masterVolumeRef = useRef();
  const maxVolumeLevel = 100;
  const [playing, setPlaying] = useState(false);
  const [masterVolumeLevel, setMasterVolumeLevel] = useState(0.5);

  const play = () => {
    const audioElements = document.querySelectorAll(".audio-element");
    for (const audioElement of audioElements) {
      if (playing) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
    if (soundSources.length > 0)
      setPlaying(!playing);
    console.log(playing);
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
      // console.log(`${soundSrc.name}: (${rangeElement.value} / ${maxVolumeLevel}) * ${e.target.value / maxVolumeLevel} = ${newVolumeLevel}`);
      audioElement.volume = newVolumeLevel;
    }
  };

  const registerNewSound = (newSound) => {
    setSoundSources([...soundSources, newSound]);
  };

  return (
    <PlayerContext.Provider value={{ playing, masterVolumeLevel, registerNewSound }}>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => play()}>
          PLAY/PAUSE
        </button>
      </div>
      {/* sound ranges */}
      <SoundSourceList presentSounds={soundSources} />
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