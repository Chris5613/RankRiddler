import { useState } from "react"
import Popup from "./Popup"

const Multiplayer = () => {
  const [loading, setLoading] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  
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
                  </>
                ) : (
                  <>
                    <h1 id="multiplayer-title">1 on 1 Multiplayer</h1>
                    <div className="btn-container">
                      <button id='findMatch' onClick={findMatch}>Find a Match</button>
                      <button id='findMatch' style={{marginLeft: "30px"}}>Check Stats</button>
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
