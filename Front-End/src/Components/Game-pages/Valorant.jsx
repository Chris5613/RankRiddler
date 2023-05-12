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
import { useEffect, useCallback } from 'react';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';
import { useSelector, useDispatch } from 'react-redux';
import { valorantActions } from '../../store/ValorantSlice';

const Valorant = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.valorant.selectedRank);
  const isButtonDisabled = useSelector(
    (state) => state.valorant.isButtonDisabled
  );
  const url = useSelector((state) => state.valorant.url);
  const showModal = useSelector((state) => state.valorant.showModal);
  const rank = useSelector((state) => state.valorant.rank);
  const result = useSelector((state) => state.valorant.result);
  const player = useSelector((state) => state.valorant.player);
  const score = useSelector((state) => state.valorant.score);
  const point = useSelector((state) => state.valorant.point);


  const handleModal = () => {
    dispatch(valorantActions.toggleShowModal());

  };

  useEffect(() => {
    dispatch(valorantActions.setIsButtonDisabled(selectedRank === null));

  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(valorantActions.setSelectedRank(rank));

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

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/valdata'
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.form.length);
    dispatch(valorantActions.setUrl(data.form[randomIndex].youtubeLink));

    dispatch(valorantActions.setRank(data.form[randomIndex].rank));

    dispatch(valorantActions.setPlayer(data.form[randomIndex].playerInfo));

  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(valorantActions.setSelectedRank(null));

    dispatch(valorantActions.setIsButtonDisabled(true));

    dispatch(valorantActions.hideShowModal());

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
      'Ascendant',
      'Immortal',
      'Radiant',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let updatedScore = parseInt(Cookies.get('score') || '0');
    let pointEarned = 0;

    if (rank === selectedRank) {
      dispatch(valorantActions.setResult(check));

      pointEarned = 2;
      updatedScore += 2;
    } else if (distance === 1) {
      dispatch(valorantActions.setResult(wrong));

      pointEarned = 1;
      updatedScore += 1;
    } else {
      dispatch(valorantActions.setResult(wrong));

      pointEarned = -1;
      updatedScore -= 1;
    }

    Cookies.set('score', updatedScore.toString());
    dispatch(valorantActions.setScore(updatedScore));

    dispatch(valorantActions.setPoint(pointEarned));


    console.log(updatedScore);
    console.log(pointEarned);
    updatePoints(updatedScore);
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
