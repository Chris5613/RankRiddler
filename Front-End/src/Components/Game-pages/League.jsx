import Iron from '../../Assets/League-Icons/Iron.png';
import Bronze from '../../Assets/League-Icons/bronze.png';
import Silver from '../../Assets/League-Icons/silver.png';
import Gold from '../../Assets/League-Icons/Gold.png';
import Platinum from '../../Assets/League-Icons/Plat.png';
import Diamond from '../../Assets/League-Icons/Diamond.png';
import Master from '../../Assets/League-Icons/Master.png';
import Grandmaster from '../../Assets/League-Icons/GrandMaster.png';
import Challenger from '../../Assets/League-Icons/Challenger.png';
import { useState, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';

const League = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [url, setUrl] = useState('');
  const token = Cookies.get('token');
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [point, setPoint] = useState(0);
  const [player, setPlayer] = useState('');

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
    Master: Master,
    Grandmaster: Grandmaster,
    Challenger: Challenger,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  useEffect(() => {
    const getPoints = async () => {
      const response = await fetch(
        'https://rr-back-end.onrender.com/getpoints',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            username: Cookies.get('userName'),
          },
        }
      );
      const data = await response.json();
      setScore(data.points);
    };
    getPoints();
  }, []);

  const addPoints = async () => {
    const response = await fetch('https://rr-back-end.onrender.com/addpoints', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        username: Cookies.get('userName'),
      },
    });
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    setScore(data.user.points);
  };

  const Add1Points = async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/add1points',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          username: Cookies.get('userName'),
        },
      }
    );
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    setScore(data.user.points);
  };

  const deductPoints = async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/deductpoints',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          username: Cookies.get('userName'),
        },
      }
    );
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    setScore(data.user.points);
  };

  const getYoutubeUrl = async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/leaguedata'
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
      'Master',
      'Grandmaster',
      'Challenger',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    if (rank === selectedRank) {
      setResult(check);
      setPoint(2);
      addPoints();
    } else if (distance === 1) {
      setResult(wrong);
      setPoint(1);
      Add1Points();
    } else {
      setResult(wrong);
      setPoint(-1);
      deductPoints();
    }
  };

  return (
    <>
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
                <div className="modal-example-heading result-title">Result</div>
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
          rank="Master"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Master}
        />
        <RankImage
          rank="Grandmaster"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Grandmaster}
        />
        <RankImage
          rank="Challenger"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Challenger}
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
    </>
  );
};

export default League;
