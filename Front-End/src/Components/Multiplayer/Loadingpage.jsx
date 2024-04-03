import { useSocket } from '../SocketContext';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import API from '../../api';
import { NavLink } from 'react-router-dom';
import Gamepage from './Gamepage';
import '../../css/multi.css';
import { useDispatch, useSelector } from 'react-redux';
import { multiplayerActions } from '../store/MultiplayerSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Loadingpage = () => {
  const dispatch = useDispatch();
  const opponent = useSelector((state) => state.multiplayer.opponent);
  const loading = useSelector((state) => state.multiplayer.loading);
  const username = useSelector((state) => state.multiplayer.username);
  const userId = useSelector((state) => state.settings.userId);
  const [timeLeft, setTimeLeft] = useState(59);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(multiplayerActions.setUsername(data.username));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  useEffect(() => {
    socket.on('matchFound', (data) => {
      dispatch(multiplayerActions.setOpponent(data.opponent));
      dispatch(multiplayerActions.setLoading(false));
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Match Found',
      });
    });
    return () => {
      socket.off('matchFound');
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (timeLeft <= 0) {
      socket.emit('disconnectPlayer');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: "Can't find a match.. Returning to menu",
      });
      navigate('/');
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, navigate, socket]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLeaveQueueClick = () => {
    socket.emit('disconnectPlayer');
    dispatch(multiplayerActions.setLoading(true));
    dispatch(multiplayerActions.setOpponent(''));
    navigate('/');
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
