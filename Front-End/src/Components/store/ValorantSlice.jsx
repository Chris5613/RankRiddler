import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  selectedRank: null,
  isButtonDisabled: true,
  url: '',
  showModal: false,
  rank: '',
  result: '',
  player: '',
  score: null,
  point: 0,
};

const valorantSlice = createSlice({
  name: 'valorant',
  initialState,
  reducers: {
    setSelectedRank(state, action) {
      state.selectedRank = action.payload;
    },
    setIsButtonDisabled(state, action) {
      state.isButtonDisabled = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    hideShowModal(state) {
      state.showModal = false;
    },
    toggleShowModal(state) {
      state.showModal = !state.showModal;
    },
    setRank(state, action) {
      state.rank = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setScore(state, action) {
      state.score = action.payload;
    },
    setPoint(state, action) {
      state.point = action.payload;
    },
  },
});

export const valorantActions = valorantSlice.actions;
export default valorantSlice;
