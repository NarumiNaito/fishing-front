import { NavItem } from "@/types";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store/store";
import { getLogin, getUserName } from "@/redux/users/selectors";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";
import { ProfileDialog } from "@/features/profile/ProfileDialog";
import { useLogout } from "@/features/profile/ProfileUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function UserMainNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const userName = getUserName(selector);
  const { handleLogout } = useLogout();

  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>
                    <AvatarNoneImage />
                  </AvatarFallback>
                </Avatar>
                <span>{userName}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>マイページ</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ProfileDialog />
                <DropdownMenuItem>過去の釣果</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => handleLogout()} className="transition duration-200 hover:text-blue-600">
                  ログアウト
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
