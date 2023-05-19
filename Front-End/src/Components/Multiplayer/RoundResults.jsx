import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import Wrong from '../../Assets/Modal-Icons/Wrong.png';
import { MultiplayerActions } from '../store/MultiplayerSlice';

const RoundResults = ({ user1, user2, result, rank,selected }) => {
  const [countdown1, setCountdown] = useState(30);
  const [icons, setIcons] = useState([]);
  const [round , setRound] = useState(1);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(MultiplayerActions.setCountFinished(false));
    setIcons([]);
    setCountdown(30);
    setRound(prevRound => prevRound + 1);
  };

  const check =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown1 === 0) {
      setCountdown(0);
    }
  }, [countdown1]);

  const rankImages = {
    Iron: Iron,
    Bronze: Bronze,
    Silver: Silver,
    Gold: Gold,
    Platinum: Platinum,
    Diamond: Diamond,
    Ascendant: Ascendant,
    Immortal: Immortal,
    Radiant: Radiant,
  };
  rank = rankImages[rank] || rank;

  useEffect(() => {
    if(result === 'win'){
      icons.push(check);
    }else{
      icons.push(Wrong);
    }
  }, [result,icons]);

  return (
    <>
      <div className="result-user-container">
        <h1>
          <u>Round {round} Results</u>
        </h1>
        <h2>
          Correct Rank:{' '}
          <img width={80} src={rank} alt="correct-rank" />
        </h2>
        <div>
        <p>
          {user1}:
          {icons.map((icon, index) => {
            return (
              <img
                key={`user1-${index}`}
                src={icon}
                width={50}
                alt="Box"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            );
          })}
        </p>
        <p>
          {user2}:
          {icons.map((icon, index) => {
            return (
              <img
                key={`user2-${index}`}
                src={icon}
                width={50}
                alt="Box"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            );
          })}
        </p>
        </div>
        <button onClick={handleReset}>next round</button>
      </div>
    </>
  );
};

export default RoundResults;

