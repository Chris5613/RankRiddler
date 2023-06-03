/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import bronze from '../../Assets/Overwatch-Icons/bronze.png';
import silver from '../../Assets/Overwatch-Icons/silver.png';
import gold from '../../Assets/Overwatch-Icons/gold.png';
import platinum from '../../Assets/Overwatch-Icons/plat.png';
import diamond from '../../Assets/Overwatch-Icons/diamond.png';
import master from '../../Assets/Overwatch-Icons/master.png';
import grandmaster from '../../Assets/Overwatch-Icons/grand.png';
import top500 from '../../Assets/Overwatch-Icons/500.png';
import VideoPlayer from '../Youtube';
import RankImage from './RankImage';
import { overwatchActions } from '../store/OverwatchSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';

const Csgo = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.overwatch.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.overwatch.isButtonDisabled
  );
  const url = useSelector((state) => state.overwatch.url);
  const showModal = useSelector((state) => state.overwatch.showModal);
  const rank = useSelector((state) => state.overwatch.rank);
  const result = useSelector((state) => state.overwatch.result);
  const player = useSelector((state) => state.overwatch.player);
  const score = useSelector((state) => state.overwatch.score) || 0;
  const point = useSelector((state) => state.overwatch.point);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(overwatchActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(overwatchActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(overwatchActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    Bronze: bronze,
    Silver: silver,
    Gold: gold,
    Platinum: platinum,
    Diamond: diamond,
    Master: master,
    Grandmaster: grandmaster,
    'Top 500': top500,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(API.GetOverwatchData);
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
    dispatch(overwatchActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(overwatchActions.setRank(data.form[randomIndex].rank));
    dispatch(overwatchActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(overwatchActions.setSelectedRank(null));
    dispatch(overwatchActions.setIsButtonDisabled(true));
    dispatch(overwatchActions.hideShowModal());
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
      dispatch(overwatchActions.setScore(data.points));
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
      'Master',
      'Grandmaster',
      'Top 500',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(overwatchActions.setResult(check));
      newPoint = 2;
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(overwatchActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    } else {
      dispatch(overwatchActions.setResult(wrong));
      newPoint = -1;
      updatePoints(-1, userId);
    }
    const newScore = score + newPoint;
    dispatch(overwatchActions.setPoint(newPoint));
    dispatch(overwatchActions.setScore(newScore));
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
          rank="Master"
          src={master}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Grandmaster"
          src={grandmaster}
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
        />
        <RankImage
          rank="Top 500"
          src={top500}
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
