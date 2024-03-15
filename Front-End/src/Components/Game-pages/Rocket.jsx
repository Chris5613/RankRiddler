/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import bronze from '../../Assets/Rocket-Icons/Bronze.png';
import silver from '../../Assets/Rocket-Icons/Silver.png';
import gold from '../../Assets/Rocket-Icons/Gold.png';
import platinum from '../../Assets/Rocket-Icons/Platinum.png';
import diamond from '../../Assets/Rocket-Icons/Diamond.png';
import champ from '../../Assets/Rocket-Icons/Champion.png';
import grand from '../../Assets/Rocket-Icons/Grand-Champion.png';
import supersonic from '../../Assets/Rocket-Icons/Supersonic-Legend.png';
import VideoPlayer from '../Youtube';
import RankImage from './RankImage';
import { rocketActions } from '../store/RocketSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';
import BackButton from '../Other-Pages/BackButton';

const Csgo = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.rocket.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.rocket.isButtonDisabled
  );
  const url = useSelector((state) => state.rocket.url);
  const showModal = useSelector((state) => state.rocket.showModal);
  const rank = useSelector((state) => state.rocket.rank);
  const result = useSelector((state) => state.rocket.result);
  const player = useSelector((state) => state.rocket.player);
  const score = useSelector((state) => state.rocket.score) || 0;
  const point = useSelector((state) => state.rocket.point);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(rocketActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(rocketActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(rocketActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    Bronze: bronze,
    Silver: silver,
    Gold: gold,
    Platinum: platinum,
    Diamond: diamond,
    Champion: champ,
    'Grand Champion': grand,
    'Supersonic Legend': supersonic,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(API.GetRocketData);
    const data = await response.json();
    const MAX_CONSECUTIVE_SAME_INDICES = 10;

    const buffer = new Array(MAX_CONSECUTIVE_SAME_INDICES);
    buffer.fill(-1);
    let randomIndex = Math.floor(Math.random() * data.form.length);
    while (buffer.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * data.form.length);
    }

    buffer.push(randomIndex);
    buffer.shift();
    dispatch(rocketActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(rocketActions.setRank(data.form[randomIndex].rank));
    dispatch(rocketActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(rocketActions.setSelectedRank(null));
    dispatch(rocketActions.setIsButtonDisabled(true));
    dispatch(rocketActions.hideShowModal());
  };

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(rocketActions.setScore(data.points));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  const updatePoints = async (point, uuid) => {
    try {
      const response = await fetch(`${API.UpdatePoints}/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          points: point,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = () => {
    const rankList = [
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Champion',
      'Grand Champion',
      'Supersonic Legend',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(rocketActions.setResult(check));
      newPoint = 2;
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(rocketActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    }
    const newScore = score + newPoint;
    dispatch(rocketActions.setPoint(newPoint));
    dispatch(rocketActions.setScore(newScore));
  };

  return (
    <>
      <BackButton />
      <ReportButton
        youtubeLink={youtubeUrl}
        playerInfo={player}
        reportedBy={userId}
      />
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
          rank="Bronze"
          src={bronze}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Silver"
          src={silver}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Gold"
          src={gold}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Platinum"
          src={platinum}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Diamond"
          src={diamond}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Champion"
          src={champ}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Grand Champion"
          src={grand}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Supersonic Legend"
          src={supersonic}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
      </div>
      <div className="submit-btn-container">
        <button
          className="submit"
          onClick={() => {
            handleModal();
            checkAnswer();
          }}
          disabled={isButtonDisabled}
        >
          {selectedRank ? `Submit: ${selectedRank}` : 'Select a Rank'}
        </button>
      </div>
    </>
  );
};

export default Csgo;
