import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { persistor, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setLogin } from "@/redux/users/userSlice";
import { getUserId, getUserName } from "@/redux/users/selectors";

const EditSchema = z.object({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
});

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("api/user/logout");
      dispatch(setLogin(false));
      await persistor.flush();
      await persistor.purge();
      sessionStorage.removeItem("persist:user");
      router.push("/login");
    } catch (error: any) {
      if ((error as any).isAxiosError) {
        if (error.response?.status === 401) {
          console.warn("401エラー: 未認証のためリダイレクト");
          dispatch(setLogin(false));
          router.push("/login");
        } else {
          console.error("ログアウトに失敗しました", error);
        }
      } else {
        console.error("ログアウト中に予期しないエラーが発生しました", error);
      }
    }
  };

  return { handleLogout };
}

export function useEdit() {
  const selector = useAppSelector((state) => state);
  const id = getUserId(selector);
  const userName = getUserName(selector);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);
  const { refetchUser } = useUser();
  const form = useForm({
    defaultValues: { name: userName || "" },
    resolver: zodResolver(EditSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      let response = await axios.post("api/user/update", { name: data.name, id: id });

      const successMessage = (response.data as { message?: string }).message || "プロフィールを更新しました";
      setIsSuccess(successMessage);
      await refetchUser();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "エラーが発生しました";
      setIsError(errorMessage);
      console.error("編集エラー", error.response?.data?.message || error.message);
    }
  });

  return { form, onSubmit, isError, isSuccess };
}
