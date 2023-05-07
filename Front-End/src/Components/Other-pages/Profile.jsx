import { useState,useEffect } from "react";
const Profile = () => {

    const [users, setUsers] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(-1);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/allusers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const userData = await response.json();
          setUsers(userData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      // Find the index of the current user in the users array
      const currentUser = users.find(user => user.username === 'currentuser');
      const index = users.indexOf(currentUser);
      setCurrentUserIndex(index);
    }, [users]);

  return (
    <div className='settings-container'>
        <h3>Username is Chris</h3> 
        <br/>
        <h3>Score is 100</h3>
        <br/>
        <h3>Current user rank: {currentUserIndex >= 0 ? currentUserIndex + 1 : '-'}</h3>
    </div>
  )
}

export default Profile