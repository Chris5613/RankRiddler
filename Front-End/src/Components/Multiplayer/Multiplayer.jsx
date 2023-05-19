/* eslint-disable no-unused-vars */
import {useCallback, useEffect,useState } from 'react';
import Popup from './Popup';
import VideoPlayer from '../Youtube';
import { io } from 'socket.io-client';
import Choice from './Choice';
import {useSelector, useDispatch} from 'react-redux';
import {MultiplayerActions} from '../store/MultiplayerSlice';

const socket = io('http://localhost:3002');

const Multiplayer = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.multiplayer.loading);
  const matchFound = useSelector((state) => state.multiplayer.matchFound);
  const connected = useSelector((state) => state.multiplayer.connected);
  const countFinished = useSelector((state) => state.multiplayer.countFinished);
  const showPopup = useSelector((state) => state.multiplayer.showPopup);
  const rank = useSelector((state) => state.multiplayer.rank);
  const url = useSelector((state) => state.multiplayer.url);
  const user = useSelector((state) => state.multiplayer.user);
  const enemy = useSelector((state) => state.multiplayer.enemy);
  const userId = useSelector((state) => state.multiplayer.userId);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`http://localhost:3001/user/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(MultiplayerActions.setUser(data.username));
    };
    getOneUser(userId);
  }, [userId,dispatch]);

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/valdata'
    );
    const data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.form.length);

    dispatch(MultiplayerActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(MultiplayerActions.setRank(data.form[randomIndex].rank));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const handleClosePopup = useCallback(() => {
    dispatch(MultiplayerActions.setShowPopup(false));
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      dispatch(MultiplayerActions.setCountFinished(true));
      setCountdown(60);
    }
  }, [countdown, dispatch]);


  function findMatch() {
    socket.emit('findMatch', user);
    dispatch(MultiplayerActions.setLoading(true));
  }

  function leaveQueue() {
    socket.emit('leaveQueue', userId);
    dispatch(MultiplayerActions.setLoading(false));
  }

  useEffect(() => {
    socket.on('matchFound', (player1, player2) => {
      dispatch(MultiplayerActions.setShowPopup(true));
      dispatch(MultiplayerActions.setLoading(false));
      dispatch(MultiplayerActions.setMatchFound(true));
      dispatch(MultiplayerActions.setEnemy(player2));
    });

    socket.on('connected', () => {
      dispatch(MultiplayerActions.setConnected(true));
      dispatch(MultiplayerActions.setMatchFound(false));
    });
  }, [dispatch]);

  return (
    <>
      <div className="multiplayer-container">
        <br />
        <div>
          {loading ? (
            <>
              <div className="loader"></div>
              <img
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                alt="loading"
                width={100}
                className="loading"
              />
              <p className="searching-txt">Searching for a match...</p>
              <div className="btn-container">
                <button className="findMatch" onClick={leaveQueue}>
                  Leave Queue
                </button>
              </div>
            </>
          ) : (
            <>
              {matchFound ? (
                <>
                  <div className="loader"></div>
                  <img
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                    alt="loading"
                    width={100}
                    className="loading"
                  />
                  <p className="searching-txt">Match Found! Connecting...</p>
                </>
              ) : (
                <>
                  {connected ? (
                    <>
                      {showPopup && (
                        <Popup
                          user1={user}
                          user2={enemy}
                          onClose={handleClosePopup}
                        />
                      )}
                      <br />
                      {countFinished ? (
                        <>
                          <Choice rank={rank} user1={user} user2={enemy} />
                        </>
                      ) : (
                        <>
                          <div>
                            <VideoPlayer url={url} />
                          </div>
                          <h3 className="text countdown">
                            You have {countdown} seconds to watch the following
                            clip
                          </h3>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h1 id="multiplayer-title">1 on 1 Multiplayer</h1>
                      <div className="btn-container">
                        <button className="findMatch" onClick={findMatch}>
                          Find a Match
                        </button>
                        <button
                          className="findMatch"
                          style={{ marginLeft: '30px' }}
                        >
                          Check Stats
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Multiplayer;
