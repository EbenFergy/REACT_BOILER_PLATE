import { configureStore } from "@reduxjs/toolkit";
import { UIReducer } from "../slices/uiSlice";

const store = configureStore({
  reducer: {
    UIReducer: UIReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat();
  },
});

export default store;
