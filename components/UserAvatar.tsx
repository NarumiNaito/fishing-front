import React from "react";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/store/store";
import { getUserImage } from "@/redux/users/selectors";

export default function UserAvatar() {
  const selector = useAppSelector((state) => state);
  const image = getUserImage(selector);

  return (
    <Avatar>
      <AvatarImage src={image} alt="image" />
      <AvatarFallback>
        <AvatarNoneImage />
      </AvatarFallback>
    </Avatar>
  );
}
