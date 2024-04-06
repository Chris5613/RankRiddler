import React from 'react';
import val from '../../Assets/Match-History-Icons/tiny_val_logo.png';
import lol from '../../Assets/Match-History-Icons/lol.png';
import ow from '../../Assets/Match-History-Icons/ow.png';
import cs2 from '../../Assets/Match-History-Icons/cs2.png';
import { useSocket } from '../../Components/SocketContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MultiplayerGameSelect = () => {
  const username = useSelector((state) => state.multiplayer.username);
  const socket = useSocket();
  const navigate = useNavigate();
  const goback = () => {
    navigate('/');
  };

  const handleGameSelect = (game) => {
    socket.emit('playGame', { playerName: username, game: game });
    navigate('/multiplayer/loading')
  };

  return (
    <>
      <button
        style={{
          padding: '10px',
          backgroundColor: '#2d3436',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        onClick={goback}
      >
        Go back
      </button>
      <div className='multi_game_select_container'>
        <img src={val} alt="Valorant" onClick={() => handleGameSelect('valorant')} style={{cursor: 'pointer'}} />
        <img src={lol} alt="League of Legends" onClick={() => handleGameSelect('league')} style={{cursor: 'pointer'}} />
        <img src={ow} alt="Overwatch" onClick={() => handleGameSelect('overwatch')} style={{cursor: 'pointer'}} className='ow-logo' />
        <img src={cs2} alt="CS2" onClick={() => handleGameSelect('cs2')} style={{cursor: 'pointer'}} />
      </div>
    </>
  );
}

export default MultiplayerGameSelect;
