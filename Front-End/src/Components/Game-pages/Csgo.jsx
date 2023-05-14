import { useCallback, useEffect } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import silver from '../../Assets/Csgo-Icons/Silver.png';
import se from '../../Assets/Csgo-Icons/SE.png';
import nova from '../../Assets/Csgo-Icons/Nova.png';
import mg from '../../Assets/Csgo-Icons/MG.png';
import dmg from '../../Assets/Csgo-Icons/DMG.png';
import le from '../../Assets/Csgo-Icons/LE.png';
import mge from '../../Assets/Csgo-Icons/MGE.png';
import smfc from '../../Assets/Csgo-Icons/SMFC.png';
import ge from '../../Assets/Csgo-Icons/GE.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';
import { csgoActions } from '../store/CsgoSlice';
import { useDispatch, useSelector } from 'react-redux';

const Csgo = () => {
  const dispatch = useDispatch();
  const selectedRank = useSelector((state) => state.csgo.selectedRank);
  const isButtonDisabled = useSelector((state) => state.csgo.isButtonDisabled);
  const url = useSelector((state) => state.csgo.url);
  const showModal = useSelector((state) => state.csgo.showModal);
  const rank = useSelector((state) => state.csgo.rank);
  const result = useSelector((state) => state.csgo.result);
  const player = useSelector((state) => state.csgo.player);
  const score = useSelector((state) => state.csgo.score);
  const point = useSelector((state) => state.csgo.point);
  const username = useSelector((state) => state.settings.username);
  const userId = useSelector((state) => state.settings.userId);

  const handleModal = () => {
    dispatch(csgoActions.toggleShowModal());
  };

  useEffect(() => {
    dispatch(csgoActions.setIsButtonDisabled(selectedRank === null));
  }, [selectedRank, dispatch]);

  const handleRankClick = (rank) => {
    dispatch(csgoActions.setSelectedRank(rank));
  };

  const youtubeUrl = url;
  const rankImages = {
    Silver: silver,
    'Silver Elite': se,
    'Gold Nova': nova,
    'Master Guardian': mg,
    'Distinguished Master Guardian': dmg,
    'Legendary Eagle': le,
    'Master Guardian Elite': mge,
    Supreme: smfc,
    'Global Elite': ge,
  };

  const pic = rankImages[rank];
  const submittedRank = rankImages[selectedRank];

  const getYoutubeUrl = useCallback(async () => {
    const response = await fetch(
      'https://rr-back-end.onrender.com/form/csgodata'
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
    dispatch(csgoActions.setUrl(data.form[randomIndex].youtubeLink));
    dispatch(csgoActions.setRank(data.form[randomIndex].rank));
    dispatch(csgoActions.setPlayer(data.form[randomIndex].playerInfo));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(csgoActions.setSelectedRank(null));
    dispatch(csgoActions.setIsButtonDisabled(true));
    dispatch(csgoActions.hideShowModal());
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
      dispatch(csgoActions.setScore(data.points));
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
      'Silver',
      'Silver Elite',
      'Gold Nova',
      'Master Guardian',
      'Distinguished Master Guardian',
      'Legendary Eagle',
      'Master Guardian Elite',
      'Supreme',
      'Global Elite',
    ];
    const rankIndex = rankList.indexOf(rank);
    const selectedRankIndex = rankList.indexOf(selectedRank);
    const distance = Math.abs(rankIndex - selectedRankIndex);

    let newPoint = 0;
    if (rank === selectedRank) {
      dispatch(csgoActions.setResult(check));
      newPoint = 2;
      updatePoints(2);
    } else if (distance === 1) {
      dispatch(csgoActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1);
    } else {
      dispatch(csgoActions.setResult(wrong));
      newPoint = -1;
      updatePoints(-1);
    }
    const newScore = score + newPoint;
    dispatch(csgoActions.setPoint(newPoint));
    dispatch(csgoActions.setScore(newScore));
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
          rank="Silver"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={silver}
        />
        <RankImage
          rank="Silver Elite"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={se}
        />
        <RankImage
          rank="Gold Nova"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={nova}
        />
        <RankImage
          rank="Master Guardian"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={mg}
        />
        <RankImage
          rank="Master Guardian Elite"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={mge}
        />
        <RankImage
          rank="Distinguished Master Guardian"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={dmg}
        />
        <RankImage
          rank="Legendary Eagle"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={le}
        />
        <RankImage
          rank="Supreme"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={smfc}
        />
        <RankImage
          rank="Global Elite"
          selectedRank={selectedRank}
          handleRankClick={handleRankClick}
          src={ge}
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

export default Csgo;
