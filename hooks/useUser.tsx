import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, selectUser, clearUser } from "@/redux/users/userSlice";
import { AppDispatch } from "@/redux/store/store";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser("api/user"));
    }
  }, [dispatch, user]);

  return { user, refetchUser: () => dispatch(fetchUser("api/user")), clearUser: () => dispatch(clearUser()) };
};
