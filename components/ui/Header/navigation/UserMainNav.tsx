import { NavItem } from "@/types";
import { ReactNode, useState } from "react";
import UserMobileNav from "./UserMobileNav";
import { useAppSelector } from "@/redux/store/store";
import { getLogin, getUser } from "@/redux/users/selectors";
import Link from "next/link";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function UserMainNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const user = getUser(selector);

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span>{user[0].name}</span>
            {showMobileMenu && <UserMobileNav items={items} onClose={() => setShowMobileMenu(false)} />}
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
