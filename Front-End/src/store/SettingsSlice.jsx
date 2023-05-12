import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

let initialState = {
  userId: localStorage.getItem('userId') || '',
  data: [],
  index: -1,
  username: Cookies.get('username') || 'Guest',
  isUsernameChanged: Cookies.get('isUsernameChanged') === 'true',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setIndex(state, action) {
      state.index = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setIsUsernameChanged(state, action) {
      state.isUsernameChanged = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice;
