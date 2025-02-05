import { NavItem } from "@/types";
import { ReactNode } from "react";
import { useLogout } from "@/hooks/useLogout";
import { X } from "lucide-react";
import Link from "next/link";

interface MobileNavProps {
  items?: NavItem[];
  children?: ReactNode;
  onClose: () => void;
}

export default function UserMobileNav({ items, onClose }: MobileNavProps) {
  const { handleLogout } = useLogout();
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-72 text-gray-700 bg-cyan-100 shadow-lg p-6 animate-in slide-in-from-right-80 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg">マイページ</h2>
          <button onClick={onClose} className="hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {items?.map((item, index) => (
            <Link key={index} href={item.href} className="text-gray-700 hover:text-blue-600 transition duration-200" onClick={onClose}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="py-3">
          <button onClick={() => handleLogout(onClose)} className="transition duration-200 hover:text-blue-600">
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
