import { UserState } from "@/types";

export const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    status: "",
    isLogin: false,
  },
};
