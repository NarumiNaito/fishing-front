import { axios } from "@/components/api/Axios";
import { UserType } from "@/types";

export const getUser = async (): Promise<UserType | null> => {
  try {
    await axios.get("sanctum/csrf-cookie"); // CSRFトークン取得
    const response = await axios.get<UserType>("api/v1/user"); // ユーザー情報取得
    return {
      ...response.data,
      isLogin: true,
    };
  } catch (error) {
    console.error("ユーザー情報の取得に失敗:", error);
    return null;
  }
};
