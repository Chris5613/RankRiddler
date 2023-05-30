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
        console.log(data)
        setProfileData(data);
        setLoading(false);

        // Calculate accuracy
        const accuracy = (data.points / data.totalRounds * 100).toFixed(0)
        setAccuracy(accuracy)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container'>
      <h1>Hi I'm <span style={{color: 'skyblue'}}>{username}</span></h1>
      <div className='stats-container'>
        <p>Games Played: {profileData.totalRounds}</p>
        <p>Points: {profileData.points}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  );
};

export default Profile;
