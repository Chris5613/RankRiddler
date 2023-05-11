import React, { useState, useEffect ,useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const Settings = () => {
  const [userId, setUserId] = useState(
    () => localStorage.getItem('userId') || ''
  );
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  const [username, setUsername] = useState(Cookies.get('username'));

  const [isUsernameChanged, setIsUsernameChanged] = useState(false); // added state variable

  const score = Cookies.get('score') || 0;
  useEffect(() => {
    if (!userId) {
      const id = uuidv4();
      const shortUuid = id.slice(0, 8);
      Cookies.set('userId', shortUuid);
      setUserId(shortUuid);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://rr-back-end.onrender.com/allusers',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const saveUser = async (username, score) => {
    try {
      const response = await fetch('http://localhost:3001/saveuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          points: score,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const foundUser = data.find((user) => user.username === username);
    if (foundUser) {
      setIndex(data.indexOf(foundUser));
    } else {
      setIndex(-1);
    }
  }, [username, data]);

  const usernameReset = () => {
    if (isUsernameChanged) { // don't reset if username has already been changed
      return;
    }
    Cookies.remove('username');
    let newUsername = prompt('Please enter a new username');
    const checkUsername = () => {
      if (newUsername === null) {
        newUsername = prompt('Please enter a new username');
        checkUsername();
      } else if (newUsername === '') {
        newUsername = prompt('Please enter a new username');
        checkUsername();
      } else {
        const sameName = data.find((user) => user.username === newUsername);
        if (sameName) {
          newUsername = prompt(
            'Username already exists, please enter a new username'
          );
          checkUsername();
        }
        Cookies.set('username', newUsername);
        setUsername(newUsername);
        setIsUsernameChanged(true); // set isUsernameChanged to true permanently
        saveUser(newUsername, score);
      }
    };
    checkUsername();
  };

  console.log(isUsernameChanged)

  return (
    <>
      <div className="settings-container">
        <p>
          Current ID:{' '}
          <span>
            <u>{userId}</u>
          </span>
        </p>
        <p>
          Current User: <span>{username}</span>
        </p>
        <p>
          Current Score: <span>{score}</span>
        </p>
        <p>
          Current Rank: <span>#{index === -1 ? 'N/A' : index + 1}</span>
        </p>
        <div className="reset-container">
        {setIsUsernameChanged? null : (
          <div>
            <h5>
              Can only be changed
              <span style={{ color: '#e34234' }}>
                <u>ONCE</u>
              </span>
            </h5>
            <p>
              Want to change your username?
              <span className="reset-text" onClick={usernameReset}>
                here
              </span>
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Settings;
