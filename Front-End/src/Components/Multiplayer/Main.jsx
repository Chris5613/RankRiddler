import {useEffect,useState} from 'react';
import { useSocket } from '../SocketContext';
import { useSelector } from 'react-redux';
import API from '../../api';
import { NavLink } from 'react-router-dom';
import '../../css/multi.css'

const Main = () => {
  const [username, setUsername] = useState('')
  const userId = useSelector((state) => state.settings.userId);
  const socket = useSocket();

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsername(data.username)
    };
    getOneUser(userId);
  }, [userId]);

  const handlePlayClick = () => {
    const playerName = username
    socket.emit('playGame', { name: playerName });
};

  return (
    <div className='multiplayer-container'>    
      <button onClick={handlePlayClick}>
        <NavLink to={`/multiplayer/loading`} className='game-btn' >
          Search for a game
        </NavLink>
      </button>
    </div>
  );
};

export default Main;
