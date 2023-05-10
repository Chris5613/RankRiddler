import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const Settings = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
  const [score, setScore] = useState(parseInt(Cookies.get('score')) || 0);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  const [username, setUsername] = useState(Cookies.get('userName') || 'Guest');

  useEffect(() => {
    const getPoints = async () => {
      const response = await fetch(
        'https://rr-back-end.onrender.com/getpoints',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            username: Cookies.get('userName'),
          },
        }
      );
      const data = await response.json();
      setScore(parseInt(Cookies.get('score')) || data.points);
    };
    getPoints();
  }, []);

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

  useEffect(() => {
    const foundUser = data.find(user => user.username === username);
    if (foundUser) {
      setIndex(data.indexOf(foundUser));
    } else {
      setIndex(-1);
    }
  }, [username, data]);

  const usernameReset = () => {
    Cookies.remove('userName');
    let newUsername = prompt('Please enter a new username');
    if (newUsername === null) {
      newUsername = 'Guest';
    }
    Cookies.set('userName', newUsername);
    setUsername(newUsername);
  };

  return (
    <>
      <div className='settings-container'>
        <p>Current ID: <span><u>{userId}</u></span></p>
        <p>Current User: <span>{username}</span></p>
        <p>Current Score: <span>{score}</span></p>
        <p>Current Rank: <span>#{index === -1 ? 'N/A' : index + 1}</span></p>
        <div className='reset-container'>
        <p>Want to change your username?<span className='reset-text' onClick={usernameReset}>here</span></p>
      </div>
      </div>
    </>
  );
};

export default Settings;
