import '../../css/multi.css';
import fullHeart from './heart.png';
import { useDispatch, useSelector } from 'react-redux';
import { multiplayerActions } from '../store/MultiplayerSlice';

const Gamepage = ({ username, opponent }) => {
  const dispatch = useDispatch();
  const userHearts = useSelector((state) => state.multiplayer.userHearts);
  const opponentHearts = useSelector(
    (state) => state.multiplayer.opponentHearts
  );

  const onWrongAnswer = (player) => {
    if (player === 'user') {
      dispatch(multiplayerActions.setUserHearts((prev) => prev - 1));
    } else {
      dispatch(multiplayerActions.setOpponentHearts((prev) => prev - 1));
    }
  };

  const renderHearts = (numHearts) => {
    let hearts = [];
    for (let i = 0; i < 5; i++) {
      hearts.push(
        i < numHearts ? (
          <img
            key={`fullHeart-${i}`}
            src={fullHeart}
            width={35}
            alt="Full Heart"
          />
        ) : (
          <img
            key={`emptyHeart-${i}`}
            src="https://icones.pro/wp-content/uploads/2021/02/icone-de-coeur-gris.png"
            width={35}
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