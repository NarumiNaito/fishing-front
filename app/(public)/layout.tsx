"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Loading from "../loading";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard"; // 既にあるredirectを取得

  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

  useEffect(() => {
    if (isLogin) {
      router.replace(redirect);
    }
  }, [isLogin, redirect, router]);

  if (isLogin) {
    return <Loading />;
  }

  return <>{children}</>;
}
