import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../store/SettingsSlice';
import Cookies from 'js-cookie';
import API from '../../api';

const Settings = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.settings.userId);
  const data = useSelector((state) => state.settings.data);
  const index = useSelector((state) => state.settings.index);
  const username = useSelector((state) => state.settings.username);
  const isUsernameChanged = useSelector(
    (state) => state.settings.isUsernameChanged
  );
  const score = useSelector((state) => state.settings.score);

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(
        `${API.GetUserByUuid}/${uuid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      dispatch(settingsActions.setUsername(data.username));
      dispatch(settingsActions.setScore(data.points));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      const id = uuidv4();
      const shortUuid = id.slice(0, 8);
      localStorage.setItem('userId', shortUuid);
      dispatch(settingsActions.setUserId(shortUuid));
    } else {
      dispatch(settingsActions.setUserId(storedUserId));
    }

    if (username === undefined) {
      dispatch(settingsActions.setIsUsernameChanged(false));
    }
  }, [dispatch, username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          API.GetAllUsers,
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
        dispatch(settingsActions.setData(userData));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const saveUser = async (username, score, uuid) => {
    try {
      const response = await fetch(
        API.SaveUser,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            points: score,
            uuid: uuid,
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
  }, [username, data, dispatch]);

  const usernameReset = () => {
    if (isUsernameChanged) {
      return;
    }
    let newUsername = prompt('Please enter a new username');
    const checkUsername = async () => {
      if (newUsername === null || newUsername === '') {
        newUsername = prompt('Please enter a new username');
        checkUsername();
      }
      const id = localStorage.getItem('userId');
      const newUser = await saveUser(newUsername, score, id);
      if (newUser.error) {
        newUsername = prompt(newUser.error);
        checkUsername();
      }
      Cookies.set('isUsernameChanged', true, { secure: true });
      dispatch(settingsActions.setUsername(username));
      dispatch(settingsActions.setIsUsernameChanged(true));
    };
    checkUsername();
  };

  return (
    <>
      <div className="settings-container">
        <h1 style={{ marginBottom: '20px' }}>Settings</h1>
        <p>
          ID:
          <span>
            <u>{userId}</u>
          </span>
        </p>
        <p>
          User:
          {username ? <span>{username}</span> : <span>Guest</span>}
        </p>
        <p> Rank: #{index === -1 ? 'N/A' : index + 1}</p>
        <div className="reset-container">
          {isUsernameChanged ? (
            <p>Refresh to see changes</p>
          ) : (
            <div className="setting-bottom">
              <p>
                Must set a username to see your leaderboard rank and earn points
              </p>
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
