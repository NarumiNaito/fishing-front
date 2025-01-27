import MainNav from "@/features/auth/components/MainNav";
import { mainContent } from "@/features/auth/const/headerContent";
import { authContent } from "@/features/auth/const/headerContent";
import AuthNav from "@/features/auth/components/AuthNav";

export default function Header() {
  return (
    <header className="z-40 bg-primary text-primary-foreground">
      <div className="gap-5 container mx-auto h-20 p-1 flex items-center justify-between">
        <MainNav items={mainContent.mainNav} />
        <AuthNav items={authContent.mainNav} />
      </div>
    </header>
  );
}
