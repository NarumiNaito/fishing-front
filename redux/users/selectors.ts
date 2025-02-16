import { createSelector } from "reselect";
import { RootState } from "../store/store";

const usersSelector = (state: RootState) => state.user;
const getUserNameSelector = (state: any) => state.user;

export const getUser = createSelector([usersSelector], (state) => state.user);
export const getUserName = createSelector([getUserNameSelector], (state) => (state.user ? state.user[0].name : false));
export const getUserId = createSelector([getUserNameSelector], (state) => (state.user ? state.user[0].id : false));
export const getUserImage = createSelector([getUserNameSelector], (state) => (state.user ? state.user[0].image : false));
export const getLogin = createSelector([usersSelector], (state) => (state.user ? state.user.isLogin : false));
