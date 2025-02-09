import { NavItem } from "@/types";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store/store";
import { getLogin, getUser, getUserName } from "@/redux/users/selectors";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileEditDialog } from "@/features/profile/ProfileEditDialog";
import { useLogout } from "@/hooks/useLogout";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function UserMainNav({ items }: MainNavProps) {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);
  const userName = getUserName(selector);
  const user = getUser(selector);
  const { handleLogout } = useLogout();

  console.log(user);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-5 ">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>
                    <AvatarNoneImage />
                  </AvatarFallback>
                </Avatar>
                <span>{userName}</span>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-cyan-100">
              <SheetHeader>
                <SheetTitle>マイページ</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-12 items-start">
                <div className="flex flex-col gap-3 items-start transition duration-200 hover:text-blue-600">
                  <ProfileEditDialog />
                </div>
                <div className="gap-3">
                  <button onClick={() => handleLogout()} className="transition duration-200 hover:text-blue-600">
                    ログアウト
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
