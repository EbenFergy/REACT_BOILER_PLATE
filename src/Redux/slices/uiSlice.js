import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const UI = createSlice({
  name: "UI_SLICE",
  initialState,
  reducers: {
    notification(state, action) {},
  },
});

export const UIActions = UI.actions;
export const UIReducer = UI.reducer;
