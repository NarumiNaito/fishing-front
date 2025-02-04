import { axios } from "@/lib/api/Axios";
import { persistor, useAppDispatch } from "@/redux/store/store";
import { setLogin } from "@/redux/users/userSlice";
import { NavItem } from "@/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSWRConfig } from "swr";

interface MobileNavProps {
  items?: NavItem[];
  children?: ReactNode;
}
export default function MobileNav({ items }: MobileNavProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  useLockBodyScroll();
  const handleLogout = async () => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("api/user/logout");
      dispatch(setLogin(false));
      await persistor.flush();
      await persistor.purge();
      sessionStorage.removeItem("persist:user");
      mutate(null, false);
      mutate("/api/user", null, false);
      router.push("/");
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-50 p-6 shadow-md animate-in slide-in-from-bottom-80">
      <div className="grid gap-5 bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="text-sm flex gap-5">
          {items?.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.title}
            </Link>
          ))}
          <button onClick={handleLogout}>ログアウト</button>
        </nav>
      </div>
    </div>
  );
}
