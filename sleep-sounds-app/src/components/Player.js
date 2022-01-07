import React from 'react';
import SoundSourceList from './SoundSourceList';

export default function Player(data = []) {
  return (
    <>
      <h1>Sleep Sounds Player</h1>
      {/* play button */}
      <div id="play-container">
        <button name="play-pause" type="button" id="play-pause">
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