import MainVideo from "@/components/ui/MainVideo";
import Main from "@/features/home/components/Main";
import { useAppSelector } from "@/redux/store/store";
import { getUser } from "@/redux/users/selectors";

export default function MyPage() {
  // const selector = useAppSelector((state) => state);
  // const users = getUser(selector);
  // console.log(users);
  return (
    <>
      <MainVideo />
      <Main />
    </>
  );
}
