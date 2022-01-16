import React, { useState, useContext } from "react";
import SoundSource from "./SoundSource";
import { PlayerContext } from "./Player";

export default function SoundSourceList({
  presentSounds = [],
  otherSounds = [],
  customPlayer = false
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
  const [availableSounds, setAvailableSounds] = useState(otherSounds);
  const [soundsInUse, setSoundsInUse] = useState([]);

  // Function to add sound sources to the list.
  // Calls the 'register' function to register the element with Parent.
  const { registerNewSound } = useContext(PlayerContext); // retrieve from context
  const addSoundSource = (sourceIndex) => {
    const sourceToAdd = otherSounds[sourceIndex];
    const newSource = initializeSoundSource(sourceToAdd);
    setSoundSourceElement([...soundSourceElements, newSource]);
    setSoundsInUse([...soundsInUse, sourceToAdd.id]);
    setAvailableSounds(availableSounds.slice(sourceIndex));
    // console.log(soundSourceElements);
    registerNewSound(sourceToAdd);
  };

  // pare down otherSounds to remove those sounds already in use

  // const soundSourceElementIDs = soundSourceElements.map(soundSourceElement => soundSourceElement.id);
  // const unusedSounds = otherSounds.filter(sound => soundSourceElementIDs.includes(sound.id));
  // console.log(soundSourceElements);
  // console.log(otherSounds);
  // console.log("werks");
  return (
    <>
      <div id="sounds-container">
        {soundSourceElements}
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