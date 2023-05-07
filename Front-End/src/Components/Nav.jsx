import { NavLink } from 'react-router-dom';
import logo from '../Assets/Nav-Icons/logo.png';
import lol from '../Assets/Nav-Icons/LoL.png';
import val from '../Assets/Nav-Icons/valorant.png';
import csgo from '../Assets/Nav-Icons/csgo.png';
import submit from '../Assets/Nav-Icons/submit.png';
import leader from '../Assets/Nav-Icons/leaderboard.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from '../Assets/Nav-Icons/Logout.png';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  const logout = async () => {
    const url = 'http://localhost:3001/signout';
    const response = await fetch(url, {
      method: 'PUT',
    });
    if (response.ok) {
      setLoggedIn(false);
      Cookies.remove('token');
      navigate('/login');
    }
  };

  return (
    <>
      <div className="app">
        <div className="sidebar active">
          <ul>
            {loggedIn ? (
              <>
                <li className="game-link">
                  <img className="images" src={val} alt="Valorant" />
                  <NavLink className="links" to="/valorant">
                    Valorant
                  </NavLink>
                </li>
                <li className="game-link">
                  <img className="images" src={lol} alt="league" />
                  <NavLink className="links" to="/league">
                    League
                  </NavLink>
                </li>
                <li className="game-link">
                  <img className="images" src={csgo} alt="csgo" />
                  <NavLink className="links" to="/csgo">
                    CSGO
                  </NavLink>
                </li>
                <li className="bottom-links">
                  <img src={submit} alt="movie-logo" width={50} />
                  <NavLink className="links nav-text" to="/submit">
                    Submit a Clip
                  </NavLink>
                </li>
                <li className="bottom-links">
                  <img src={leader} alt="movie-logo" width={50} />
                  <NavLink className="links" to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
                <li className="bottom-links">
                  <img src={Logout} alt="logout-logo" width={50} />
                  <NavLink to="/" onClick={logout}>
                    Logout
                  </NavLink>
                </li>              
              </>
            ) : (
              <>
                <div>
                  <li className="bottom-links">
                    <img src={Logout} alt="logout-logo" width={50} />
                    <NavLink to="/login">Login/Signup</NavLink>
                  </li>
                </div>
              </>
            )}
          </ul>
          <hr />
          <ul>
            <li className="bottom-links other-links">
              <a href="/howto">How to play</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/settings">Settings</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/tos">Terms of Services</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li className="bottom-links other-links">
              <a href="/bug">Report a Bug</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
    </>
  );
};

export default Nav;
