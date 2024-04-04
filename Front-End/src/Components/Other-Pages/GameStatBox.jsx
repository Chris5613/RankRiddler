import { useState } from "react";

const GameStatBox = ({ src, game, roundsPlayed, correctGuesses }) => {
  const [accuracy, setAccuracy] = useState(0);

  const GameAccuracy = ((correctGuesses / roundsPlayed) * 100).toFixed(0);
  if (GameAccuracy === Infinity || isNaN(GameAccuracy)) {
    setAccuracy(0);
  } else if (accuracy > 100) {
    setAccuracy(100);
  }


  return (
    <div className="stat-box">
      <img src={src} alt={game} />
      <p><b>{game}</b></p>
      <div className='game-stat-container'>
        <div className='game-stats'>
          <h3>Rounds</h3>
          <h3>{roundsPlayed}</h3>
        </div>
        <div className='game-stats'>
          <h3>Accuracy</h3>
          <h3>{accuracy}%</h3>
        </div>
      </div>
    </div>
  );
};

export default GameStatBox;
