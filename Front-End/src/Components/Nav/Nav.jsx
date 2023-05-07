import logo from '../../Assets/Nav-Icons/logo.png';
import lol from '../../Assets/Nav-Icons/LoL.png';
import val from '../../Assets/Nav-Icons/valorant.png';
import csgo from '../../Assets/Nav-Icons/csgo.png';
import submit from '../../Assets/Nav-Icons/submit.png';
import leader from '../../Assets/Nav-Icons/leaderboard.png';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logout from '../../Assets/Nav-Icons/Logout.png';
import BottomLink from './BottomLink';
import GameLink from './Gamelink';

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

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let menuRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handler);
  });


  return (
    <>
      <div className="app">
      <button className="hamburger" onClick={toggleMenu}>
          {showMenu ? (
            null
          ) : (
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="90" height="10"></rect>
              <rect y="30" width="90" height="10"></rect>
              <rect y="60" width="90" height="10"></rect>
            </svg>
          )}
        </button>
        <div className={showMenu ? 'sidebar active' : 'sidebar'} ref={menuRef}>
        <ul>
          {loggedIn ? (
            <>
              <GameLink
                imgSrc={val}
                altText="Valorant"
                linkText="Valorant"
                to="/valorant"
              />
              <GameLink
                imgSrc={lol}
                altText="league"
                linkText="League"
                to="/league"
              />
              <GameLink
                imgSrc={csgo}
                altText="csgo"
                linkText="CSGO"
                to="/csgo"
              />
              <BottomLink
                imgSrc={submit}
                altText="movie-logo"
                linkText="Submit a Clip"
                to="/submit"
              />
              <BottomLink
                imgSrc={leader}
                altText="movie-logo"
                linkText="Leaderboard"
                to="/leaderboard"
              />
              <BottomLink
                imgSrc={Logout}
                altText="logout-logo"
                linkText="Logout"
                to="/"
                onClick={logout}
              />
            </>
          ) : (
            <div>
              <BottomLink
                imgSrc={Logout}
                altText="logout-logo"
                linkText="Login/Signup"
                to="/login"
              />
            </div>
          )}
          </ul>
          <hr />
          <ul>
            <li className="bottom-links other-links">
              <a href="/howto">How to play</a>
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
