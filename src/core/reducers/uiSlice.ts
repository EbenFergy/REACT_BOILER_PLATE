import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIInitialStateType } from '../types/core.state.types';

const uIInitialState: UIInitialStateType = {
  scrollIcon: false,
  openMenu: false,
  hasNavbar: true,
  hasFooter: true,
  navFixed: false,
  navbarColor: undefined,
};

const uiSlice = createSlice({
  name: 'UI_SLICE',
  initialState: uIInitialState,
  reducers: {
    setScrollIcon: (state, action) => {
      state.scrollIcon = action.payload;
    },
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
    },
    setHasNavbar: (state, action: PayloadAction<boolean>) => {
      state.hasNavbar = action.payload;
    },
    setHasFooter: (state, action: PayloadAction<boolean>) => {
      state.hasFooter = action.payload;
    },
    setNavFixed: (state, action: PayloadAction<boolean>) => {
      state.navFixed = action.payload;
    },
    setNavbarColor: (state, action: PayloadAction<string | undefined>) => {
      state.navbarColor = action.payload;
    },
  },
});

export const { setScrollIcon, setOpenMenu, setHasFooter, setHasNavbar, setNavFixed, setNavbarColor } = uiSlice.actions;
export const uIReducer = uiSlice.reducer;
