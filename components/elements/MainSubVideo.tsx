"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function SubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play();
    }
  }, []);
  return (
    <>
      <section className="relative pt-10 md:pt-24  lg:py-36 pb-8 md:pb-24">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover z-0" muted autoPlay>
          <source src="/mainVideo.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10  text-center flex flex-col items-center gap-4 bg-black/50 p-4 rounded-md">
          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-5xl lg:text-5xl text-white">Angler Map</h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem] text-white">アングラーのための釣り情報総合サイトです</p>
          <div className="space-x-4">
            <Link href={"/"} className={cn(buttonVariants({ size: "lg" }))}>
              釣果情報はこちら
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
