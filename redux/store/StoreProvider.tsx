"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persist } from "@/redux/store/store";

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({ children }: Readonly<StoreProviderProps>) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
