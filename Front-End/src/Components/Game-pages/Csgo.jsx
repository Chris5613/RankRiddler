/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
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
import RankImage from './RankImage';
import { csgoActions } from '../store/CsgoSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';
import BackButton from '../Other-Pages/BackButton';
import VoteBarChart from '../Other-Pages/VoteBarChart';

const Csgo = () => {
  const dispatch = useDispatch();
  let selectedRank = useSelector((state) => state.csgo.selectedRank);
  const isButtonDisabled = useSelector((state) => state.csgo.isButtonDisabled);
  const url = useSelector((state) => state.csgo.url);
  const showModal = useSelector((state) => state.csgo.showModal);
  const rank = useSelector((state) => state.csgo.rank);
  const result = useSelector((state) => state.csgo.result);
  const player = useSelector((state) => state.csgo.player);
  const score = useSelector((state) => state.csgo.score) || 0;
  const point = useSelector((state) => state.csgo.point);
  const userId = useSelector((state) => state.settings.userId);
  const index = useSelector((state) => state.csgo.index);
  const videoId = useSelector((state) => state.csgo.videoId);
  const votes = useSelector((state) => state.csgo.votes);

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
    const response = await fetch(API.GetCsgoData);
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
    dispatch(csgoActions.setIndex(randomIndex));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(csgoActions.setSelectedRank(null));
    dispatch(csgoActions.setIsButtonDisabled(true));
    dispatch(csgoActions.hideShowModal());
    dispatch(csgoActions.setVotes({}));
    dispatch(csgoActions.setVideoId(''));
    dispatch(csgoActions.setIndex(0));
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
      dispatch(csgoActions.setScore(data.points));
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
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(csgoActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    } else {
      dispatch(csgoActions.setResult(wrong));
    }
    const newScore = score + newPoint;
    dispatch(csgoActions.setPoint(newPoint));
    dispatch(csgoActions.setScore(newScore));
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${API.GetCsgoVideo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(csgoActions.setVideoId(data[index]._id));
    };

    if (index >= 0) {
      fetchVideos();
    }
  }, [index, dispatch]);

  useEffect(() => {
    const createRecord = async () => {
      if (!videoId) return;
      try {
        const response = await fetch(`${API.CreateCsgoVoteRecord}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valFormId: videoId,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error('Error creating video vote:', error);
      }
    };
    createRecord();
  }, [videoId]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const url = `${API.GetAllCsgoVotes}/${videoId}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(csgoActions.setVotes(data.votes));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchVotes();
  }, [videoId, index, dispatch]);

  const videoVote = async () => {
    const rankMapping = {
      'Silver Elite': 'SE',
      'Gold Nova': 'Nova',
      'Master Guardian': 'MG',
      'Master Guardian Elite': 'MGE',
      'Distinguished Master Guardian': 'DMG',
      'Legendary Eagle': 'LE',
      'Global Elite': 'Global',
    };

    selectedRank = rankMapping[selectedRank] || selectedRank;
    try {
      const response = await fetch(`${API.RecordCsgoVotes}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: videoId,
          rank: selectedRank,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error voting:', error);
    }
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
                  alt="rank"
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
                <p className="modal-example-wrong">{point} Coin</p>
              </div>
            </div>
            <br />
            <br />
            <h2>How Everyone Else Guessed</h2>
            <br />
            <VoteBarChart votePercentages={votes} />  
            <br />        
            <p className="text">You currently have {score} Coins</p>
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
      <div className="submit-btn-container" onClick={videoVote}>
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