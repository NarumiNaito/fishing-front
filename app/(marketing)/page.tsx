import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="text-center flex flex-col items-center gap-4 ">
          <h1 className="font-extrabold text-3xl sm:text-6xl md:text-6xl lg:text-7xl">禁煙王</h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">禁煙に苦しむ喫煙者のために作ったものです</p>
          <div className="space-x-4">
            <Link href={"/login"} className={cn(buttonVariants({ size: "lg" }))}>
              始める
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="py-8 md:py-12 lg:py-24 ">
        <div className="text-center space-y-6">
          <h2 className="font-extrabold text-3xl md:text-6xl ">サービスの特徴</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">モダンなアプリ</p>
        </div>
        <div></div>
      </section>
    </>
  );
}
