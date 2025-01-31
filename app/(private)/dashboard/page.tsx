"use client";
import MainVideo from "@/components/elements/MainVideo";
import Main from "@/features/home/components/Main";
import { useAppSelector } from "@/reducks/store/store";
import { getUser } from "@/reducks/users/selectors";

export default function MyPage() {
  const selector = useAppSelector((state) => state);
  const users = getUser(selector);
  console.log(users);
  return (
    <>
      <MainVideo />
      <Main />
    </>
  );
}
