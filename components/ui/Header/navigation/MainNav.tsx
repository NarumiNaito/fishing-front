"use client";
import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MobileNav from "./MobileNav";
import { useAppSelector } from "@/redux/store/store";
import { getLogin, getUserId } from "@/redux/users/selectors";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const id = getUserId(selector);
  const path = isLogin ? `/dashboard/${id}` : "/";

  return (
    <div className="flex items-center gap-5">
      <Link href={path} className="">
        <span className="font-bold">Anglers Map</span>
      </Link>
      <nav className="hidden md:flex gap-5">
        {items?.map((item, index) => (
          <Link key={index} href={item.href} className="text-lg sm:text-sm hover:text-foreground/80">
            {item.title}
          </Link>
        ))}
      </nav>
      <button className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <span>メニュー</span>
        {showMobileMenu && <MobileNav items={items} />}
      </button>
    </div>
  );
}
