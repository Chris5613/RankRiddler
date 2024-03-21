import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  userId: localStorage.getItem('userId') || '',
  data: [],
  index: -1,
  username: '',
  isUsernameChanged: localStorage.getItem('isUsernameChanged') === 'true',
  score: 0,
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
    setScore(state, action) {
      state.score = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice;
