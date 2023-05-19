import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  matchFound: false,
  connected: false,
  countFinished: false,
  showPopup: false,
  rank: '',
  url: '',
  user: '',
  enemy: '',
  userId: localStorage.getItem('userId'),
};

const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setMatchFound(state, action) {
      state.matchFound = action.payload;
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
    setCountFinished(state, action) {
      state.countFinished = action.payload;
    },
    setShowPopup(state, action) {
      state.showPopup = action.payload;
    },
    setRank(state, action) {
      state.rank = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setEnemy(state, action) {
      state.enemy = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const MultiplayerActions = multiplayerSlice.actions;
export default multiplayerSlice;
