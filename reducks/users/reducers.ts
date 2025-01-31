// import * as Actions from "./actions";
import { UserType } from "@/types";
import { initialState } from "../store/initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserType>) {
      state.users = { ...state.users, ...action.payload };
      state.users.isSignedIn = true;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
