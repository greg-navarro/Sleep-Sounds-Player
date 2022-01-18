import React, { useContext } from "react";
import SoundSource from "./SoundSource";
import { PlayerContext } from "./Player";

export default function SoundSourceList({
  customPlayer = false
}) {
  // Retrieve functions and state from the PlayerContext.
  const { registerNewSound, soundSources, soundObjects } = useContext(PlayerContext); // retrieve from context

  // Initialize SoundSource components.
  const initializeSoundSource = (sound) => {
    return (
      <SoundSource
        key={sound.name}
        name={sound.name}
        src={sound.src}
        img={sound.imgSrc}
        id={sound.id}
      />);
  };

  // Use current 'soundSources' data objects to initialize an array SoundSource React components.
  const presentSoundSourceElements = soundSources.map(sound => initializeSoundSource(sound));
  // Array of sound data objects in soundObjects but not in soundSources.
  // This will serve as the data for populating the Select element with Options.
  const soundSourceIDs = soundSources.map(sound => sound.id);
  const availableSounds = soundObjects.filter(sound => !soundSourceIDs.includes(sound.id));


  // Add sound sources to the list.
  // Calls the 'register' function to register the element with Parent.
  const addSoundSource = (sourceIndex) => {
    const sourceToAdd = availableSounds[sourceIndex];
    registerNewSound(sourceToAdd);
  };

  return (
    <>
      <div id="sounds-container">
        {presentSoundSourceElements}
      </div>
      {
        /* Add additional sounds */
        customPlayer &&
        <div>
          <label htmlFor="otherSounds">Add sound</label>
          <select
            name="otherSounds"
            value="Sounds"
            onChange={(e) => {
              e.preventDefault();
              addSoundSource(e.target.value);
            }}
          >
            <option value="Select a sound">Select a sound</option>
            {availableSounds.map((sound, i) =>
            (
              <option
                key={i}
                value={i}
              >
                {sound.name}
              </option>
            ))}
          </select>
        </div>
      }
    </>
  );
}