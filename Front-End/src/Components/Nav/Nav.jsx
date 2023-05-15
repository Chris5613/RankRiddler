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
      <header>
        <div className="header-container">
          <div className="nav-container">
            <nav className='nav'>
              <ul>
                <li>
                  <NavLink to='/' className='nav-link'>
                  <svg className="main-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.35715 6.11902C4.88251 6.11902 6.11906 4.88248 6.11906 3.35712C6.11906 1.83176 4.88251 0.595215 3.35715 0.595215C1.83179 0.595215 0.595245 1.83176 0.595245 3.35712C0.595245 4.88248 1.83179 6.11902 3.35715 6.11902Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.6429 6.11902C13.1682 6.11902 14.4048 4.88248 14.4048 3.35712C14.4048 1.83176 13.1682 0.595215 11.6429 0.595215C10.1175 0.595215 8.88095 1.83176 8.88095 3.35712C8.88095 4.88248 10.1175 6.11902 11.6429 6.11902Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.35715 14.4047C4.88251 14.4047 6.11906 13.1681 6.11906 11.6428C6.11906 10.1174 4.88251 8.88086 3.35715 8.88086C1.83179 8.88086 0.595245 10.1174 0.595245 11.6428C0.595245 13.1681 1.83179 14.4047 3.35715 14.4047Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.6429 14.4047C13.1682 14.4047 14.4048 13.1681 14.4048 11.6428C14.4048 10.1174 13.1682 8.88086 11.6429 8.88086C10.1175 8.88086 8.88095 10.1174 8.88095 11.6428C8.88095 13.1681 10.1175 14.4047 11.6429 14.4047Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    Choose a game
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard" className='nav-link'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 3h18v2H3zM3 9h18v2H3zM3 15h18v2H3zM3 21h18v2H3z"/>
                    <path d="M12 3v18m-9-9h18"/>
                  </svg>
                    Leaderboard
                  </NavLink>
                </li>
              </ul>
            </nav>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
            <div className='actions'>
              <ul>
                <li>
                  <NavLink to="/submit" className='nav-link'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 3H3v18h18V3zm-4 12h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                  Submit Clips
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className='nav-link'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.5 1.5 0 0 1-1.4 1H18"/>
                    <path d="M4.6 15a1.5 1.5 0 0 0 1.4 1H6"/>
                    <path d="M19.4 9a1.5 1.5 0 0 0-1.4-1H18"/>
                    <path d="M4.6 9a1.5 1.5 0 0 1-1.4-1H2"/>
                    <path d="M15 22.4a1.5 1.5 0 0 1 0-2.8V18"/>
                    <path d="M9 22.4a1.5 1.5 0 0 0 0-2.8V18"/>
                    <path d="M20 4.6a1.5 1.5 0 0 1-2.8 0H15"/>
                    <path d="M20 9.4a1.5 1.5 0 0 0-2.8 0H15"/>
                  </svg>
                    Settings
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
