import { HeaderContentConfig } from "@/types";

export const mainContent: HeaderContentConfig = {
  mainNav: [
    {
      title: "ホーム",
      href: "/",
    },
    {
      title: "釣果情報",
      href: "/results",
    },
    {
      title: "タックルランキング",
      href: "/gear",
    },
    // {
    //   title: "マップ",
    //   href: "/map",
    // },
  ],
};

export const authContent: HeaderContentConfig = {
  mainNav: [
    {
      title: "新規登録",
      href: "/register",
    },
    {
      title: "ログイン",
      href: "/login",
    },
  ],
};
