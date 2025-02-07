import { NavItem } from "@/types";
import { ReactNode, useState } from "react";
import UserMobileNav from "./UserMobileNav";
import { useAppSelector } from "@/redux/store/store";
import { getLogin, getUser, getUserName } from "@/redux/users/selectors";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function UserMainNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const userName = getUserName(selector);
  const user = getUser(selector);

  console.log(user);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" alt="" />
              <AvatarFallback>
                <AvatarNoneImage />
              </AvatarFallback>
            </Avatar>
            <span>{userName}</span>
          </button>
          {showMobileMenu && <UserMobileNav items={items} onClose={() => setShowMobileMenu(false)} />}
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
