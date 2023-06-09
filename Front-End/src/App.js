import './css/Navbar.css';
import './css/Submitpage.css';
import './css/Gamepage.css';
import './css/Homepage.css';
import './css/Howtoplay.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Valorant from './Components/Game-pages/Valorant';
import Home from './Components/Other-Pages/Home';
import League from './Components/Game-pages/League';
import Csgo from './Components/Game-pages/Csgo';
import Submit from './Components/Other-Pages/Submit';
import Leaderboard from './Components/Other-Pages/Leaderboard';
import Bug from './Components/Other-Pages/Bug';
import Howto from './Components/Other-Pages/Howto';
import Settings from './Components/Other-Pages/Settings';
import Error from './Components/Error';
import Multiplayer from './Components/Other-Pages/Multiplayer';

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
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
