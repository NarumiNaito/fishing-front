import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "../users/userSlice";
import createTransform from "redux-persist/es/createTransform";

// storage保存時に `isLogin` だけを残す
const userTransform = createTransform(
  (inboundState: any) => {
    return inboundState?.user ? { isLogin: inboundState.user.isLogin } : {};
  },
  (outboundState: any) => {
    return { user: outboundState ? { isLogin: outboundState.isLogin } : null };
  },
  { whitelist: ["user"] }
);

const persistConfig = {
  key: "user",
  storage: storageSession,
  whitelist: ["user"],
  transforms: [userTransform],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
