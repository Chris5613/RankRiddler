import React, { useState } from 'react';
import '../../css/multi.css';
import fullHeart from './heart.png';

const Gamepage = ({ username, opponent }) => {
  const [userHearts, setUserHearts] = useState(3); // Let's assume each player starts with 3 hearts
  const [opponentHearts, setOpponentHearts] = useState(3);

  // Function to handle wrong answers
  const onWrongAnswer = (player) => {
    if (player === 'user') {
      setUserHearts((prev) => prev - 1);
    } else {
      setOpponentHearts((prev) => prev - 1);
    }
  };

  // Function to render hearts
  const renderHearts = (numHearts) => {
    let hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        i < numHearts ? (
          <img src={fullHeart} width={80} alt="Full Heart" />
        ) : (
          <img
            src="https://cdn3.iconfinder.com/data/icons/retro-game-items/100/retro-12-512.png"
            width={80}
            alt="Empty Heart"
          />
        )
      );
    }
    return hearts;
  };

  return (
    <div className="game-container">
      <div className="top-info">
        <div className="username">
          {username}: {renderHearts(userHearts)}
        </div>
        <div className="opponent">
          {opponent}: {renderHearts(opponentHearts)}
        </div>
      </div>
      <div className="youtube-wrapper">
        <iframe
          className="video"
          src="https://www.youtube.com/embed/K0MuhfWdNhs?si=PQyYtc2J4pJdoiX0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="spacing-div"></div>
      {/* Example buttons to simulate wrong answers */}
      <button onClick={() => onWrongAnswer('user')}>User Wrong Answer</button>
      <button onClick={() => onWrongAnswer('opponent')}>
        Opponent Wrong Answer
      </button>
    </div>
  );
};

export default Gamepage;
