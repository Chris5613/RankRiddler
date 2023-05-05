import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Valorant from './Components/Valorant';
import Home from './Components/Home';
import Tos from './Components/Tos';
import League from './Components/League';
import Csgo from './Components/Csgo';
import Submit from './Components/Submit';
import Leaderboard from './Components/Leaderboard';
import PrivacyPolicy from './Components/Privacy';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Bug from './Components/Bug';

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
