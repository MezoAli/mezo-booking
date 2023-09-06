import { User } from "@/types/userType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    name: "",
    email: "",
    password: "",
    avatar: {
      public_id: "",
      url: "",
    },
    role: "admin" || "user",
    resetPasswordExpire: "",
  } as User | undefined | {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = {};
    },
  },
});

export const { getUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
