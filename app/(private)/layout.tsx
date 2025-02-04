"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Loading from "../loading";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

  useEffect(() => {
    if (!isLogin) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [isLogin, pathname, router]);

  if (!isLogin) {
    return <Loading />;
  }

  return <>{children}</>;
}
