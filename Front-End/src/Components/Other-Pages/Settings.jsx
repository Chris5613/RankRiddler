import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../store/SettingsSlice';
import API from '../../api';

const Settings = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.settings.userId);
  const data = useSelector((state) => state.settings.data);
  const index = useSelector((state) => state.settings.index);
  const username = useSelector((state) => state.settings.username);

  useEffect(() => {
    const getOneUser = async (uuid) => {
      const response = await fetch(`${API.GetUserByUuid}/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(settingsActions.setUsername(data.username));
    };
    getOneUser(userId);
  }, [userId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API.GetAllUsers, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
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

  useEffect(() => {
    const foundUser = data.find((user) => user.username === username);
    if (foundUser) {
      dispatch(settingsActions.setIndex(data.indexOf(foundUser)));
    } else {
      dispatch(settingsActions.setIndex(data.indexOf(foundUser)));
    }
  }, [username, data, dispatch]);

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
      </div>
    </>
  );
};

export default Settings;
