import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import GameStatBox from './GameStatBox';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const username = localStorage.getItem('username')
  const [userStats, setUserStats] = useState(null)
  const { uuid } = useParams();
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API.GetUserByUuid}/` + uuid, {
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
        const accuracy = ((data.points / data.totalRounds) * 100).toFixed(0);
        if (accuracy === Infinity || isNaN(accuracy)) {
          setAccuracy(0);
        } else if (accuracy > 100) {
          setAccuracy(100);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [uuid]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${API.GetStats}/${username}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const stats = await response.json();
        setUserStats(stats);
        console.log(stats)
      } catch (error) {
        console.error('Failed to load user stats:', error);
      }
    };

    fetchUserStats();
  }, [username]);

  if (loading) {
    return (
      <div className="profile-container">
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
          <h1>Game Statistics </h1>
          <div className="game-stats-grid">
            <GameStatBox 
              src="https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_FMjpg_UX1000_.jpg"
              game="Val" 
              roundsPlayed={userStats.valorant.roundsPlayed} 
              accuracy={userStats.valorant.accuracy} 
              correctGuesses={userStats.valorant.correctGuesses}
            />
            <GameStatBox 
              src="https://howlongtobeat.com/games/5203_League_of_Legends.jpg" 
              game="LoL" 
              roundsPlayed={userStats.league.roundsPlayed} 
              accuracy={userStats.league.accuracy} 
              correctGuesses={userStats.league.correctGuesses}
            />
            <GameStatBox 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg" 
              game="OW" 
              roundsPlayed={userStats.overwatch.roundsPlayed} 
              accuracy={userStats.overwatch.accuracy} 
              correctGuesses={userStats.overwatch.correctGuesses}
            />
            <GameStatBox 
              src="https://static.displate.com/270x380/displate/2023-06-12/6e217abc7f5bb5d0dc56e68752193a11_5c51574f5f2f216f9ef25a0d08fa6400.jpg" 
              game="CS2" 
              roundsPlayed={userStats.csgo.roundsPlayed} 
              accuracy={userStats.csgo.accuracy} 
              correctGuesses={userStats.csgo.correctGuesses}
            />
          </div>
        </div>
      </div>
    </>
  );
};



export default Profile;

