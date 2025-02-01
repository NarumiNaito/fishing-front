"use client";
import MainNav from "@/components/layouts/Header/navigation/MainNav";
import { publicContent, privateContent, authContent, userContent } from "@/const/headerContent";
import AuthNav from "@/components/layouts/Header/navigation/AuthNav";
import { useAppSelector } from "@/reducks/store/store";
import { getLogin } from "@/reducks/users/selectors";

export default function Header() {
  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

  return (
    <header className="z-40 bg-primary text-primary-foreground">
      <div className="gap-5 container mx-auto h-20 p-1 flex items-center justify-between">
        {isLogin ? (
          <>
            <MainNav items={privateContent.mainNav} />
            <AuthNav items={userContent.mainNav} />
          </>
        ) : (
          <>
            <MainNav items={publicContent.mainNav} />
            <AuthNav items={authContent.mainNav} />
          </>
        )}
      </div>
    </header>
  );
}
