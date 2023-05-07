import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import { useState, useEffect } from 'react';
import VideoPlayer from '../Youtube';

const Valorant = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [url, setUrl] = useState('');

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
    const response = await fetch('http://localhost:3001/form/valdata');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    setUrl(data.form[randomIndex].youtubeLink);
  };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  const youtubeUrl = url;

  return (
    <>
      <div>
        <VideoPlayer url={youtubeUrl} />
      </div>
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
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          {selectedRank ? `Selected Rank: ${selectedRank}` : 'Select a Rank'}
        </button>
      </div>
    </>
  );
};

export default Valorant;
