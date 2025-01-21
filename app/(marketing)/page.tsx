import { Earth } from "@/components/earth/Earth";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <section className="pt-10 md:pt-24 lg:py-36 pb-8 md:pb-24">
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

      <section id="features" className="bg-teal-100 py-8 md:py-12 lg:py-24 ">
        <div className="text-center space-y-6">
          <h2 className="font-extrabold text-3xl md:text-6xl ">サービスの特徴</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">下記参照</p>
        </div>
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 m-5">
          <div className="bg-background border p-5 rounded-lg">
            <div className="p-5 flex flex-col justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2 16h15v3H2v-3m18.5 0H22v3h-1.5v-3M18 16h1.5v3H18v-3m.85-8.27c.62-.61 1-1.45 1-2.38C19.85 3.5 18.35 2 16.5 2v1.5c1 0 1.85.83 1.85 1.85S17.5 7.2 16.5 7.2v1.5c2.24 0 4 1.83 4 4.07V15H22v-2.24c0-2.22-1.28-4.14-3.15-5.03m-2.82 2.47H14.5c-1 0-1.85-.98-1.85-2s.85-1.75 1.85-1.75v-1.5a3.35 3.35 0 0 0-3.35 3.35a3.35 3.35 0 0 0 3.35 3.35h1.53c1.05 0 1.97.74 1.97 2.05V15h1.5v-1.64c0-1.81-1.6-3.16-3.47-3.16Z"
                />
              </svg>
              <div className="space-y-3">
                <h3 className="font-bold">禁煙</h3>
                <p className="text-sm text-muted-foreground">禁煙を支援</p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="p-5 flex flex-col justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2 16h15v3H2v-3m18.5 0H22v3h-1.5v-3M18 16h1.5v3H18v-3m.85-8.27c.62-.61 1-1.45 1-2.38C19.85 3.5 18.35 2 16.5 2v1.5c1 0 1.85.83 1.85 1.85S17.5 7.2 16.5 7.2v1.5c2.24 0 4 1.83 4 4.07V15H22v-2.24c0-2.22-1.28-4.14-3.15-5.03m-2.82 2.47H14.5c-1 0-1.85-.98-1.85-2s.85-1.75 1.85-1.75v-1.5a3.35 3.35 0 0 0-3.35 3.35a3.35 3.35 0 0 0 3.35 3.35h1.53c1.05 0 1.97.74 1.97 2.05V15h1.5v-1.64c0-1.81-1.6-3.16-3.47-3.16Z"
                />
              </svg>
              <div className="space-y-3">
                <h3 className="font-bold">禁煙</h3>
                <p className="text-sm text-muted-foreground">禁煙を支援</p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="p-5 flex flex-col justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2 16h15v3H2v-3m18.5 0H22v3h-1.5v-3M18 16h1.5v3H18v-3m.85-8.27c.62-.61 1-1.45 1-2.38C19.85 3.5 18.35 2 16.5 2v1.5c1 0 1.85.83 1.85 1.85S17.5 7.2 16.5 7.2v1.5c2.24 0 4 1.83 4 4.07V15H22v-2.24c0-2.22-1.28-4.14-3.15-5.03m-2.82 2.47H14.5c-1 0-1.85-.98-1.85-2s.85-1.75 1.85-1.75v-1.5a3.35 3.35 0 0 0-3.35 3.35a3.35 3.35 0 0 0 3.35 3.35h1.53c1.05 0 1.97.74 1.97 2.05V15h1.5v-1.64c0-1.81-1.6-3.16-3.47-3.16Z"
                />
              </svg>
              <div className="space-y-3">
                <h3 className="font-bold">禁煙</h3>
                <p className="text-sm text-muted-foreground">禁煙を支援</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center ">
          <p>ログイン後に当サイトを使用できます。</p>
        </div>
      </section>
      <section id="contact" className="py-8 md:py-12 lg:py-24">
        <div className="mx-auto text-center space-y-3">
          <h2 className="font-bold text-3xl">コンタクト</h2>
          <p className="text-muted-foreground">DMは下記よりお願いいたします</p>
          <Link href={siteConfig.links.x} className="underline underline-offset-5" target="_blank" rel="noreferrer">
            こちらから
          </Link>
        </div>
      </section>
    </>
  );
}
