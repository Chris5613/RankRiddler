import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  userHearts: 5,
  opponentHearts: 5,
  opponent: '',
  loading: true,
  username: ''
};

const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState,
  reducers: {
    setUserHearts(state, action) {
      state.userHearts = action.payload;
    },
    setOpponentHearts(state, action) {
      state.opponentHearts = action.payload;
    },
    setOpponent(state, action) {
      state.opponent = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    }
  },
});

export const multiplayerActions = multiplayerSlice.actions;
export default multiplayerSlice;
