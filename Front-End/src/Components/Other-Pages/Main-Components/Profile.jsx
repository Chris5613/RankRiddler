import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../api';
import Loader from '../../Loader/Loader';
import GameStatBox from '../Side-Components/GameStatBox';
import MatchHistoryBox from '../Side-Components/MatchHistoryBox';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true); 
  const [accuracy, setAccuracy] = useState(0);
  const [userStats, setUserStats] = useState(null); 
  const [username, setUsername] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
        setUsername(data.username);
        const computedAccuracy = ((data.points / data.totalRounds) * 100).toFixed(0);
        setAccuracy(isNaN(computedAccuracy) || computedAccuracy === Infinity ? 0 : Math.min(100, computedAccuracy));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [uuid]);

  useEffect(() => {
    if (username) { 
      const fetchUserStats = async () => {
        setLoadingStats(true); 
        try {
          const response = await fetch(`${API.GetStats}/${username}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch data');
          const stats = await response.json();
          setUserStats(stats);
        } catch (error) {
          console.error('Failed to load user stats:', error);
        } finally {
          setLoadingStats(false); 
        }
      };

      fetchUserStats();
    }
  }, [username]);

  if (loading || loadingStats) { 
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <button
        style={{
          padding: '10px',
          backgroundColor: '#2d3436',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        onClick={goback}
      >
        Go back
      </button>
      <div className="profile-container">
        <div className='profile-right-container'>
          <h1>
            Hi I'm{' '}
            <span style={{ color: 'skyblue' }}>{profileData.username}</span>
          </h1>
          <div className="stats-container">
            <div className="stats">
              <h2>Rounds</h2>
              <h2>{profileData.totalRounds}</h2>
            </div>
            <div className="stats">
              <h2>Coins</h2>
              <h2>{profileData.points}</h2>
            </div>
            <div className="stats">
              <h2>Accuracy</h2>
              <h2>{accuracy}%</h2>
            </div>
          </div>
        </div>
        <div className='profile-bottom-left'>
          <h1>Game Statistics</h1>
          <div className="game-stats-grid">
            {userStats.valorant ? (
              <GameStatBox 
                src="https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_FMjpg_UX1000_.jpg"
                roundsPlayed={userStats.valorant.roundsPlayed} 
                accuracy={userStats.valorant.accuracy} 
                correctGuesses={userStats.valorant.correctGuesses}
              />
            ) : null}
            {userStats.league ? (
              <GameStatBox 
                src="https://howlongtobeat.com/games/5203_League_of_Legends.jpg" 
                roundsPlayed={userStats.league.roundsPlayed} 
                accuracy={userStats.league.accuracy} 
                correctGuesses={userStats.league.correctGuesses}
              />
            ) : null}
            {userStats.overwatch ? (
              <GameStatBox 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg"  
                roundsPlayed={userStats.overwatch.roundsPlayed} 
                accuracy={userStats.overwatch.accuracy} 
                correctGuesses={userStats.overwatch.correctGuesses}
              />
            ) : null}
            {userStats.csgo ? (
              <GameStatBox 
                src="https://static.displate.com/270x380/displate/2023-06-12/6e217abc7f5bb5d0dc56e68752193a11_5c51574f5f2f216f9ef25a0d08fa6400.jpg" 
                roundsPlayed={userStats.csgo.roundsPlayed} 
                accuracy={userStats.csgo.accuracy} 
                correctGuesses={userStats.csgo.correctGuesses}
              />
            ) : null}
            {!userStats.valorant && !userStats.league && !userStats.overwatch && !userStats.csgo && (
              <h2 className='stats-h2'>No data available.</h2>
            )}
          </div>
        </div>
      </div>
      <div className="top-right">
        <div className="toggle-container">
          <div className={`toggle-button one ${!isToggled ? 'active' : ''}`} onClick={() => setIsToggled(false)}>Match History</div>
          <div className={`toggle-button two ${isToggled ? 'active' : ''}`} onClick={() => setIsToggled(true)}>Wins</div>
        </div>
        {!isToggled ? (
          <div className="match-box-container" >
            <MatchHistoryBox username={username} toggle={isToggled}/>
          </div>
          ) : 
          <div className="match-box-container" >
            <MatchHistoryBox username={username} toggle={isToggled}/>
          </div>
        }
      </div>
    </>
  );
};



export default Profile;

