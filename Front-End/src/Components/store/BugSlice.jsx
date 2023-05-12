import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  title: '',
  description: '',
};

const bugSlice = createSlice({
  name: 'bug',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const bugActions = bugSlice.actions;
export default bugSlice;
