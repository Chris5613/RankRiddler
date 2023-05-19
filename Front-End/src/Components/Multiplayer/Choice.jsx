import { useState } from 'react';
import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import RankImage from '../Game-pages/RankImage';
import RoundResults from './RoundResults';

const Choice = ({ rank, user, enemy }) => {
  const [selectedRank, setSelectedRank] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRankClick = (rank) => {
    setSelectedRank(rank);
  };

  const checkAnswer = () => {
    setSubmitted(true);
  };


  return (
    <>
      {!submitted && (
        <>
          <h1>What's the rank?</h1>
          <div className="ranks">
          <RankImage
            rank="Iron"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Iron}
          />
          <RankImage
            rank="Bronze"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Bronze}
          />
          <RankImage
            rank="Silver"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Silver}
          />
          <RankImage
            rank="Gold"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Gold}
          />
          <RankImage
            rank="Platinum"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Platinum}
          />
          <RankImage
            rank="Diamond"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Diamond}
          />
          <RankImage
            rank="Ascendant"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Ascendant}
          />
          <RankImage
            rank="Immortal"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Immortal}
          />
          <RankImage
            rank="Radiant"
            selectedRank={selectedRank}
            handleRankClick={handleRankClick}
            src={Radiant}
          />
          </div>
          <button onClick={checkAnswer} className="submit-button grey" type="submit">
            Submit
          </button>
        </>
      )}
      {submitted && (
        <RoundResults rank={rank} user={user} enemy={enemy} selected={selectedRank} />
      )}
    </>
  );
};

export default Choice;
