import React, { useState } from "react";
import SoundSource from "./SoundSource";

export default function SoundSourceList({
  present = [],
  otherSounds = [],
  getMasterVolume = f => f,
  registerNewSound = f => f
}) {
  const [soundSourceElements, setSoundSourceElement] = useState([]);
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

  // const [selectedOption, setSelectedOption] = useState(options[0].value);
  const addSoundSource = (sourceIndex) => {
    const sourceToAdd = otherSounds[sourceIndex];
    const newSource = initializeSoundSource(sourceToAdd);
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