"use client";
import { ContentConfig } from "@/types/index";

export const publicContent: ContentConfig = {
  mainNav: [
    {
      title: "ホーム",
      href: "/",
    },
    {
      title: "釣果情報",
      href: "/results",
    },
  ],
};

export const privateContent: ContentConfig = {
  mainNav: [
    {
      title: "ホーム",
      href: "/dashboard",
    },
    {
      title: "釣果情報",
      href: "/results",
    },
    {
      title: "マップ",
      href: "/map",
    },
  ],
};

export const authContent: ContentConfig = {
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

export const userContent: ContentConfig = {
  mainNav: [
    {
      title: "プロフィール編集",
      href: "/profile",
    },
    {
      title: "自己紹介",
      href: "/introduction",
    },
  ],
};
