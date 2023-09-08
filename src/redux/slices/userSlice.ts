import { User } from "@/types/userType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} || undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload.user;
    },
    removeUser(state) {
      state.user = {};
    },
  },
});

export const { getUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
