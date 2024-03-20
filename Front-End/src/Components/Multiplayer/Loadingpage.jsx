import { useSocket } from '../SocketContext';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import API from '../../api';
import { NavLink } from 'react-router-dom';
import Gamepage from './Gamepage';
import '../../css/multi.css';
import { useNavigate } from 'react-router-dom';

const Loadingpage = () => {
  const [opponent, setOpponent] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const userId = useSelector((state) => state.settings.userId);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsername(data.username);
    };
    getOneUser(userId);
  }, [userId]);

  useEffect(() => {
    socket.on('matchFound', (data) => {
      setOpponent(data.opponent);
      setLoading(false);
    });
    return () => {
      socket.off('matchFound');
    };
  }, [socket]);

  const handleLeaveQueueClick = () => {
    socket.emit('disconnectPlayer');
    navigate('/');
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      socket.emit('disconnectPlayer');
      navigate('/');

    };
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft,navigate,socket]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container loading">
          <Loader />
          <p>{formatTime(timeLeft)}</p>
          <button onClick={handleLeaveQueueClick} className="leave-queue-btn">
            <NavLink to="/" className="navlink">
              Leave Queue
            </NavLink>
          </button>
        </div>
      ) : (
        <div>
          <Gamepage username={username} opponent={opponent} />
        </div>
      )}
    </div>
  );
};

export default Loadingpage;
