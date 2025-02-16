import { UserState } from "@/types";

export const initialState: UserState = {
  user: {
    id: "",
    name: "",
    image: "",
    email: "",
    password: "",
    status: "",
    isLogin: false,
  },
};
