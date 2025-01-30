import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode } from "react";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function AuthNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-5">
      <nav className="flex gap-5">
        {items?.map((item, index) => (
          <Link key={index} href={item.href} className="sm:text-sm hover:text-foreground/80">
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
