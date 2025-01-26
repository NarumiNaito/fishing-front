import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// 例: slice のインポート
// import counterReducer from "./features/counterSlice";

// ストアを作成
export const store = configureStore({
  reducer: {
    // ここに他のスライスを追加
    // counter: counterReducer,
  },
});

// 型定義
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// カスタムフック
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
