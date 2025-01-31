import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/components/api/Axios";
import { getUser } from "@/reducks/users/actions";
import { updateUser } from "@/reducks/users/reducers";
import { UserType } from "@/types";
import { useAppDispatch } from "@/reducks/store/store";

const FormSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式が正しくありません" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message: "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function useLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<FormSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const requestUser = { email: data.email, password: data.password };

    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("api/v1/login", requestUser);

      const userData: UserType | null = await getUser();
      if (userData) {
        dispatch(updateUser(userData));
      } else {
        console.error("ユーザー情報が取得できませんでした");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  });

  return { form, onSubmit };
}
