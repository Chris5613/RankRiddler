import React, {  useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import {useDispatch,useSelector} from "react-redux"
import { settingsActions } from '../../store/SettingsSlice';

const Settings = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.settings.userId);
  const data = useSelector((state) => state.settings.data);
  const index = useSelector((state) => state.settings.index);
  const username = useSelector((state) => state.settings.username);
  const isUsernameChanged = useSelector(
    (state) => state.settings.isUsernameChanged
  );


  const score = Cookies.get('score') || 0;

  useEffect(() => {
    if (!userId) {
      const id = uuidv4();
      const shortUuid = id.slice(0, 8);
      Cookies.set('userId', shortUuid, { secure: true });
      dispatch(settingsActions.setUserId(shortUuid));

    }

    const storedUsername = Cookies.get('username') || 'Guest';
    dispatch(settingsActions.setUsername(storedUsername));


    // If the stored username is "Guest", set isUsernameChanged to false
    dispatch(settingsActions.setIsUsernameChanged(storedUsername !== 'Guest'));


    const storedScore = Cookies.get('score') || 0;
    Cookies.set('score', storedScore, { secure: true });
  }, [userId,dispatch]);

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
        dispatch(settingsActions.setData(userData))
        // setData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const saveUser = async (username, score) => {
    try {
      const response = await fetch(
        'https://rr-back-end.onrender.com/saveuser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            points: score,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const foundUser = data.find((user) => user.username === username);
    if (foundUser) {
      dispatch(settingsActions.setIndex(data.indexOf(foundUser)));

    } else {
      dispatch(settingsActions.setIndex(data.indexOf(foundUser)));

    }
  }, [username, data,dispatch]);

  const usernameReset = () => {
    if (isUsernameChanged) {
      return;
    }
    Cookies.remove('username');
    let newUsername = prompt('Please enter a new username');
    const checkUsername = async () => {
      if (newUsername === null || newUsername === '') {
        newUsername = prompt('Please enter a new username');
        checkUsername();
      }
      const newUser = await saveUser(newUsername, score);
      if (newUser.error) {
        newUsername = prompt(newUser.error);
        checkUsername();
      }
      Cookies.set('username', newUsername, { secure: true });
      Cookies.set('isUsernameChanged', true, { secure: true });
      dispatch(settingsActions.setUsername(Cookies.get('username')));
      dispatch(settingsActions.setIsUsernameChanged(true));

    };
    checkUsername();
  };

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
          {isUsernameChanged ? null : (
            <div>
              <p>Must set a username to see your leaderboard rank</p>
              <br />
              <h5>
                Can only be changed
                <span style={{ color: '#e34234' }}>
                  <u>ONCE</u>
                </span>
              </h5>
              <p>
                <span className="reset-text" onClick={usernameReset}>
                  Change
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
