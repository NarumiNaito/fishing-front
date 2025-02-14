import { NavItem } from "@/types";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Link from "next/link";
import { ProfileDialog } from "@/features/profile/ProfileDialog";
import { useLogout } from "@/features/profile/ProfileApi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function UserMainNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const { handleLogout } = useLogout();

  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserAvatar />
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
