import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useAppSelector } from "@/redux/store/store";
import { getUserId, getUserName } from "@/redux/users/selectors";
import { Buffer } from "buffer";

const editSchema = z.object({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
});

export function ProfileForm() {
  const router = useRouter();
  const { refetchUser } = useUser();
  const selector = useAppSelector((state) => state);
  const userId = getUserId(selector);
  const userName = getUserName(selector); // ユーザー名を取得
  const id = Buffer.from(String(userId)).toString("base64");
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { name: userName || "" }, // ✅ ここで userName を設定
    resolver: zodResolver(editSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      let response = await axios.post("api/user/update", { name: data.name });

      const successMessage = (response.data as { message?: string }).message || "プロフィールを更新しました";
      setIsSuccess(successMessage);
      router.push(`/dashboard/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "エラーが発生しました";
      setIsError(errorMessage);
      console.error("編集エラー", error.response?.data?.message || error.message);
    }
  });

  return { form, onSubmit, isError, isSuccess };
}
