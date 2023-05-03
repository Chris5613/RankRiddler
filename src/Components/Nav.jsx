import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
                className="images"
                src="https://o.remove.bg/downloads/1b371a08-1ca0-4dd4-9a18-b2fff736cdae/26-269473_game-controller-logo-transparent-hd-png-download-removebg-preview.png"
                alt="gamepad"
              />
              <a className="link" href="/">
                Games
              </a>
            </li>
            <li className="game-link">
              <img
                className="images"
                src="https://o.remove.bg/downloads/7dc0e98c-0e3f-44f2-9799-2157abe9b7f2/-41603132788rzosdsitdt-removebg-preview.png"
                alt="Valorant"
              />
              <NavLink className="links" to="/valorant">
                Valorant
              </NavLink>
            </li>
            <li className="game-link">
              <img
                className="images"
                src="https://o.remove.bg/downloads/206772c1-ba26-43c9-a4ca-5900d8134839/png-transparent-league-of-legends-computer-icons-ongamenet-starleague-video-game-electronic-sports-voice-actor-video-game-desktop-wallpaper-online-game-removebg-preview.png"
                alt="league"
              />
              <NavLink className="links" to="/league">
                League
              </NavLink>
            </li>
            <li className="game-link">
              <img
                className="images"
                src="https://o.remove.bg/downloads/3b29d849-d5fc-4084-9c39-70388df5db60/3271363-middle-removebg-preview.png"
                alt="CSGO"
              />
              <NavLink className="links" to="/csgo">
                CSGO
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="bottom-links">
              <img
                className="images"
                src="https://o.remove.bg/downloads/c6e88537-dc8a-45d5-9868-4b7909db911a/stock-vector-film-roll-old-movie-strip-icon-cinema-logo-white-icon-with-shadow-on-transparent-background-1247058151-removebg-preview.png"
                alt="movie-logo"
              />
              <NavLink className="links" to="/submit">
                Submit
              </NavLink>
            </li>
            <li className="bottom-links">
              <img
                className="images"
                src="https://o.remove.bg/downloads/87e74fef-94db-495b-bcca-e60cc88493b4/vector-podium-icon-symbol-sign-removebg-preview.png"
                alt="movie-logo"
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
            src="https://o.remove.bg/downloads/00ec1dbf-5109-46a0-a333-2d8928ca5c8e/0a31c7157168ce6493d1a39eae970bc3-removebg-preview.png"
            alt="logo"
          />
        </a>
      </div>
    </>
  );
};

export default Nav;
