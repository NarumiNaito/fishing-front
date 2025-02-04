"use client";
import MainNav from "@/components/ui/Header/navigation/MainNav";
import { publicContent, privateContent, authContent, userContent } from "@/const/headerContent";
import AuthNav from "@/components/ui/Header/navigation/AuthNav";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";

export default function Header() {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

  const NavContent = isLogin ? privateContent : publicContent;
  const NavUser = isLogin ? userContent : authContent;

  return (
    <header className="z-40 bg-primary text-primary-foreground">
      <div className="gap-5 container mx-auto h-20 p-1 flex items-center justify-between">
        <MainNav items={NavContent.mainNav} />
        <AuthNav items={NavUser.mainNav} />
      </div>
    </header>
  );
}
