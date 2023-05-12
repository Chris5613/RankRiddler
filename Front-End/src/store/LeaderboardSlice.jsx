import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  selection: '',
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setSelection(state, action) {
      state.selection = action.payload;
    },
  },
});

export const leaderboardActions = leaderboardSlice.actions;
export default leaderboardSlice;
