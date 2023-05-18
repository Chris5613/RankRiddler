import { useState,useCallback,useEffect } from "react"
import Popup from "./Popup"
import VideoPlayer from '../Youtube';

const Multiplayer = () => {
  const [loading, setLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [rank, setRank] = useState('')
  const [url, setUrl] = useState('')
  const [player, setPlayer] = useState('')
  
  const findMatch = () => {
    setLoading(true);
  };
  
  if (loading) {
    setTimeout(() => {
      setMatchFound(true);
      setLoading(false);
    }, 3000);
  } else if (matchFound) {
    setTimeout(() => {
      setConnected(true);
      setMatchFound(false);
      handleOpenPopup();
    }, 3000);
  }

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/valdata'
    );
    const data = await response.json();

    let randomIndex = Math.floor(Math.random() * data.form.length);

    setRank(data.form[randomIndex].rank)
    setUrl(data.form[randomIndex].youtubeLink)
    setPlayer(data.form[randomIndex].playerInfo)
  }, []);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);
  
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
                      <Popup user1="John" user2="Jane" onClose={handleClosePopup} />
                    )}
                    <br/>
                    <div>
                      <VideoPlayer url={url} />
                    </div>
                  </>
                ) : (
                  <>
                    <h1 id="multiplayer-title">1 on 1 Multiplayer</h1>
                    <div className="btn-container">
                      <button id='findMatch' onClick={findMatch}>Find a Match</button>
                      <button id='findMatch' style={{marginLeft: "30px"}} >Check Stats</button>
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
