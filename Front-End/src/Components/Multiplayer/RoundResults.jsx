import { useState, useEffect } from 'react';
import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';

const RoundResults = ({ user, enemy, rank,selected }) => {
  const [countdown1, setCountdown] = useState(30);
  const [rankImage, setRankImage] = useState('');
  const [points, setPoints] = useState(0);

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


  useEffect(() => {
    const rankImages = {
      Iron,
      Bronze,
      Silver,
      Gold,
      Platinum,
      Diamond,
      Ascendant,
      Immortal,
      Radiant,
    };
    const rankImage = rankImages[rank] || rank;
    setRankImage(rankImage);
  }, [rank]);

  useEffect(() => {
    if (selected === rank) {
      setPoints(prevPoints => prevPoints + 2);
    } else {
      setPoints(prevPoints => prevPoints - 1);
    }
  }, [selected, rank]);

  console.log(points)


  return (
    <>
      <div className="result-user-container">
        <h1>
          <u>Round 1 Results</u>
        </h1>
        <h2>
          Correct Rank:{' '}
          <img width={80} src={rankImage} alt="correct-rank" />
        </h2>
        <div>
          <p>
            {user}:{points}
            {/* {icons.map((icon, index) => {
              return (
                <img
                  key={index}
                  src={icon}
                  width={50}
                  alt="Box"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              );
            })} */}
          </p>
          <p>
            {enemy}:{points}
          </p>
        </div>
      </div>
    </>
  );
};

export default RoundResults;

