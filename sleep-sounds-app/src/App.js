import { Routes, Route } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Player from './components/Player';
import soundData from './data/sounds-data.json';

function App() {
  // In this component we are loading mock data
  const presentOptions = soundData.presents; // an object mapping present names to descriptive objects
  const soundObjects = soundData.sounds; // an array of sounds objects

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home presentOptions={presentOptions} />} />
          <Route path="/player/:id" element={<Player presentOptions={presentOptions} soundObjects={soundObjects} />} />
          <Route path="/custom-player" element={<Player presentOptions={presentOptions} soundObjects={soundObjects} customPlayer={true} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
