/* eslint-disable no-unused-vars */
import Iron from '../../Assets/League-Icons/Iron.png';
import Bronze from '../../Assets/League-Icons/bronze.png';
import Silver from '../../Assets/League-Icons/silver.png';
import Gold from '../../Assets/League-Icons/Gold.png';
import Platinum from '../../Assets/League-Icons/Plat.png';
import Diamond from '../../Assets/League-Icons/Diamond.png';
import Master from '../../Assets/League-Icons/Master.png';
import Grandmaster from '../../Assets/League-Icons/GrandMaster.png';
import Challenger from '../../Assets/League-Icons/Challenger.png';
import { useEffect, useCallback } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';
import { useSelector, useDispatch } from 'react-redux';
import { leagueActions } from '../store/LeagueSlice';
import ReportButton from '../Misc/reportButton';

const League = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.league.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.league.isButtonDisabled
  );
  const url = useSelector((state) => state.league.url);
  const showModal = useSelector((state) => state.league.showModal);
  const rank = useSelector((state) => state.league.rank);
  const result = useSelector((state) => state.league.result);
  const player = useSelector((state) => state.league.player);
  const score = useSelector((state) => state.league.score);
  const point = useSelector((state) => state.league.point);
  const username = useSelector((state) => state.settings.username);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(leagueActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(leagueActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(leagueActions.setSelectedRank(rank));
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

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/leaguedata'
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
    dispatch(leagueActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(leagueActions.setRank(data.form[randomIndex].rank));
    dispatch(leagueActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(leagueActions.setSelectedRank(null));
    dispatch(leagueActions.setIsButtonDisabled(true));
    dispatch(leagueActions.hideShowModal());
  };

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`http://localhost:3001/user/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(leagueActions.setScore(data.points));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  const updatePoints = async (point) => {
    try {
      const response = await fetch('http://localhost:3001/updatepoints', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
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

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(leagueActions.setResult(check));
      newPoint = 2;
      updatePoints(2);
    } else if (distance === 1) {
      dispatch(leagueActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1);
    } else {
      dispatch(leagueActions.setResult(wrong));
      newPoint = -1;
      updatePoints(-1);
    }
    const newScore = score + newPoint;
    dispatch(leagueActions.setPoint(newPoint));
    dispatch(leagueActions.setScore(newScore));
  };

  return (
    <>
    <ReportButton youtubeLink={youtubeUrl} playerInfo={player} reportedBy={userId} />
      {/* <div className="report-wrapper">
        <div className="report-align">
          <button className="report-btn" onClick={handleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-flag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
            </svg>
            Report{' '}
          </button>
        </div>
      </div> */}
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
          {selectedRank ? `Submit: ${selectedRank}` : 'Select a Rank'}
        </button>
      </div>
    </>
  );
};

export default League;
