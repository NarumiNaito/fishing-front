import { createSelector } from "reselect";
import { RootState } from "../store/store";

const usersSelector = (state: RootState) => state.user;

export const getUser = createSelector([usersSelector], (state) => state);
export const getLogin = createSelector([usersSelector], (state) => state.user.isLogin);
