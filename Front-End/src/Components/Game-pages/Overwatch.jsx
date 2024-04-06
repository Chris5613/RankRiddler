/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
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
import ReportButton from '../Other-Pages/Side-Components/reportButton'
import BackButton from '../Other-Pages/Side-Components/BackButton'
import API from '../../api';
import VoteBarChart from '../Other-Pages/Side-Components/VoteBarChart';

const Overwatch = () => {
  const dispatch = useDispatch();
  let selectedRank = useSelector((state) => state.overwatch.selectedRank);
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
  const index = useSelector((state) => state.overwatch.index);
  const videoId = useSelector((state) => state.overwatch.videoId);
  const votes = useSelector((state) => state.overwatch.votes);

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
    dispatch(overwatchActions.setIndex(randomIndex));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(overwatchActions.setSelectedRank(null));
    dispatch(overwatchActions.setIsButtonDisabled(true));
    dispatch(overwatchActions.hideShowModal());
    dispatch(overwatchActions.setVotes({}));
    dispatch(overwatchActions.setVideoId(''));
    dispatch(overwatchActions.setIndex(0));
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
      let correct = true
      updatePoints(2, userId);
      updateUserStats(correct)
    } else if (distance === 1) {
      dispatch(overwatchActions.setResult(wrong));
      newPoint = 1;
      let correct = false
      updatePoints(1, userId);
      updateUserStats(correct)
    } else {
      dispatch(overwatchActions.setResult(wrong));
      let correct = false
      updateUserStats(correct)
    }
    const newScore = score + newPoint;
    dispatch(overwatchActions.setPoint(newPoint));
    dispatch(overwatchActions.setScore(newScore));
  };

  const updateUserStats = async (correctGuess) => {
    try {
      const response = await fetch (`${API.CreateStats}` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: 'overwatch',
          username: localStorage.getItem('username'),
          correctGuess: correctGuess
        }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${API.GetOverwatchVideo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(overwatchActions.setVideoId(data[index]._id));
    };

    if (index >= 0) {
      fetchVideos();
    }
  }, [index, dispatch]);

  useEffect(() => {
    const createRecord = async () => {
      if (!videoId) return;
      try {
        const response = await fetch(`${API.CreateOverwatchVoteRecord}`, {
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
        const url = `${API.GetAllOverwatchVotes}/${videoId}`;
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
        dispatch(overwatchActions.setVotes(data.votes));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchVotes();
  }, [videoId, index, dispatch]);

  const videoVote = async () => {
    const rankMapping = {
      'Top 500': 'Top500',
    };

    selectedRank = rankMapping[selectedRank] || selectedRank;
    try {
      const response = await fetch(`${API.RecordOverwatchVotes}`, {
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
                <p className="modal-example-wrong">{point} Coin</p>
              </div>
            </div>
            <br />
            <br />
            <h2>How Everyone Else Guessed</h2>
            <br />
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

export default Overwatch;
