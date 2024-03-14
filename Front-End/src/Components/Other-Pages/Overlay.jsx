/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../store/SettingsSlice';
import API from '../../api';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Modal = () => {
  const dispatch = useDispatch();
  const username =
    useSelector((state) => state.settings.username) ||
    localStorage.getItem('username') ||
    'Guest';
  const isUsernameChanged = useSelector(
    (state) => state.settings.isUsernameChanged
  );
  const score = useSelector((state) => state.settings.score);

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
  }, [dispatch, username]);

  useEffect(() => {
    if (username === 'Guest') {
      dispatch(settingsActions.setIsUsernameChanged(true));
    }
    if (username !== 'Guest') {
      dispatch(settingsActions.setIsUsernameChanged(false));
    }
  }, [username, dispatch]);

  const saveUser = async (username, score, uuid) => {
    try {
      const response = await fetch(API.SaveUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          points: score,
          uuid: uuid,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const usernameSet = () => {
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
      localStorage.setItem('username', newUsername);
      dispatch(settingsActions.setUsername(newUsername));
      dispatch(settingsActions.setIsUsernameChanged(false));
    };
    checkUsername();
  };

  return isUsernameChanged ? (
    <div className="main-modal">
      <div className="main-modal-content">
        <h1>Username Setup</h1>
        <h3>
          Set your username to save your score and be tracked on the
          leaderboard.
        </h3>
        <h3>One-time setup</h3>
        <button className="submit-btn" onClick={usernameSet}>
          Set Username
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
