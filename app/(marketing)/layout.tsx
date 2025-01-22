// "use client";

// import { Earth } from "@/components/earth/Earth";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import { headerContent } from "@/config/headerContent";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { useState, useEffect } from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {/* {isLoading ? (
        <div>
          <Earth />
        </div>
      ) : ( */}
      <div>
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

        <main>{children}</main>
        <SiteFooter />
      </div>
      {/* )} */}
    </>
  );
}
