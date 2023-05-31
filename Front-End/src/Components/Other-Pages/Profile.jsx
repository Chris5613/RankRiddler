import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';

const Profile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accuracy , setAccuracy] = useState(0)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {

        const response = await fetch(
          API.GetUserProfile + username,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'username': username
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
        setLoading(false);

        const accuracy = (data.points / data.totalRounds * 100)
        if(accuracy === Infinity){
          setAccuracy(0)
        }else{
          setAccuracy(accuracy)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='profile-container'>
      <h1>Hi I'm <span style={{color: 'skyblue'}}>{username}</span></h1>
      <div className='stats-container'>
        <div className='stats'>
          <h2>Rounds</h2>
          <h2>{profileData.totalRounds}</h2>
        </div>
        <div className='stats'>
          <h2>Points</h2>
          <h2>{profileData.points}</h2>
        </div>
        <div className='stats'>
          <h2>Accuracy</h2>
          <h2>{accuracy}%</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
