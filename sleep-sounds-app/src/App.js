import logo from './logo.svg';
import './App.css';
import Player from './components/Player';
import soundData from './data/sounds-data.json';

function App() {
  return (
    <div className="App">
      <Player data={soundData} />
    </div>
  );
}

export default App;
