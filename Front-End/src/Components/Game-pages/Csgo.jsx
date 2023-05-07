import { useState, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import silver from '../../Assets/Csgo-Icons/Silver.png';
import se from '../../Assets/Csgo-Icons/SE.png';
import nova from '../../Assets/Csgo-Icons/Nova.png';
import mg from '../../Assets/Csgo-Icons/MG.png';
import dmg from '../../Assets/Csgo-Icons/DMG.png';
import le from '../../Assets/Csgo-Icons/LE.png';
import mge from '../../Assets/Csgo-Icons/MGE.png';
import smfc from '../../Assets/Csgo-Icons/SMFC.png';
import ge from '../../Assets/Csgo-Icons/GE.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';

const Csgo = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [url, setUrl] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get('token');
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank] = useState('');
  const [score, setScore] = useState(0);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    setIsButtonDisabled(selectedRank === null);
  }, [selectedRank]);

  const handleRankClick = (rank) => {
    setSelectedRank(rank);
  };

  const getYoutubeUrl = async () => {
    const response = await fetch('http://localhost:3001/form/csgodata');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    setUrl(data.form[randomIndex].youtubeLink);
    setRank(data.form[randomIndex].rank);
  };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  const youtubeUrl = url;
  let pic = '';

  if (rank === 'Silver') {
    pic = silver;
  } else if (rank === 'SE') {
    pic = se;
  } else if (rank === 'Nova') {
    pic = nova;
  } else if (rank === 'MG') {
    pic = mg;
  } else if (rank === 'DMG') {
    pic = dmg;
  } else if (rank === 'LE') {
    pic = le;
  } else if (rank === 'MGE') {
    pic = mge;
  } else if (rank === 'SMFC') {
    pic = smfc;
  } else if (rank === 'GE') {
    pic = ge;
  }


  let submittedRank = '';
  if (selectedRank === 'Silver') {
    submittedRank = silver;
  } else if (selectedRank === 'Silver Elite') {
    submittedRank = se;
  } else if (selectedRank === 'Gold Nova') {
    submittedRank = nova;
  } else if (selectedRank === 'Master Guardian') {
    submittedRank = mg;
  } else if (selectedRank === 'Distinguished Master Guardian') {
    submittedRank = dmg;
  } else if (selectedRank === 'Legendary Eagle') {
    submittedRank = le;
  } else if (selectedRank === 'Master Guardian Elite') {
    submittedRank = mge;
  } else if (selectedRank === 'Supreme') {
    submittedRank = smfc;
  } else if (selectedRank === 'Global Elite') {
    submittedRank = ge;
  }


  let result = '';
  let points = 0;

  if (rank === selectedRank) {
    result = check;
    points = 1;
  } else {
    result = wrong;
    points = -1;
  }

    const addPoints = async () => {
      const response = await fetch('http://localhost:3001/addpoints', {
        method: 'PUT',
        headers: {
          username: Cookies.get('userName'),
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          points: points,
        }),
      });
      const data = await response.json();
      setScore(data.points);
    };

    const deductPoints = async () => {
      const response = await fetch('http://localhost:3001/deductpoints', {
        method: 'PUT',
        headers: {
          username: Cookies.get('userName'),
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          points: points,
        }),
      });
      const data = await response.json();
      setScore(data.points);
    };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  const checkAnswer = () => {
    if(rank === selectedRank){
      addPoints();
    }
    else {
      if(score > 0){
        deductPoints();
      }   
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:3001/user', {
        headers: {
          username: Cookies.get('userName'),
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setScore(data.points);
    };
    getUser();
  }, [token]);

  return (
    <>
      {loggedIn ? (
        <>
          <div>
            <VideoPlayer url={youtubeUrl} />
          </div>
          {showModal ? (
            <div className="modal">
              <div className="modal-content">
              <span className="X" onClick={handleModal}>X</span>
                <br />
                <div className="modal-example">
                  <div>
                    <div className="modal-example-heading">Correct Rank</div>
                    <img
                      className="modal-example-image"
                      src={pic}
                      alt="Radiant"
                      width={100}
                    />
                    {/* <p className="modal-example-rad">{rank}</p> */}
                  </div>
                  <div>
                    <div className="modal-example-heading">Your Guess</div>
                    <img
                      className="modal-example-image"
                      src={submittedRank}
                      alt="rank"
                      width={100}
                    />
                    {/* <p>{selectedRank}</p> */}
                  </div>
                  <div>
                    <div className="modal-example-heading result-title">
                      Result
                    </div>
                    <img
                      className="modal-example-image wrong"
                      src={result}
                      alt="wrong"
                      width={70}
                    />
                    <p className="modal-example-wrong">{points} Point</p>
                  </div>
                </div>
                <br />
                <br />
                <p className="text">You currently have {score} points</p>
                <br />
                <button
                  onClick={() => {
                    refresh();
                  }}
                  className="submit-btn"
                >
                  Next Video
                </button>
              </div>
            </div>
          ) : null}
          <div className="ranks">
            <img
              className="rank"
              onClick={() => handleRankClick('Silver')}
              style={{
                boxShadow:
                  selectedRank === 'Silver'
                    ? '0 0 10px 5px rgba(255, 215, 0, 0.5)'
                    : 'none',
              }}
              src={silver}
              alt="Silver"
            />
            <img
              className={`rank ${
                selectedRank === 'Silver Elite' ? 'selected' : ''
              }`}
              src={se}
              alt="Silver Elite"
              onClick={() => handleRankClick('Silver Elite')}
              style={{
                boxShadow:
                  selectedRank === 'Silver Elite' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank ${
                selectedRank === 'Gold Nova' ? 'selected' : ''
              }`}
              width={100}
              src={nova}
              alt="Gold Nova"
              onClick={() => handleRankClick('Gold Nova')}
              style={{
                boxShadow: selectedRank === 'Gold Nova' ? '0 0 10px gold' : '',
              }}
            />
            <img
              width={100}
              src={mg}
              alt="Master Guardian"
              className={`rank ${
                selectedRank === 'Master Guardian' ? 'selected' : ''
              }`}
              onClick={() => handleRankClick('Master Guardian')}
              style={{
                boxShadow:
                  selectedRank === 'Master Guardian' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank ${
                selectedRank === 'Master Guardian Elite' ? 'selected' : ''
              }`}
              src={mge}
              alt="Master Guardian Elite"
              onClick={() => handleRankClick('Master Guardian Elite')}
              style={{
                boxShadow:
                  selectedRank === 'Master Guardian Elite'
                    ? '0 0 10px gold'
                    : '',
              }}
            />
            <img
              className={`rank ${
                selectedRank === 'Distinguished Master Guardian'
                  ? 'selected'
                  : ''
              }`}
              src={dmg}
              alt="Distinguished Master Guardian"
              onClick={() => handleRankClick('Distinguished Master Guardian')}
              style={{
                boxShadow:
                  selectedRank === 'Distinguished Master Guardian'
                    ? '0 0 10px gold'
                    : '',
              }}
            />
            <img
              className={`rank ${
                selectedRank === 'Legendary Eagle' ? 'selected' : ''
              }`}
              src={le}
              alt="Legendary Eagle"
              onClick={() => handleRankClick('Legendary Eagle')}
              style={{
                boxShadow:
                  selectedRank === 'Legendary Eagle' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank  ${
                selectedRank === 'Supreme' ? 'selected' : ''
              }`}
              width={100}
              src={smfc}
              alt="Supreme"
              onClick={() => handleRankClick('Supreme')}
              style={{
                boxShadow: selectedRank === 'Supreme' ? '0 0 10px gold' : '',
              }}
            />
            <img
              width={100}
              src={ge}
              alt="Global Elite"
              className={`rank ${
                selectedRank === 'Global Elite' ? 'selected' : ''
              }`}
              onClick={() => handleRankClick('Global Elite')}
              style={{
                boxShadow:
                  selectedRank === 'Global Elite' ? '0 0 10px gold' : '',
              }}
            />
          </div>
          <div>
            <button
              className="submit"
              onClick={() => {
                handleModal();
                checkAnswer();
              }}
              disabled={isButtonDisabled}
            >
              {selectedRank
                ? `Selected Rank: ${selectedRank}`
                : 'Select a Rank'}
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1>Please Login to play</h1>
        </div>
      )}
    </>
  );
};

export default Csgo;
