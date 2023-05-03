import React from "react";
import { useState } from "react";

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
          <li class="gamepad-link">
            <img
                className="images"
                src="https://o.remove.bg/downloads/2c32db8a-9cdb-47c2-b9a7-32014f40b567/-416031338016ay54imofx-removebg-preview.png"
                alt="gamepad"
            />
            <a className="links" href="/">
                Valorant
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
