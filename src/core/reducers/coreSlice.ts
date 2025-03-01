import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoreStateType, User } from '../types/core.state.types';

const initialState: CoreStateType = {
  previousPage: '/',
  isAuthenticated: undefined,
  user: undefined,
  snackbar: undefined,
};

const coreSlice = createSlice({
  name: 'CORE_SLICE',
  initialState,
  reducers: {
    setPreviousPage: (state, action: PayloadAction<string>) => {
      state.previousPage = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<{ type: 'error' | 'success'; message: string } | undefined>) => {
      state.snackbar = action.payload;
    },
  },
});

export const { setPreviousPage, setIsAuthenticated, setUser, setSnackbar } = coreSlice.actions;
export const coreReducer = coreSlice.reducer;
