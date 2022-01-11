import React, { useState } from 'react';
import SoundSourceList from './SoundSourceList';

export default function Player({ data = [] }) {

  const [playing, setPlaying] = useState(false);

  const play = () => {
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


  return (
    <>
      <h1>Sleep Sounds Player</h1>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => play()}>
          PLAY/PAUSE
        </button>
      </div>
      {/* sound ranges */}
      <SoundSourceList soundList={data} />
      {/* master volume */}
      <div id="master-volume-container">
        <label for="master-volume">Master volume</label>
        <input type="range" name="master-volume" id="master-volume" min="0" max="100" step="2">
        </input>
      </div>
    </>
  );
}