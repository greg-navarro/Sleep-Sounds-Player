import React, { useState, useRef, createContext } from 'react';
import { useParams } from 'react-router-dom';
import SoundSourceList from './SoundSourceList';
import './Player.css';

export const PlayerContext = createContext();

export default function Player({ presentOptions = {}, soundObjects = [], customPlayer = false }) {
  let initialSoundSources = []
  // Check if the present is specified in the parameters
  // If not, this will be treated as a 'custom player' and functionality to add and remove sounds will be made available.
  const { id } = useParams();
  if (id) {
    const presentFromParam = Object.values(presentOptions)
      .find(present => present.id === parseInt(id));
    const soundSourcesFromPresent = presentFromParam.sounds
      .map(soundID => soundObjects.find(sound => sound.id === soundID));
    initialSoundSources.push(...soundSourcesFromPresent)
  }

  // Initialize state:
  //  1. sound sources in use
  //  2. play/pause
  //  3. master volume level - defaults at 50%
  const [soundSources, setSoundSources] = useState(initialSoundSources);
  const [playing, setPlaying] = useState(false);
  const masterVolumeRef = useRef();
  const maxVolumeLevel = 100;
  const [masterVolumeLevel, setMasterVolumeLevel] = useState(0.5);

  // Handles play/pause button click events.
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
  };

  // Handles adjustments in master volume level.
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
      audioElement.volume = newVolumeLevel;
    }
  };

  // Adds sounds not currently in use to the array of sounds currently IN use.
  const registerNewSound = (newSound) => {
    setSoundSources([...soundSources, newSound]);
  };

  // Removes a sound from the array of those currently in use.
  const removeSound = (soundID) => {
    const remainingSounds = soundSources.filter(sound => sound.id !== soundID);
    setSoundSources(remainingSounds);
  }

  const removeAllSounds = () => {
    setSoundSources([]);
  }

  return (
    <PlayerContext.Provider value={{ playing, masterVolumeLevel, registerNewSound, removeSound, removeAllSounds, soundSources, soundObjects, customPlayer }}>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => play()}>
          PLAY/PAUSE
        </button>
      </div>
      {/* sound ranges */}
      <SoundSourceList customPlayer={customPlayer} />
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