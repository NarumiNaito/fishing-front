import { HeaderContentConfig } from "@/types";

export const mainContent: HeaderContentConfig = {
  mainNav: [
    {
      title: "サービスの特徴",
      href: "#features",
    },
    {
      title: "ステータス",
      href: "/blog",
    },
    {
      title: "仲間",
      href: "/pricing",
    },
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
