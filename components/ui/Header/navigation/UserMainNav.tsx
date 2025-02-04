import { NavItem } from "@/types";
import { ReactNode, useState } from "react";
import UserMobileNav from "./UserMobileNav";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Link from "next/link";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function AuthNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span>ユーザー</span>
            {showMobileMenu && <UserMobileNav items={items} />}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <nav className="flex gap-5">
            {items?.map((item, index) => (
              <Link key={index} href={item.href} className="sm:text-sm hover:text-foreground/80">
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
