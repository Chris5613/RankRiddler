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
import Wrong from '../../Assets/Modal-Icons/Wrong.png';

const RoundResults = ({ user1, user2, result, rank }) => {
  const [countdown1, setCountdown] = useState(30);
  const [icons, setIcons] = useState([]);
  const [rankImage, setRankImage] = useState('');

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

  useEffect(() => {
    const newIcon = result === 'lose' ? Wrong : check;
    setIcons((prevIcons) => [...prevIcons, newIcon]);
  }, [result]);

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

  return (
    <>
      <div className="result-user-container">
        <h1>
          <u>Round {icons.length} Results</u>
        </h1>
        <h2>
          Correct Rank:{' '}
          <img width={80} src={rankImage} alt="correct-rank" />
        </h2>
        <div>
          <p>
            {user1}:
            {icons.map((icon, index) => {
              return (
                <img
                  key={index}
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
                  key={index}
                  src={icon}
                  width={50}
                  alt="Box"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              );
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default RoundResults;

