import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type userState = {
  currentUser: boolean;
  username: string;
};

const initialState: userState = {
  currentUser: false,
  username: "",
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {
      // state.currentUser = action.payload.currentUser;
      // state.username = action.payload.username;
    },
    getUserSure: (state, action) => {
      // console.log(action, "action");
      state.currentUser = action.payload.currentUser;
      state.username = action.payload.username;
    },
  },
});

export const { getCurrentUser, getUserSure } = userSlice.actions;
export const selectUser = (state: RootState) => state.currentUser;
export default userSlice.reducer;
