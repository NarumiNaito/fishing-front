import MainNav from "@/components/layouts/Header/navigation/MainNav";
import { mainContent } from "@/const/headerContent";
import { authContent } from "@/const/headerContent";
import AuthNav from "@/components/layouts/Header/navigation/AuthNav";

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
