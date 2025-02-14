"use client";
import { footerContent } from "@/const/footerContent";
import Link from "next/link";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";

export default function Footer() {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const path = isLogin ? "/dashboard" : "/";
  return (
    <footer className="mx-auto py-10 bg-primary text-primary-foreground">
      <div className="text-center space-x-5">
        {footerContent.mainNav?.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="text-center space-x-5">
        <Link href={path} className="">
          <span className="font-bold">Anglers Map</span>
        </Link>
      </div>
    </footer>
  );
}
