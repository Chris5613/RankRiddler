import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/Nav-Icons/logo.png';
import lol from '../Assets/Nav-Icons/LoL.png';
import val from '../Assets/Nav-Icons/valorant.png';
import csgo from '../Assets/Nav-Icons/csgo.png';
import submit from '../Assets/Nav-Icons/submit.png';
import leader from '../Assets/Nav-Icons/leaderboard.png';

const Nav = () => {
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
            'X'
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
          </ul>
          <ul>
            <li className="bottom-links">
              <img src={submit} alt="movie-logo" width={50} />
              <NavLink className="links nav-text" to="/submit">
                Submit
              </NavLink>
            </li>
            <li className="bottom-links">
              <img src={leader} alt="movie-logo" width={50} />
              <NavLink className="links" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
          </ul>
          <hr />
          <ul>
            <li className="bottom-links">
              <a href="/tos">Terms Of Services</a>
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
