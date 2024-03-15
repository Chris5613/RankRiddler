import {useEffect,useState} from 'react';
import { useSocket } from '../SocketContext';
import { useSelector } from 'react-redux';
import API from '../../api';
import { NavLink } from 'react-router-dom';


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

  const roomId = Math.floor(Math.random() * 5000);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <div>      
        <h1>Welcome to the Game</h1>
        <button onClick={handlePlayClick}>
          <NavLink to={`/multiplayer/${roomId}`} >
            Search for a Game
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Main;
