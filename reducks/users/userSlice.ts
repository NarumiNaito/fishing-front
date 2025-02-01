import { UserType, UserState } from "@/types";
import { initialState } from "../store/initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state: any, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
    },
    clearUser(state: any) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
