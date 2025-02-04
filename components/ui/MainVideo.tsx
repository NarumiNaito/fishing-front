"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store/store";
import { getLogin } from "@/redux/users/selectors";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function IndexPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const selector = useAppSelector((state) => state);
  const isLogin = getLogin(selector);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play();
    }
  }, []);
  return (
    <>
      <section className="relative pt-10 md:pt-24 lg:py-36 pb-8 md:pb-24">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover z-0" muted autoPlay>
          <source src="/mainVideo.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center flex flex-col items-center gap-4 bg-black/50 p-4 rounded-md">
          <h1 className="font-extrabold text-3xl sm:text-6xl md:text-6xl lg:text-7xl text-white">Angler Map</h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem] text-white">アングラーのための釣り情報総合サイトです</p>
          {!isLogin && (
            <div className="space-x-4">
              <Link href={"/register"} className={cn(buttonVariants({ size: "lg" }))}>
                始める
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
