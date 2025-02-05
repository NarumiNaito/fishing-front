import { axios } from "@/lib/api/Axios";
import { persistor, useAppDispatch } from "@/redux/store/store";
import { setLogin } from "@/redux/users/userSlice";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleLogout = async (onClose?: () => void) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("api/user/logout");
      dispatch(setLogin(false));
      await persistor.flush();
      await persistor.purge();
      sessionStorage.removeItem("persist:user");
      mutate(null, false);
      mutate("/api/user", null, false);
      router.push("/");
      if (onClose) onClose();
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return { handleLogout };
}
