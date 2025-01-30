import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/components/api/Axios";

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "ユーザーネームは2文字以上で入力してください",
    }),
    email: z.string().email({
      message: "メールアドレスの形式が正しくありません",
    }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください" })
      .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
        message: "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください" })
      .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
        message: "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "パスワードが一致しません。",
      });
    }
  });

type FormSchemaType = z.infer<typeof FormSchema>;

export function useRegisterForm() {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const requestUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("localhost/api/v1/register", requestUser);
      router.push("/"); // 登録完了後、トップページに遷移
    } catch (error) {
      console.error("予期しないエラー:", error);
    }
  });

  return { form, onSubmit };
}
