import Iron from '../Assets/League-Icons/Iron.png';
import Bronze from '../Assets/League-Icons/bronze.png';
import Silver from '../Assets/League-Icons/silver.png';
import Gold from '../Assets/League-Icons/Gold.png';
import Platinum from '../Assets/League-Icons/Plat.png';
import Diamond from '../Assets/League-Icons/Diamond.png';
import Master from '../Assets/League-Icons/Master.png';
import Grandmaster from '../Assets/League-Icons/GrandMaster.png';
import Challenger from '../Assets/League-Icons/Challenger.png';
import { useState, useEffect } from 'react';
import check from '../Assets/Modal-Icons/Check.png';
import wrong from '../Assets/Modal-Icons/Wrong.png';
import leader from '../Assets/Nav-Icons/leaderboard.png';

const League = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  return (
    <>
      <div>
        <iframe
          className="video"
          width="1000"
          height="550"
          src="https://www.youtube.com/embed/5HXUV5DMGxU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
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
          width={100}
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
          className={`rank asc ${selectedRank === 'Master' ? 'selected' : ''}`}
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
            boxShadow: selectedRank === 'Grandmaster' ? '0 0 10px gold' : '',
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
            <p>
              Get enough points to top the leaderboard{' '}
              <img src={leader} width={50} alt="board" />
            </p>
          </p>
          <br />
          <h3 className="modal-title">Example</h3>
          <br />
          <div className="modal-example">
            <div>
              <div className="modal-example-heading">Correct Rank</div>
              <img
                className="modal-example-image"
                src={Grandmaster}
                alt="Radiant"
                width={100}
              />
              <p className="modal-example-rad">GrandMaster</p>
            </div>

            <div>
              <div className="modal-example-heading">Your Guess</div>
              <img
                className="modal-example-image"
                src={Diamond}
                alt="Iron"
                width={100}
              />
              <p className="modal-example-iron">Diamond</p>
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

export default League;
