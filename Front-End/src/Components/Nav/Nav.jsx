/* eslint-disable no-unused-vars */
import logo from '../../Assets/Nav-Icons/logo.png';
import lol from '../../Assets/Nav-Icons/LoL.png';
import val from '../../Assets/Nav-Icons/valorant.png';
import csgo from '../../Assets/Nav-Icons/csgo.png';
import submit from '../../Assets/Nav-Icons/submit.png';
import leader from '../../Assets/Nav-Icons/leaderboard.png';
import { useState, useEffect, useRef } from 'react';
import BottomLink from './BottomLink';
import GameLink from './Gamelink';
import { NavLink } from 'react-router-dom';
import setting from '../../Assets/Nav-Icons/settings.png';
import { navActions } from '../../store/NavSlice';
import { useSelector, useDispatch } from 'react-redux';
const Nav = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.nav.showMenu);


  const toggleMenu = () => {
    dispatch(navActions.toggleMenu());

  };
  let menuRef = useRef(null);
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        dispatch(navActions.hideMenu());

      }
    };
    document.addEventListener('mousedown', handler);
  });

  return (
    <>
      <div className="app">
        <button className="hamburger" onClick={toggleMenu}>
          {showMenu ? null : (
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="90" height="10"></rect>
              <rect y="30" width="90" height="10"></rect>
              <rect y="60" width="90" height="10"></rect>
            </svg>
          )}
        </button>
        <div className={showMenu ? 'sidebar active' : 'sidebar'} ref={menuRef}>
          <ul>
            <GameLink
              imgSrc={val}
              altText="Valorant"
              linkText="Valorant"
              to="/valorant"
              onClick={() => dispatch(navActions.hideMenu())}
            />
            <GameLink
              imgSrc={lol}
              altText="league"
              linkText="League"
              to="/league"
              onClick={() => dispatch(navActions.hideMenu())}
            />
            <GameLink
              imgSrc={csgo}
              altText="csgo"
              linkText="CSGO"
              to="/csgo"
              onClick={() => dispatch(navActions.hideMenu())}
            />
            <BottomLink
              imgSrc={submit}
              altText="movie-logo"
              linkText="Submit a Clip"
              to="/submit"
              onClick={() => dispatch(navActions.hideMenu())}
            />
            <BottomLink
              imgSrc={leader}
              altText="movie-logo"
              linkText="Leaderboard"
              to="/leaderboard"
              onClick={() => dispatch(navActions.hideMenu())}
            />
            <BottomLink
              imgSrc={setting}
              altText="movie-logo"
              linkText="Settings"
              to="/settings"
              onClick={() => dispatch(navActions.hideMenu())}
            />
          </ul>
          <hr />
          <ul>
            <li
              className="bottom-links other-links"
              onClick={() => dispatch(navActions.hideMenu())}
            >
              <NavLink to="/howto">How to play</NavLink>
            </li>
            <li
              className="bottom-links other-links"
              onClick={() => dispatch(navActions.hideMenu())}
            >
              <NavLink to="/tos">Terms of Services</NavLink>
            </li>
            <li
              className="bottom-links other-links"
              onClick={() => dispatch(navActions.hideMenu())}
            >
              <NavLink to="/privacy">Privacy Policy</NavLink>
            </li>
            <li
              className="bottom-links other-links"
              onClick={() => dispatch(navActions.hideMenu())}
            >
              <NavLink to="/bug">Report a Bug</NavLink>
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
