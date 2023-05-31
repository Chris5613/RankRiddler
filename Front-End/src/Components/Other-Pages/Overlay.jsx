import { useDispatch, useSelector } from 'react-redux';
import { settingsActions } from '../store/SettingsSlice';
import API from '../../api';

const Modal = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.settings.username);
  const isUsernameChanged = useSelector(
    (state) => state.settings.isUsernameChanged
  );
  const score = useSelector((state) => state.settings.score);

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

  const usernameSet = () => {
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
      dispatch(settingsActions.setUsername(username));
      dispatch(settingsActions.setIsUsernameChanged(true));
    };
    checkUsername();
  };
  

  return (
    <div className='main-modal'>
      <div className="main-modal-content">
        <h1>Username Setup</h1>
        <h3>Set your username to save your score and be tracked on the leaderboard.</h3>
        <h3>one time setup</h3>
        <button className="submit-btn" onClick={usernameSet}>Set Username</button>
      </div>
    </div>
  );
};

export default Modal;