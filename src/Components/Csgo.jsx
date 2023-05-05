import { useState, useEffect } from 'react';
import check from '../Assets/Modal-Icons/Check.png';
import wrong from '../Assets/Modal-Icons/Wrong.png';
import leader from '../Assets/Modal-Icons/leader.png';
import silver from '../Assets/Csgo-Icons/Silver.png';
import se from '../Assets/Csgo-Icons/SE.png';
import nova from '../Assets/Csgo-Icons/Nova.png';
import mg from '../Assets/Csgo-Icons/MG.png';
import dmg from '../Assets/Csgo-Icons/DMG.png';
import le from '../Assets/Csgo-Icons/LE.png';
import mge from '../Assets/Csgo-Icons/MGE.png';
import smfc from '../Assets/Csgo-Icons/SMFC.png';
import ge from '../Assets/Csgo-Icons/GE.png';

const Csgo = () => {
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
          src="https://www.youtube.com/embed/p_HLyWB5bOo"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
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
            boxShadow: selectedRank === 'Silver Elite' ? '0 0 10px gold' : '',
          }}
        />
        <img
          className={`rank ${selectedRank === 'Gold Nova' ? 'selected' : ''}`}
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
          className={`rank ${selectedRank === 'Master Guardian' ? 'selected' : ''}`}
          onClick={() => handleRankClick('Master Guardian')}
          style={{ boxShadow: selectedRank === 'Master Guardian' ? '0 0 10px gold' : '' }}
        />
        <img
          className={`rank ${
            selectedRank === 'Master Guardian Elite' ? 'selected' : ''
          }`}
          src={mge}
          alt="Master Guardian Elite"
          onClick={() => handleRankClick('Master Guardian Elite')}
          style={{
            boxShadow: selectedRank === 'Master Guardian Elite' ? '0 0 10px gold' : '',
          }}
        />
        <img
          className={`rank ${
            selectedRank === 'Distinguished Master Guardian' ? 'selected' : ''
          }`}
          src={dmg}
          alt="Distinguished Master Guardian"
          onClick={() => handleRankClick('Distinguished Master Guardian')}
          style={{
            boxShadow: selectedRank === 'Distinguished Master Guardian' ? '0 0 10px gold' : '',
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
            boxShadow: selectedRank === 'Legendary Eagle' ? '0 0 10px gold' : '',
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
          className={`rank ${selectedRank === 'Global Elite' ? 'selected' : ''}`}
          onClick={() => handleRankClick('Global Elite')}
          style={{
            boxShadow: selectedRank === 'Global Elite' ? '0 0 10px gold' : '',
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
            <br/>
            <p>Get enough points to top the leaderboard <img src={leader} width={50} alt="board" /></p>
          </p>
          <br />
          <h3 className="modal-title">Example</h3>
          <br />
          <div className="modal-example">
            <div>
              <div className="modal-example-heading">Correct Rank</div>
              <img
                className="modal-example-image"
                src={ge}
                alt="Radiant"
                width={100}
              />
              <p className="modal-example-rad">Global Elite</p>
            </div>

            <div>
              <div className="modal-example-heading">Your Guess</div>
              <img
                className="modal-example-image"
                src={mge}
                alt="Iron"
                width={100}
              />
              <p className="modal-example-iron">MGE</p>
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
          <br/>
          <div>
            Want your clips featured? Submit your clips <a className="modal-a-tag" href="/submit">here!</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Csgo;