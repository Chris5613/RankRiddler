import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Valorant from './Components/Game-pages/Valorant';
import Home from './Components/Top-Pages/Home';
import League from './Components/Game-pages/League';
import Csgo from './Components/Game-pages/Csgo';
import Submit from './Components/Form/Submit';
import Leaderboard from './Components/Top-Pages/Leaderboard';
import Bug from './Components/Bottom-Pages/Bug';
import Howto from './Components/Bottom-Pages/Howto';
import Settings from './Components/Bottom-Pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valorant" element={<Valorant />} />
        <Route path="/league" element={<League />} />
        <Route path="/csgo" element={<Csgo />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/bug" element={<Bug />} />
        <Route path="/howto" element={<Howto />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
