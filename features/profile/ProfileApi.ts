import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { persist, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setLogin } from "@/redux/users/userSlice";
import { getUserId, getUserImage, getUserName } from "@/redux/users/selectors";

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
      await persist.flush();
      await persist.purge();
      sessionStorage.removeItem("persist:user");

      router.push("/login");
    } catch (error: any) {
      dispatch(setLogin(false));
      await persist.flush();
      await persist.purge();
      sessionStorage.removeItem("persist:user");

      throw error;
    }
  };

  return { handleLogout };
}

export function useEdit() {
  const selector = useAppSelector((state) => state);
  const id = getUserId(selector);
  const userName = getUserName(selector);
  const userImage = getUserImage(selector);
  const { refetchUser } = useUser();
  const form = useForm({
    defaultValues: { name: userName || "", image: userImage || null },
    resolver: zodResolver(EditSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("image", data.image);

      await axios.post("api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refetchUser();
    } catch (error) {
      console.error(error);
    }
  });

  return { form, onSubmit, userImage };
}
