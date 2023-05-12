import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  showMenu: false,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showMenu = !state.showMenu;
    },
    hideMenu(state) {
      state.showMenu = false;
    },
  },
});

export const navActions = navSlice.actions;
export default navSlice;
