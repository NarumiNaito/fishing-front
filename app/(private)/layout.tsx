"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reducks/store/store";
import { getLogin } from "@/reducks/users/selectors";
import Loading from "../loading";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const selector = useAppSelector((state) => state);
  // const isLogin = getLogin(selector);
  const isLogin = true;

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  if (!isLogin) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return <>{children}</>;
}
