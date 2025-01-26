import MainNav from "@/components/MainNav";
import { mainContent } from "@/config/headerContent";
import { authContent } from "@/config/headerContent";
import AuthNav from "./AuthNav";

export default function Header() {
  return (
    <header className="z-40 bg-primary text-primary-foreground">
      <div className="container mx-auto h-20 p-1 flex items-center justify-between">
        <MainNav items={mainContent.mainNav} />
        <AuthNav items={authContent.mainNav} />
      </div>
    </header>
  );
}
