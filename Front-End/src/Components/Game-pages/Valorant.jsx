/* eslint-disable no-unused-vars */
import Iron from '../../Assets/Val-Ranks/Iron.png';
import Bronze from '../../Assets/Val-Ranks/Bronze.png';
import Silver from '../../Assets/Val-Ranks/Sliver.png';
import Gold from '../../Assets/Val-Ranks/Gold.png';
import Platinum from '../../Assets/Val-Ranks/Plat.png';
import Diamond from '../../Assets/Val-Ranks/Diamond.png';
import Ascendant from '../../Assets/Val-Ranks/Ascendant.png';
import Immortal from '../../Assets/Val-Ranks/Immortal.png';
import Radiant from '../../Assets/Val-Ranks/Radiant.png';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import { useState, useEffect } from 'react';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';

const Valorant = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank] = useState('');
  const [result, setResult] = useState('');
  const [player, setPlayer] = useState('');
  let [score, setScore] = useState();
  const [point, setPoint] = useState(0);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setIsButtonDisabled(selectedRank === null);
  }, [selectedRank]);

  const handleRankClick = (rank) => {
    setSelectedRank(rank);
  };

  const youtubeUrl = url;
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

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/valdata'
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    setUrl(data.form[randomIndex].youtubeLink);
    setRank(data.form[randomIndex].rank);
    setPlayer(data.form[randomIndex].playerInfo);
  };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  const refresh = () => {
    getYoutubeUrl();
    setSelectedRank(null);
    setIsButtonDisabled(true);
    setShowModal(false);
  };

  const checkAnswer = () => {
    const rankList = [
      'Iron',
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Ascendant',
      'Immortal',
      'Radiant',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newScore = parseInt(Cookies.get('score') || '0'); // Parse the current score from cookies
    let newPoint = 0;

    if (rank === selectedRank) {
      setResult(check);
      newPoint = 2;
      newScore += 2;
    } else if (distance === 1) {
      setResult(wrong);
      newPoint = 1;
      newScore += 1;
    } else {
      setResult(wrong);
      newPoint = -1;
      newScore -= 1;
    }

    Cookies.set('score', newScore.toString(),{ secure: true });
    setScore(newScore);
    setPoint(newPoint);
  };

  return (
    <>
      <div className="game-container">
        <div>
          <VideoPlayer url={youtubeUrl} />
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <br />
              <div className="modal-example">
                <div>
                  <div className="modal-example-heading">Correct Rank</div>
                  <img
                    className="modal-example-image"
                    src={pic}
                    alt="Radiant"
                    width={100}
                  />
                </div>
                <div>
                  <div className="modal-example-heading">Your Guess</div>
                  <img
                    className="modal-example-image"
                    src={submittedRank}
                    alt="rank"
                    width={100}
                  />
                </div>
                <div>
                  <div className="modal-example-heading result-title">
                    Result
                  </div>
                  <img
                    className="modal-example-image wrong"
                    src={result}
                    alt="wrong"
                    width={70}
                  />
                  <p className="modal-example-wrong">{point} Point</p>
                </div>
              </div>
              <br />
              <br />
              <p className="text">You currently have {score} points</p>
              <br />
              <p className="text">Credit: {player}</p>
              <button onClick={refresh} className="submit-btn">
                Next Video
              </button>
            </div>
          </div>
        )}
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
        <div>
          <button
            className="submit"
            onClick={() => {
              handleModal();
              checkAnswer();
            }}
            disabled={isButtonDisabled}
          >
            {selectedRank ? `Selected Rank: ${selectedRank}` : 'Select a Rank'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Valorant;
