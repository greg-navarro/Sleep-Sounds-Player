import React, { useState } from "react";
import SoundSource from "./SoundSource";

export default function SoundSourceList({
  present = [],
  otherSounds = [],
  getMasterVolume = f => f,
  registerNewSound = f => f
}) {
  const [soundSourceElements, setSoundSourceElement] = useState(present);
  console.log(soundSourceElements); // FIXME tester
  // function to create Sound Source elements
  const initializeSoundSource = (sound) => {
    return (
      <SoundSource
        key={sound.name}
        name={sound.name}
        src={sound.src}
        img={sound.imgSrc}
        id={sound.id}
        getMasterVolume={getMasterVolume}
      />);
  };

  // Function to add sound sources to the list.
  // Calls the 'register' function to register the element with Parent.
  const addSoundSource = (sourceIndex) => {
    const sourceToAdd = otherSounds[sourceIndex];
    const newSource = initializeSoundSource(sourceToAdd);
    // TODO
    setSoundSourceElement([...soundSourceElements, newSource]);
    console.log(soundSourceElements);
    registerNewSound(sourceToAdd)
  };



  return (
    <>
      <div id="sounds-container">
        {soundSourceElements}
      </div>
      {/* Add additional sounds */}
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
          {otherSounds.map((sound, i) =>
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
    </>
  );
}