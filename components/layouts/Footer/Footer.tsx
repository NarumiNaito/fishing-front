import { footerContent } from "@/const/footerContent";
import Link from "next/link";
import { useAppSelector } from "@/reducks/store/store";
import { getLogin } from "@/reducks/users/selectors";

export default function Footer() {
  // const selector = useAppSelector((state) => state);
  // const isLogin = getLogin(selector);
  return (
    <footer className="mx-auto py-10 bg-primary text-primary-foreground">
      <div className="text-center space-x-5">
        {footerContent.mainNav?.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="text-center space-x-5">
        {/* {isLogin ? (
          <Link href={"/"} className="">
            <span className="font-bold">Anglers Map</span>
          </Link>
        ) : (
          <Link href={"/dashboard"} className="">
            <span className="font-bold">Anglers Map</span>
          </Link>
        )} */}
        <Link href={"/"} className="">
          <span className="font-bold">Anglers Map</span>
        </Link>
      </div>
    </footer>
  );
}
