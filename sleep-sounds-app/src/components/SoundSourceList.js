import React from "react";
import SoundSource from "./SoundSource";

export default function SoundSourceList({ soundList = [] }) {

  return (
    <div id="sounds-container">
      {soundList.map(sound => (
        <SoundSource key={sound.name} name={sound.name} src={sound.src} img={sound.imgSrc} />
      ))}
    </div>
  );
}