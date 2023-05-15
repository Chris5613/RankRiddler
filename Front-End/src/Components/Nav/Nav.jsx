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
import { navActions } from '../store/NavSlice';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {

  return (
    <>
      <header className='header-section'>
        <div>
          <div>
            <div>
              <button>
                <span></span>
                  <svg>

                  </svg>
              </button>
            </div>
            <nav>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </nav>
        {/* <div className="logo">
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div> */}
            <div>
              <ul>
                <li></li>
                <li></li>
              </ul>
              <div>
                {/* button */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
