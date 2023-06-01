/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import Bronze from '../../Assets/Apex-Icons/Bronze.png';
import Silver from '../../Assets/Apex-Icons/Silver.png';
import Gold from '../../Assets/Apex-Icons/Gold.png';
import Platinum from '../../Assets/Apex-Icons/Platinum.png';
import Diamond from '../../Assets/Apex-Icons/Diamond.png';
import Master from '../../Assets/Apex-Icons/Master.png';
import Predator from '../../Assets/Apex-Icons/Predator.png';
import VideoPlayer from '../Youtube';
import RankImage from './RankImage';
import { apexActions } from '../store/ApexSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';

const Csgo = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.apex.selectedRank);
  const isButtonDisabled = useSelector((state) => state.apex.isButtonDisabled);
  const url = useSelector((state) => state.apex.url);
  const showModal = useSelector((state) => state.apex.showModal);
  const rank = useSelector((state) => state.apex.rank);
  const result = useSelector((state) => state.apex.result);
  const player = useSelector((state) => state.apex.player);
  const score = useSelector((state) => state.apex.score) || 0;
  const point = useSelector((state) => state.apex.point);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(apexActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(apexActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(apexActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    Bronze: Bronze,
    Silver: Silver,
    Gold: Gold,
    Platinum: Platinum,
    Diamond: Diamond,
    Master: Master,
    Predator: Predator,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      API.GetApexData
    );
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
    dispatch(apexActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(apexActions.setRank(data.form[randomIndex].rank));
    dispatch(apexActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(apexActions.setSelectedRank(null));
    dispatch(apexActions.setIsButtonDisabled(true));
    dispatch(apexActions.hideShowModal());
  };

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(
        `${API.GetUserByUuid}/${uuid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      dispatch(apexActions.setScore(data.points));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  const updatePoints = async (point,uuid) => {
    try {
      const response = await fetch(
        `${API.UpdatePoints}/${uuid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            points: point,
          }),
        }
      );
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
      'Master',
      'Predator',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(apexActions.setResult(check));
      newPoint = 2;
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(apexActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    } else {
      dispatch(apexActions.setResult(wrong));
      newPoint = -1;
      updatePoints(-1, userId);

    }
    const newScore = score + newPoint;
    dispatch(apexActions.setPoint(newPoint));
    dispatch(apexActions.setScore(newScore));
  };

  return (
    <>
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
          rank="Predator"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={Predator}
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
