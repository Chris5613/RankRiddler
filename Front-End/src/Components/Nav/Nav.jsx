/* eslint-disable no-unused-vars */
import logo from '../../Assets/Nav-Icons/logo.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <header>
        <div className="nav-container nav-bigger">
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/" className="nav-link">
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className="nav-link">
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/multiplayer" className="nav-link">
                  Multiplayer
                </NavLink>
              </li>

              <a href="/">
                <img src={logo} alt="logo" className="logo" />
              </a>
              <li>
                <NavLink to="/submit" className="nav-link">
                  Submit Clips
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="nav-link">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/howto" className="nav-link">
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="nav-container nav-smaller">
          <nav className="nav">
            <a href="/">
              <img src={logo} alt="logo" className="logo" />
            </a>
            <ul>
              <li>
                <NavLink to="/" className="nav-link">
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className="nav-link">
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/multiplayer" className="nav-link">
                  Multiplayer
                </NavLink>
              </li>
              <li>
                <NavLink to="/submit" className="nav-link">
                  Submit Clips
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="nav-link">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/howto" className="nav-link">
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Nav;
