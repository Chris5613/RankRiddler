import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  game: '',
};

const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },
  },
});

export const submitActions = submitSlice.actions;
export default submitSlice;
