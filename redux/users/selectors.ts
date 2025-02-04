import { createSelector } from "reselect";
import { RootState } from "../store/store";

const usersSelector = (state: RootState) => state.user;
const LoginSelector = (state: any) => state.user;

export const getUser = createSelector([usersSelector], (state) => state.user);
export const getLogin = createSelector([LoginSelector], (state) => state.user.isLogin);
