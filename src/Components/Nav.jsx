import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo  from "../Assets/logo.png";
import lol from "../Assets/LoL.png";
import val from "../Assets/valorant.png";
import csgo from "../Assets/csgo.png";
import submit from "../Assets/submit.png";
import gamepad from "../Assets/gamepad.png";
import leader from "../Assets/leaderboard.png";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="app">
        <button className="hamburger" onClick={toggleMenu}>
          {showMenu ? (
            "X"
          ) : (
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="90" height="10"></rect>
              <rect y="30" width="90" height="10"></rect>
              <rect y="60" width="90" height="10"></rect>
            </svg>
          )}
        </button>
        <div className={showMenu ? "sidebar active" : "sidebar"}>
          <ul>
            <li className="home-link">
              <img
                src={gamepad}
                alt="gamepad"
                width={50} 
              />
              <a className="link" href="/">
                Games
              </a>
            </li>
            <li className="game-link">
              <img
                className="images"
                src={val}
                alt="Valorant"
              />
              <NavLink className="links" to="/valorant">
                Valorant
              </NavLink>
            </li>
            <li className="game-link">
              <img
                className="images"
                src={lol}
                alt="league"
              />
              <NavLink className="links" to="/league">
                League
              </NavLink>
            </li>
            <li className="game-link">
              <img
                className="images"
                src={csgo}
                alt="csgo"
              />
              <NavLink className="links" to="/csgo">
                CSGO
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="bottom-links">
              <img
                src={submit}
                alt="movie-logo"
                width={50}
              />
              <NavLink className="links nav-text" to="/submit">
                Submit
              </NavLink>
            </li>
            <li className="bottom-links">
              <img
                src={leader}
                alt="movie-logo"
                width={50}
              />
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
          <img
            src={logo}
            alt="logo"
          />
        </a>
      </div>
    </>
  );
};

export default Nav;
