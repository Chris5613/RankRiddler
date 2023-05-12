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
import { leagueActions } from '../../store/LeagueSlice';

const League = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.league.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.league.isButtonDisabled
  );
  const url = useSelector((state) => state.csgo.url);
  const showModal = useSelector((state) => state.league.showModal);
  const rank = useSelector((state) => state.league.rank);
  const result = useSelector((state) => state.league.result);
  const player = useSelector((state) => state.league.player);
  const score = useSelector((state) => state.league.score);
  const point = useSelector((state) => state.league.point);

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
    const randomIndex = Math.floor(Math.random() * data.form.length);
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

  const updatePoints = async (updatedScore) => {
    try {
      const response = await fetch(
        'https://rr-back-end.onrender.com/updatepoints',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: Cookies.get('username'),
            points: updatedScore,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
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

    let updatedScore = parseInt(Cookies.get('score') || '0');
    let pointEarned = 0;

    if (rank === selectedRank) {
      dispatch(leagueActions.setResult(check));

      pointEarned = 2;
      updatedScore += 2;
    } else if (distance === 1) {
      dispatch(leagueActions.setResult(wrong));

      pointEarned = 1;
      updatedScore += 1;
    } else {
      dispatch(leagueActions.setResult(wrong));

      pointEarned = -1;
      updatedScore -= 1;
    }

    Cookies.set('score', updatedScore.toString());
    dispatch(leagueActions.setScore(updatedScore));

    dispatch(leagueActions.setPoint(pointEarned));


    console.log(updatedScore);
    console.log(pointEarned);
    updatePoints(updatedScore);
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
