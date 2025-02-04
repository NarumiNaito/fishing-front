import { UserType } from "@/types";
import { initialState } from "../store/initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "@/lib/api/Axios";
import { RootState } from "@/redux/store/store";

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
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.user.isLogin = action.payload;
    },
  },
});

export const { setUser, clearUser, setLogin } = userSlice.actions;
export default userSlice.reducer;

// ユーザーデータ取得用関数
const fetchUser = async (key: string): Promise<UserType | null> => {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get<UserType>(key);
    return {
      ...response.data,
      isLogin: true,
    };
  } catch (error) {
    console.error("ユーザー情報の取得に失敗:", error);
    return null;
  }
};

// `useUser` フック（SWR + Redux）
export function useUser() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { data, error, isLoading, mutate } = useSWR("api/user", fetchUser, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onSuccess: (userData) => {
      if (userData) dispatch(setUser(userData));
    },
    onError: () => {
      dispatch(clearUser());
    },
  });

  return {
    user: user ?? data, // Redux の `user` を優先
    isLoading,
    isError: error,
    mutate, // `mutate()` を `useLoginForm` で使用
  };
}
