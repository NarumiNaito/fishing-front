import React from "react";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/store/store";
import { getUserName } from "@/redux/users/selectors";

export default function UserAvatar() {
  const selector = useAppSelector((state) => state);
  const userName = getUserName(selector);
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Avatar>
        <AvatarImage src="" alt="" />
        <AvatarFallback>
          <AvatarNoneImage />
        </AvatarFallback>
      </Avatar>
      <span>{userName}</span>
    </div>
  );
}
