import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import { useState, useEffect } from 'react';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';

const Valorant = () => {
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
    const response = await fetch('http://localhost:3001/form/valdata');
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

  if(rank === 'Iron') {
    pic = Iron;
  } else if(rank === 'Bronze') {
    pic = Bronze;
  } else if(rank === 'Silver') {
    pic = Silver;
  } else if(rank === 'Gold') {
    pic = Gold;
  } else if(rank === 'Platinum') {
    pic = Platinum;
  } else if(rank === 'Diamond') {
    pic = Diamond;
  } else if(rank === 'Ascendant') {
    pic = Ascendant;
  } else if(rank === 'Immortal') {
    pic = Immortal;
  } else if(rank === 'Radiant') {
    pic = Radiant;
  }

  let submittedRank = '';
  if(selectedRank === 'Iron') {
    submittedRank = Iron;
  } else if(selectedRank === 'Bronze') {
    submittedRank = Bronze;
  } else if(selectedRank === 'Silver') {
    submittedRank = Silver;
  } else if(selectedRank === 'Gold') {
    submittedRank = Gold;
  } else if(selectedRank === 'Platinum') {
    submittedRank = Platinum;
  } else if(selectedRank === 'Diamond') {
    submittedRank = Diamond;
  } else if(selectedRank === 'Ascendant') {
    submittedRank = Ascendant;
  } else if(selectedRank === 'Immortal') {
    submittedRank = Immortal;
  } else if(selectedRank === 'Radiant') {
    submittedRank = Radiant;
  }

  let result = '';
  let points = 0;

  if(rank === selectedRank) {
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
      },
      body: JSON.stringify({
        points: points,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const deductPoints = async () => {
    const response = await fetch('http://localhost:3001/deductpoints', {
      method: 'PUT',
      headers: {
        username: Cookies.get('userName'),
      },
      body: JSON.stringify({
        points: points,
      }),
    });
    const data = await response.json();
    console.log(data);
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
      },
    });
    const data = await response.json();
    setScore(data.points);
  };
  getUser();
}, []);

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
            className={`silver ${selectedRank === 'Silver' ? 'selected' : ''}`}
            width={100}
            src={Silver}
            alt="Silver"
            onClick={() => handleRankClick('Silver')}
            style={{
              boxShadow: selectedRank === 'Silver' ? '0 0 10px gold' : '',
            }}
          />
          <img
            width={60}
            src={Gold}
            alt="Gold"
            className={`gold ${selectedRank === 'Gold' ? 'selected' : ''}`}
            onClick={() => handleRankClick('Gold')}
            style={{ boxShadow: selectedRank === 'Gold' ? '0 0 10px gold' : '' }}
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
              selectedRank === 'Ascendant' ? 'selected' : ''
            }`}
            src={Ascendant}
            alt="Ascendant"
            onClick={() => handleRankClick('Ascendant')}
            style={{
              boxShadow: selectedRank === 'Ascendant' ? '0 0 10px gold' : '',
            }}
          />
          <img
            className={`immortal ${
              selectedRank === 'Immortal' ? 'selected' : ''
            }`}
            width={60}
            src={Immortal}
            alt="Immortal"
            onClick={() => handleRankClick('Immortal')}
            style={{
              boxShadow: selectedRank === 'Immortal' ? '0 0 10px gold' : '',
            }}
          />
          <img
            width={80}
            src={Radiant}
            alt="Radiant"
            className={`radiant ${selectedRank === 'Radiant' ? 'selected' : ''}`}
            onClick={() => handleRankClick('Radiant')}
            style={{
              boxShadow: selectedRank === 'Radiant' ? '0 0 10px gold' : '',
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
            {selectedRank ? `Selected Rank: ${selectedRank}` : 'Select a Rank'}
          </button>
        </div>      
        </>
      ) : (
        <p>Please Login to play</p>
      )}
    </>
  );
};

export default Valorant;
