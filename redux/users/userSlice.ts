import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types";
import { RootState } from "@/redux/store/store";
import { axios } from "@/lib/api/Axios";

export const fetchUser = createAsyncThunk<UserType | null, string>("users/fetchUser", async (key, { rejectWithValue }) => {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get<UserType>(key);
    return { ...response.data, isLogin: true };
  } catch (error: any) {
    console.error("ユーザー情報の取得に失敗:", error);
    return rejectWithValue(error.response?.data?.message || "ユーザー取得エラー");
  }
});

const initialState: { user: UserType | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.isLogin = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, clearUser, setLogin } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
