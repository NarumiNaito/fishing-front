"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Loading from "../loading";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

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
