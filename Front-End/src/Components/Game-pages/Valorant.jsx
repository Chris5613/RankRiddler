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
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import leader from '../../Assets/Nav-Icons/leaderboard.png';
import VideoPlayer from '../Youtube';

const Valorant = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setIsButtonDisabled(selectedRank === null);
  }, [selectedRank]);

  useEffect(() => {
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    modal.style.display = 'block';
    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
    return () => {
      window.removeEventListener('click', onclick);
    };
  }, []);

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
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2 className="modal-title">How to Play</h2>
          <br />
          <p>
            Watch the clip and decide what rank the player is
            <br />
            <br />
            Correct guesses are worth 1 point{' '}
            <img src={check} alt="check" width={30} />
            <br /> Incorrect guesses will deduct 1 point{' '}
            <img src={wrong} width={40} alt="wrong icon" />
            <br />
          </p>
          <p>
            Get enough points to top the leaderboard{' '}
            <img src={leader} width={50} alt="board" />
          </p>
          <br />
          <h3 className="modal-title">Example</h3>
          <br />
          <div className="modal-example">
            <div>
              <div className="modal-example-heading">Correct Rank</div>
              <img
                className="modal-example-image"
                src={Radiant}
                alt="Radiant"
                width={100}
              />
              <p className="modal-example-rad">Radiant</p>
            </div>

            <div>
              <div className="modal-example-heading">Your Guess</div>
              <img
                className="modal-example-image"
                src={Iron}
                alt="Iron"
                width={100}
              />
              <p className="modal-example-iron">Iron</p>
            </div>

            <div>
              <div className="modal-example-heading result-title">Result</div>
              <img
                className="modal-example-image wrong"
                src={wrong}
                alt="wrong"
                width={70}
              />
              <p className="modal-example-wrong">-1 Point</p>
            </div>
          </div>
          <br />
          <div>
            Want your clips featured? Submit your clips{' '}
            <a className="modal-a-tag" href="/submit">
              here!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Valorant;
