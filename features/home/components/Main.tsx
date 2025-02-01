import { siteConfig } from "@/const/siteConfig";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <section className="bg-cyan-100 py-8 md:py-12 lg:py-24 ">
        <div className="space-y-6 px-12">
          <h2 className="font-extrabold text-2xl md:text-5xl ">調査速報</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">魚、場所、状況、これらの釣り情報は釣果につまっている！釣りの参考にしよう！</p>
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
      </section>
      <section className="py-8 md:py-12 lg:py-24">
        <div className="mx-auto text-center space-y-3"></div>
      </section>
    </>
  );
}
