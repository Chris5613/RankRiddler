import { useSocket } from '../SocketContext';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import API from '../../api';
import { NavLink } from 'react-router-dom';
import Gamepage from './Gamepage';
import '../../css/multi.css';
import { useDispatch, useSelector } from 'react-redux';
import {multiplayerActions} from '../store/MultiplayerSlice'

const Loadingpage = () => {
  const dispatch = useDispatch();
  const opponent = useSelector((state) => state.multiplayer.opponent);
  const loading = useSelector((state) => state.multiplayer.loading);
  const username = useSelector((state) => state.multiplayer.username);
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
      dispatch(multiplayerActions.setUsername(data.username))
    };
    getOneUser(userId);
  }, [userId,dispatch]);

  useEffect(() => {
    socket.on('matchFound', (data) => {
      dispatch(multiplayerActions.setOpponent(data.opponent))
      dispatch(multiplayerActions.setLoading(false))
    });
    return () => {
      socket.off('matchFound');
    };
  }, [socket,dispatch]);

  const handleLeaveQueueClick = () => {
    socket.emit('disconnectPlayer');
    dispatch(multiplayerActions.setLoading(false))
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container loading">
          <Loader />
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
