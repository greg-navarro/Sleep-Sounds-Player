import { Routes, Route } from 'react-router';
// import './App.css';
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import Player from './components/Player';
import soundData from './data/sounds-data.json';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={soundData} />} />
        {/* <Route path="/oldeplayer" element={<Player present={[...soundData]} />} /> */}
        <Route path="/custom-player" element={<Player otherSounds={soundData.sounds} />} />
      </Routes>

    </div>
  );
}

export default App;
