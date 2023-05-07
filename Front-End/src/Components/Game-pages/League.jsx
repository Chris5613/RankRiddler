import Iron from '../../Assets/League-Icons/Iron.png';
import Bronze from '../../Assets/League-Icons/bronze.png';
import Silver from '../../Assets/League-Icons/silver.png';
import Gold from '../../Assets/League-Icons/Gold.png';
import Platinum from '../../Assets/League-Icons/Plat.png';
import Diamond from '../../Assets/League-Icons/Diamond.png';
import Master from '../../Assets/League-Icons/Master.png';
import Grandmaster from '../../Assets/League-Icons/GrandMaster.png';
import Challenger from '../../Assets/League-Icons/Challenger.png';
import { useState, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';

const League = () => {
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
    const response = await fetch('http://localhost:3001/form/leaguedata');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    setUrl(data.form[randomIndex].youtubeLink);
    setRank(data.form[randomIndex].rank);
  };

  const youtubeUrl = url;
  let pic = '';

  if (rank === 'Iron') {
    pic = Iron;
  } else if (rank === 'Bronze') {
    pic = Bronze;
  } else if (rank === 'Silver') {
    pic = Silver;
  } else if (rank === 'Gold') {
    pic = Gold;
  } else if (rank === 'Platinum') {
    pic = Platinum;
  } else if (rank === 'Diamond') {
    pic = Diamond;
  } else if (rank === 'Master') {
    pic = Master;
  } else if (rank === 'Grandmaster') {
    pic = Grandmaster;
  } else if (rank === 'Challenger') {
    pic = Challenger;
  }

  let submittedRank = '';
  if (selectedRank === 'Iron') {
    submittedRank = Iron;
  } else if (selectedRank === 'Bronze') {
    submittedRank = Bronze;
  } else if (selectedRank === 'Silver') {
    submittedRank = Silver;
  } else if (selectedRank === 'Gold') {
    submittedRank = Gold;
  } else if (selectedRank === 'Platinum') {
    submittedRank = Platinum;
  } else if (selectedRank === 'Diamond') {
    submittedRank = Diamond;
  } else if (selectedRank === 'Master') {
    submittedRank = Master;
  } else if (selectedRank === 'Grandmaster') {
    submittedRank = Grandmaster;
  } else if (selectedRank === 'Challenger') {
    submittedRank = Challenger;
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
                  </div>
                  <div>
                    <div className="modal-example-heading">Your Guess</div>
                    <img
                      className="modal-example-image"
                      src={submittedRank}
                      alt="Iron"
                      width={100}
                    />
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
              className="rank iron"
              onClick={() => handleRankClick('Iron')}
              style={{
                boxShadow:
                  selectedRank === 'Iron'
                    ? '0 0 10px 5px rgba(255, 215, 0, 0.5)'
                    : 'none',
              }}
              src={Iron}
              alt="Iron"
            />
            <img
              className={`rank bronze ${
                selectedRank === 'Bronze' ? 'selected' : ''
              }`}
              src={Bronze}
              alt="Bronze"
              onClick={() => handleRankClick('Bronze')}
              style={{
                boxShadow: selectedRank === 'Bronze' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`silver ${
                selectedRank === 'Silver' ? 'selected' : ''
              }`}
              width={100}
              src={Silver}
              alt="Silver"
              onClick={() => handleRankClick('Silver')}
              style={{
                boxShadow: selectedRank === 'Silver' ? '0 0 10px gold' : '',
              }}
            />
            <img
              width={100}
              src={Gold}
              alt="Gold"
              className={`gold ${selectedRank === 'Gold' ? 'selected' : ''}`}
              onClick={() => handleRankClick('Gold')}
              style={{
                boxShadow: selectedRank === 'Gold' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank plat ${
                selectedRank === 'Platinum' ? 'selected' : ''
              }`}
              src={Platinum}
              alt="Platinum"
              onClick={() => handleRankClick('Platinum')}
              style={{
                boxShadow: selectedRank === 'Platinum' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank diamond ${
                selectedRank === 'Diamond' ? 'selected' : ''
              }`}
              src={Diamond}
              alt="Diamond"
              onClick={() => handleRankClick('Diamond')}
              style={{
                boxShadow: selectedRank === 'Diamond' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`rank asc ${
                selectedRank === 'Master' ? 'selected' : ''
              }`}
              src={Master}
              alt="Master"
              onClick={() => handleRankClick('Master')}
              style={{
                boxShadow: selectedRank === 'Master' ? '0 0 10px gold' : '',
              }}
            />
            <img
              className={`Grandmaster asc ${
                selectedRank === 'Grandmaster' ? 'selected' : ''
              }`}
              width={100}
              src={Grandmaster}
              alt="Grandmaster"
              onClick={() => handleRankClick('Grandmaster')}
              style={{
                boxShadow:
                  selectedRank === 'Grandmaster' ? '0 0 10px gold' : '',
              }}
            />
            <img
              width={100}
              src={Challenger}
              alt="Challenger"
              className={`radiant ${
                selectedRank === 'Challenger' ? 'selected' : ''
              }`}
              onClick={() => handleRankClick('Challenger')}
              style={{
                boxShadow: selectedRank === 'Challenger' ? '0 0 10px gold' : '',
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
        <p>Please Login to play</p>
      )}
    </>
  );
};

export default League;
