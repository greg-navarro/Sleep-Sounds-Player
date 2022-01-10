import React, { useState } from 'react';
import SoundSourceList from './SoundSourceList';

export default function Player({ data = [] }) {
  // let playing = false;
  // const playSound = () => {

  //   playing = !playing;
  // };

  const [playing, setPlaying] = useState(false);

  return (
    <>
      <h1>Sleep Sounds Player</h1>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause" onClick={() => console.log("oh no mr bill")}>
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