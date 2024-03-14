import './css/Navbar.css';
import './css/Submitpage.css';
import './css/Gamepage.css';
import './css/Homepage.css';
import './css/Howtoplay.css';
import './css/Profile.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Valorant from './Components/Game-pages/Valorant';
import Home from './Components/Other-Pages/Home';
import League from './Components/Game-pages/League';
import Csgo from './Components/Game-pages/Csgo';
import Submit from './Components/Other-Pages/Submit';
import Leaderboard from './Components/Other-Pages/Leaderboard';
import Howto from './Components/Other-Pages/Howto';
import Settings from './Components/Other-Pages/Settings';
import Error from './Components/Error';
import Apex from './Components/Game-pages/Apex';
import Rainbow from './Components/Game-pages/Rainbow';
import Overwatch from './Components/Game-pages/Overwatch';
import Fortnite from './Components/Game-pages/Fortnite';
import Rocket from './Components/Game-pages/Rocket';
import Profile from './Components/Other-Pages/Profile';
import Main from './Components/Multiplayer/Main';
import Overlay from './Components/Other-Pages/Overlay';
import Gamepage from './Components/Multiplayer/Gamepage';
import { SocketProvider } from './Components/SocketContext';

function App() {
  return (
  <SocketProvider>
    <BrowserRouter>
      <Overlay />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valorant" element={<Valorant />} />
        <Route path="/league" element={<League />} />
        <Route path="/csgo" element={<Csgo />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/howto" element={<Howto />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Error />} />
        <Route path="/apex" element={<Apex />} />
        <Route path="/rainbow" element={<Rainbow />} />
        <Route path="/overwatch" element={<Overwatch />} />
        <Route path="/fortnite" element={<Fortnite />} />
        <Route path="/rocket" element={<Rocket />} />
        <Route path="/profile/:uuid" element={<Profile />} />
        <Route path="/multiplayer" element={<Main />} />
        <Route path="/multiplayer/game" element={<Gamepage/>} />
      </Routes>
    </BrowserRouter>
  </SocketProvider>
  );
}

export default App;
