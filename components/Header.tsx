import MainNav from "@/components/MainNav";
import { headerContent } from "@/config/headerContent";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-40 bg-teal-400">
      <div className="container mx-auto h-20 py-6 flex items-center justify-between">
        <MainNav items={headerContent.mainNav} />
        <nav>
          <Link href={"/login"} className={cn({ buttonVariants: "secondary", size: "sm" }, "px-4")}>
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
}
