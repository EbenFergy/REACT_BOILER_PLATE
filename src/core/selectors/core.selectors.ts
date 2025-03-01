import { RootState } from "../../store";

export const selectIsAuthenticated = (state:RootState) => state.coreReducer.isAuthenticated;

export const selectPreviousPage = (state:RootState) => state.coreReducer.previousPage;

export const selectUser = (state:RootState) => state.coreReducer.user;

export const selectSnackBar = (state:RootState) => state.coreReducer.snackbar;