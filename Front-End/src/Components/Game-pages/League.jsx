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
import { useCallback, useEffect, useState } from 'react';
import check from '../../Assets/Modal-Icons/Check.png';
import wrong from '../../Assets/Modal-Icons/Wrong.png';
import VideoPlayer from '../Youtube';
import Cookies from 'js-cookie';
import RankImage from './RankImage';
import { useSelector, useDispatch } from 'react-redux';
import { leagueActions } from '../store/LeagueSlice';
import ReportButton from '../Other-Pages/reportButton';
import API from '../../api';
import BackButton from '../Other-Pages/BackButton';
import VoteBarChart from '../Other-Pages/VoteBarChart';

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
  const score = useSelector((state) => state.league.score) || 0;
  const point = useSelector((state) => state.league.point);
  const userId = useSelector((state) => state.settings.userId);
  const index = useSelector((state) => state.league.index)
  const videoId = useSelector((state) => state.league.videoId)
  const votes = useSelector((state) => state.league.votes)


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
    const response = await fetch(API.GetLeagueData);
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
    dispatch(leagueActions.setIndex(randomIndex));
  }, [dispatch]);

  useEffect(() => {
    getYoutubeUrl();
  }, [getYoutubeUrl]);

  const refresh = () => {
    getYoutubeUrl();
    dispatch(leagueActions.setSelectedRank(null));
    dispatch(leagueActions.setIsButtonDisabled(true));
    dispatch(leagueActions.hideShowModal());
    dispatch(leagueActions.setVotes({}))
    dispatch(leagueActions.setVideoId(''));
    dispatch(leagueActions.setIndex(0));
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
      dispatch(leagueActions.setScore(data.points));
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
      updatePoints(2, userId);
    } else if (distance === 1) {
      dispatch(leagueActions.setResult(wrong));
      newPoint = 1;
      updatePoints(1, userId);
    }else {
      dispatch(leagueActions.setResult(wrong));
    }
    const newScore = score + newPoint;
    dispatch(leagueActions.setPoint(newPoint));
    dispatch(leagueActions.setScore(newScore));
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`${API.GetLeagueVideo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(leagueActions.setVideoId(data[index]._id));
    };
  
    if (index >= 0) {
      fetchVideos();
    }
  }, [index,dispatch]);


  useEffect(() => {
    const createRecord = async () => {
      if (!videoId) return; 
      try {
        const response = await fetch(`${API.CreateLeagueVoteRecord}`, { 
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
        const url = `${API.GetAllLeagueVotes}/${videoId}`; 
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
        dispatch(leagueActions.setVotes(data.votes));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchVotes();
  }, [videoId, index,dispatch]);
  

  const videoVote = async () => {
    try {
      const response = await fetch(`${API.RecordLeagueVotes}`, {
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
                <p className="modal-example-wrong">{point} Point</p>
              </div>
            </div>
            <br />
            <br />
            <h2>How Everyone Else Guessed</h2>
            <br /> 
            <br />
            <VoteBarChart votePercentages={votes} />  
            <br />        
            <p className="text">You currently have {score} points</p>
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

export default League;