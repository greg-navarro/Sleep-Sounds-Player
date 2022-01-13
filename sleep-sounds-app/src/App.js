import { Routes, Route } from 'react-router';
// import './App.css';
import { Navbar } from './components/Navbar';
import Player from './components/Player';
import soundData from './data/sounds-data.json';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Player data={[...soundData]} />} />
        <Route path="/oldeplayer" element={<Player data={[...soundData]} />} />
      </Routes>

    </div>
  );
}

export default App;
