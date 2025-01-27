"use client";
import { NavItem } from "@/features/auth/hooks";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MobileNav from "./MobileNav";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-5">
      <Link href={"/"} className="">
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
