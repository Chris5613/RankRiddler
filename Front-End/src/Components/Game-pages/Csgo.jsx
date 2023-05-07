import { useState, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import leader from '../../Assets/Nav-Icons/leaderboard.png';
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
    console.log(selectedRank);
  };

  const handleButtonClick = () => {
    console.log('clicked');
  };

  const getYoutubeUrl = async () => {
    const response = await fetch('http://localhost:3001/form/leaguedata');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    console.log(data);
    setUrl(data.form[randomIndex].youtubeLink);
  };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  console.log(url);
  const youtubeUrl = url;

  return (
    <>
      {loggedIn ? (
        <>
          <div>
            <VideoPlayer url={youtubeUrl} />
          </div>
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
              onClick={handleButtonClick}
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
