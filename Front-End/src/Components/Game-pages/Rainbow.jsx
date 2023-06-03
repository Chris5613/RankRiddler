/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import copper from '../../Assets/Rainbow-Icons/copper.png';
import bronze from '../../Assets/Rainbow-Icons/bronze.png';
import silver from '../../Assets/Rainbow-Icons/silver.png';
import gold from '../../Assets/Rainbow-Icons/gold.png';
import plat from '../../Assets/Rainbow-Icons/plat.png';
import diamond from '../../Assets/Rainbow-Icons/diamond.png';
import champ from '../../Assets/Rainbow-Icons/champ.png';
import VideoPlayer from '../Youtube';
import RankImage from './RankImage';
import { rainbowActions } from '../store/RainbowSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';

const Csgo = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.rainbow.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.rainbow.isButtonDisabled
  );
  const url = useSelector((state) => state.rainbow.url);
  const showModal = useSelector((state) => state.rainbow.showModal);
  const rank = useSelector((state) => state.rainbow.rank);
  const result = useSelector((state) => state.rainbow.result);
  const player = useSelector((state) => state.rainbow.player);
  const score = useSelector((state) => state.rainbow.score) || 0;
  const point = useSelector((state) => state.rainbow.point);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(rainbowActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(rainbowActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(rainbowActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    copper: copper,
    bronze: bronze,
    silver: silver,
    gold: gold,
    plat: plat,
    diamond: diamond,
    champ: champ,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(API.GetRainbowData);
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
    dispatch(rainbowActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(rainbowActions.setRank(data.form[randomIndex].rank));
    dispatch(rainbowActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(rainbowActions.setSelectedRank(null));
    dispatch(rainbowActions.setIsButtonDisabled(true));
    dispatch(rainbowActions.hideShowModal());
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
      dispatch(rainbowActions.setScore(data.points));
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
      'Copper',
      'Bronze',
      'Silver',
      'Gold',
      'Plat',
      'Diamond',
      'Champion',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(rainbowActions.setResult(check));
      newPoint = 2;
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(rainbowActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    } else {
      dispatch(rainbowActions.setResult(wrong));
      newPoint = -1;
      updatePoints(-1, userId);
    }
    const newScore = score + newPoint;
    dispatch(rainbowActions.setPoint(newPoint));
    dispatch(rainbowActions.setScore(newScore));
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
          rank="Copper"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={copper}
        />
        <RankImage
          rank="Bronze"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={bronze}
        />
        <RankImage
          rank="Silver"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={silver}
        />
        <RankImage
          rank="Gold"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={gold}
        />
        <RankImage
          rank="Plat"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={plat}
        />
        <RankImage
          rank="Diamond"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={diamond}
        />
        <RankImage
          rank="Champion"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={champ}
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
