import { Routes, Route } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Player from './components/Player';
import soundData from './data/sounds-data.json';

function App() {
  // In this component we are loading mock data
  const presentOptions = soundData.presents;
  const soundObjects = soundData.sounds;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={soundData} presentOptions={presentOptions} />} />
        <Route path="/player/:id" element={<Player soundObjects={soundObjects} />} />
        <Route path="/custom-player" element={<Player otherSounds={soundData.sounds} soundObjects={soundObjects} />} />
      </Routes>

    </div>
  );
}

export default App;
