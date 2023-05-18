/* eslint-disable no-unused-vars */
import { useState,useCallback,useEffect } from "react"
import Popup from "./Popup"
import VideoPlayer from '../Youtube';
import RoundResults from "./RoundResults";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

const Multiplayer = () => {
  const [loading, setLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [connected, setConnected] = useState(false);
  const [countFinished, setCountFinished] = useState(false)
  const [showPopup, setShowPopup] = useState(true);
  const [rank, setRank] = useState('')
  const [url, setUrl] = useState('')
  const [countdown2, setCountdown] = useState(30);
  const [user, setUser] = useState('');
  const [enemy, setEnemy] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(
        `http://localhost:3001/user/${uuid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setUser(data.username);
    };
    getOneUser(userId);
  }, [userId]);


  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/valdata'
    );
    const data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.form.length);

    setRank(data.form[randomIndex].rank)
    setUrl(data.form[randomIndex].youtubeLink)
  }, []);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    };
  }, []);

  useEffect(() => {
    if (countdown2 === 0) {
      setCountdown(0)
      setCountFinished(true)
    }
  }, [countdown2, handleClosePopup]);

  function findMatch() {
    socket.emit('findMatch',user);
    setLoading(true);
  }

  function leaveQueue() {
    socket.emit('leaveQueue',userId);
    setLoading(false);
  }

  useEffect(() => {
    socket.on('matchFound', (player1, player2) => {
      setLoading(false);
      setMatchFound(true);

      setEnemy(player2)
      console.log(player1, player2)
    });

    socket.on('connected', () => {
      setConnected(true);
      setMatchFound(false);
    });
  }, []);




  return (
<>
    <div className='multiplayer-container'>
      <br />
      <div>
        {loading ? (
          <>
            <div className="loader"></div>
            <img
              src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'
              alt='loading'
              width={100}
              className='loading'
            />
            <p className="searching-txt">Searching for a match...</p>
            <div className="btn-container">
              <button className='findMatch' onClick={leaveQueue}>Leave Queue</button>
            </div>
          </>
        ) : (
          <>
            {matchFound ? (
              <>
                <div className="loader"></div>
                <img
                  src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'
                  alt='loading'
                  width={100}
                  className='loading'
                />
                <p className="searching-txt">Match Found! Connecting...</p>
              </>
            ) : (
              <>
                {connected ? (
                  <>
                    {showPopup && (
                      <Popup user1={user} user2={enemy} onClose={handleClosePopup} />
                    )}
                    <br />
                    {countFinished ? (
                      <>
                        <RoundResults  user1={user} user2={enemy}/>
                      </>
                    ) : (
                      <>
                        <div>
                          <VideoPlayer url={url} />
                        </div>
                        <h3 className="text countdown">
                          You have {countdown2} seconds to watch the following clip
                        </h3>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h1 id="multiplayer-title">1 on 1 Multiplayer</h1>
                    <div className="btn-container">
                      <button className='findMatch' onClick={findMatch}>Find a Match</button>
                      <button className='findMatch' style={{marginLeft: "30px"}} >Check Stats</button>
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
    ) 
  }

export default Multiplayer
