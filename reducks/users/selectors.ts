import { createSelector } from "reselect";
const usersSelector = (state: any) => state.user;

export const getLogin = createSelector([usersSelector], (state) => state.isLogin);

export const getUser = createSelector([usersSelector], (state) => state);

// export const getUsername = createSelector([usersSelector], (state) => state.username);

// export const getUserId = createSelector([usersSelector], (state) => state.uid);
