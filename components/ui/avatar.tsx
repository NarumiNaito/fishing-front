"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarNoneImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
    <mask id="ipSPeople0">
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinecap="round" // キャメルケースに修正
        strokeLinejoin="round" // キャメルケースに修正
        strokeWidth="4" // キャメルケースに修正
        d="M24 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14ZM6 40.8V42h36v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C35.92 28 33.68 28 29.2 28H18.8c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8Z"
      />
    </mask>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPeople0)" />
  </svg>
);

export { Avatar, AvatarImage, AvatarFallback, AvatarNoneImage };
