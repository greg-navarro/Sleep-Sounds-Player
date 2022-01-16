import React, { useState, useContext } from "react";
import SoundSource from "./SoundSource";
import { PlayerContext } from "./Player";

export default function SoundSourceList({
  presentSounds = [],
  otherSounds = [],
}) {
  // function to initialize sound source components
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


  const presentSoundSourceElements = presentSounds.map(sound => initializeSoundSource(sound));
  const [soundSourceElements, setSoundSourceElement] = useState(presentSoundSourceElements);

  // Function to add sound sources to the list.
  // Calls the 'register' function to register the element with Parent.
  const { registerNewSound } = useContext(PlayerContext); // retrieve from context
  const addSoundSource = (sourceIndex) => {
    const sourceToAdd = otherSounds[sourceIndex];
    const newSource = initializeSoundSource(sourceToAdd);
    setSoundSourceElement([...soundSourceElements, newSource]);
    console.log(soundSourceElements);
    registerNewSound(sourceToAdd);
  };


  console.log("werks");
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