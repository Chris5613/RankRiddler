import { useEffect } from 'react';
import API from '../../../api';
import { NavLink } from 'react-router-dom';
import '../../../css/multi.css';
import logo from '../../../Assets/Nav-Icons/logo.png';
import SettingWheel from '../Side-Components/Settingwheel';
import {multiplayerActions} from '../../store/MultiplayerSlice'
import { useDispatch, useSelector } from 'react-redux';
import SpinningCoin from '../Side-Components/SpinningCoin';

const Main = () => {
  const userId = useSelector((state) => state.settings.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(multiplayerActions.setUsername(data.username))
    };
    getOneUser(userId);
  }, [userId,dispatch]);

  return (
    <div className="content-container">
      <div className='top-right-container'>
        <SpinningCoin/>   
        <button className="navlink-submit-btn">
          <NavLink to={`/submit`} className="navlink-submit-btn">
            🎬Submit
          </NavLink>
        </button>
        <SettingWheel />
      </div>
      <a href="/">
        <img src={logo} alt="logo" className="home-logo" />
      </a>
      <div className="multiplayer-container">
        <button className="game-btn">
          <NavLink to={`/selection`} className="navlink-btn">
            Singleplayer
          </NavLink>
        </button>
        <NavLink to={`/multiplayer/gameSelect`} className="navlink-btn">
          <button className="game-btn">
            Multiplayer
          </button>
        </NavLink>
        <button className="game-btn">
          <NavLink to={`/leaderboard`} className="navlink-btn">
            Leaderboard
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Main;