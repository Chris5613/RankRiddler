import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
    setShowMenu(!showMenu);
};
return (
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
        <li class="home-link">
            <img
                className="images"
                src="https://o.remove.bg/downloads/55e7cd5b-8e1a-465c-a6ba-1b4b75da9224/png-clipart-joystick-computer-icons-game-controllers-gamepad-joystick-electronics-emulator-removebg-preview.png"
                alt="gamepad"
            />
            <NavLink className="links" to="/">
              Home
            </NavLink>
        </li>
        <li class="game-link">
          <img
            className="images"
            src="https://o.remove.bg/downloads/2c32db8a-9cdb-47c2-b9a7-32014f40b567/-416031338016ay54imofx-removebg-preview.png"
            alt="gamepad"
          />
          <NavLink className="links" to="/valorant">
            Valorant
          </NavLink>
        </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
