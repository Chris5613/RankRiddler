import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Valorant from './Components/Game-pages/Valorant';
import Home from './Components/Other-pages/Home';
import Tos from './Components/Other-pages/Tos';
import League from './Components/Game-pages/League';
import Csgo from './Components/Game-pages/Csgo';
import Submit from './Components/Other-pages/Submit';
import Leaderboard from './Components/Other-pages/Leaderboard';
import PrivacyPolicy from './Components/Other-pages/Privacy';
import Login from './Components/Users/Login';
import Signup from './Components/Users/Signup';
import Bug from './Components/Other-pages/Bug';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valorant" element={<Valorant />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/league" element={<League />} />
        <Route path="/csgo" element={<Csgo />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bug" element={<Bug />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
