import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import Grandmaster from '../../Assets/League-Icons/GrandMaster.png';
import Diamond from '../../Assets/League-Icons/Diamond.png';
import leader from '../../Assets/Nav-Icons/leaderboard.png';
import { NavLink } from 'react-router-dom';

const Howto = () => {
  return (
    <div className='modal-container'>
      <div className="modal-content">
        <h2 className="modal-title">How to Play</h2>
        <br />
        <p>Watch the clip and decide what rank the player is</p>
          <br />
          Correct guesses are worth 1 point{' '}
          <img src={check} alt="check" width={30} />
          <br /> Incorrect guesses will deduct 1 point{' '}
          <img src={wrong} width={40} alt="wrong icon" />
          <br />
          <br />
          <p> Can't go under 0 points</p>
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
          <NavLink className="modal-a-tag" to="/submit">
            here!
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Howto;
