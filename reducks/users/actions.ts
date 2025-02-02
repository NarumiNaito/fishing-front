import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "@/components/api/Axios";
import { UserType } from "@/types";
import { RootState } from "@/reducks/store/store";
import { setUser, clearUser } from "@/reducks/users/userSlice";

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
  const user = useSelector((state: RootState) => state.user.user);

  const { data, error, isLoading, mutate } = useSWR("api/v1/user", fetchUser, {
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
