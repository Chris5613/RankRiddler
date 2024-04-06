/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../../store/SettingsSlice';
import API from '../../../api';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Modal = () => {
  const dispatch = useDispatch();
  const username =
    useSelector((state) => state.settings.username) ||
    localStorage.getItem('username') ||
    'Guest';
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  const saveUser = async (username, score, uuid) => {
    try {
      const response = await fetch(API.SaveUser, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, points: score, uuid }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const usernameSet = () => {
    Swal.fire({
      title: 'Create your username',
      input: 'text',
      inputAttributes: { autocapitalize: 'off' },
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: (username) => {
        const trimmedUsername = username.trim().toLowerCase();
        const prohibitedUsernames = ['admin', 'administrator', 'moderator'];
        if (!username) {
          Swal.showValidationMessage(`Please enter a username`);
          return false;
        } else if (prohibitedUsernames.includes(trimmedUsername)) {
          Swal.showValidationMessage(
            `This username is not allowed. Please choose another.`
          );
          return false;
        }

        return saveUser(username, 0, userId).then((result) => {
          if (result && result.error) {
            Swal.showValidationMessage(`Error: ${result.error}`);
            return false;
          }
          return result;
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        localStorage.setItem('username', result.value.username);
        dispatch(settingsActions.setUsername(result.value.username));
        Swal.fire({ title: `Username set successfully`, icon: 'success' });
      }
    });
  };

  useEffect(() => {
    if (username === 'Guest' || !username) {
      usernameSet();
    }
  }, [username]);

  return null;
};

export default Modal;
