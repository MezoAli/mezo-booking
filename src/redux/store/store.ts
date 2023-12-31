import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../slices/roomsSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
