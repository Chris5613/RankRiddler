import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data based on the username
        const response = await fetch(
          'http://localhost:3001/user/' + username,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
      {profileData && (
        <>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Add more profile details */}
        </>
      )}
    </div>
  );
};

export default Profile;
