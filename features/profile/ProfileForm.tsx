import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useAppSelector } from "@/redux/store/store";
import { getUserId, getUserName } from "@/redux/users/selectors";

const editSchema = z.object({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
});

export function ProfileForm() {
  const selector = useAppSelector((state) => state);
  const id = getUserId(selector);
  const userName = getUserName(selector);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);
  const { refetchUser } = useUser();
  const form = useForm({
    defaultValues: { name: userName || "" },
    resolver: zodResolver(editSchema),
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
