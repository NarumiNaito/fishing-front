import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/redux/users/userSlice";

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

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { mutate } = useUser();
  const isLogin = type === "login";

  const form = useForm({
    defaultValues: isLogin ? { email: "", password: "" } : { name: "", email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      if (isLogin) {
        await axios.post("api/login", { email: data.email, password: data.password });
      } else {
        await axios.post("api/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }

      mutate();
      router.push("/dashboard");
    } catch (error: any) {
      console.error(`${isLogin ? "ログイン" : "登録"}エラー:`, error.response?.data?.message || error.message);
    }
  });

  return { form, onSubmit };
}
