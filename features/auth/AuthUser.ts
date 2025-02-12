import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { persistor, useAppDispatch } from "@/redux/store/store";
import { setLogin } from "@/redux/users/userSlice";

const LoginSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式が正しくありません" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message: "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
    }),
});

const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
  confirmPassword: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message: "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
    }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "パスワードが一致しません。",
    });
  }
});

type AuthFormProps = {
  type: "login" | "register";
};

export function useAuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { refetchUser } = useUser();
  const isLogin = type === "login";
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  const form = useForm({
    defaultValues: isLogin ? { email: "", password: "" } : { name: "", email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      let response;
      if (isLogin) {
        response = await axios.post("api/login", { email: data.email, password: data.password });
      } else {
        response = await axios.post("api/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }

      const successMessage = (response.data as { message?: string }).message || "ログインに成功しました";
      setIsSuccess(successMessage);
      await refetchUser(); // Redux のユーザー情報を更新
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "エラーが発生しました";
      setIsError(errorMessage);
      console.error(`${isLogin ? "ログイン" : "登録"}エラー:`, error.response?.data?.message || error.message);
    }
  });

  return { form, onSubmit, isError, isSuccess };
}

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
