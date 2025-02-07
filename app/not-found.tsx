"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error?: {
    message?: string;
  };
}

const NotFoundPage: NextPage<ErrorPageProps> = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error("ページが見つかりませんでした。:", error);
    }
  }, [error]);

  return (
    <>
      <main className="flex width-200% height-100%; flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="text-lg mt-4">{error?.message || "お探しのページが見つかりませんでした。"}</p>
        <Button onClick={() => router.back()} className="mt-6 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-full shadow-lg transition-all">
          戻る
        </Button>
      </main>
    </>
  );
};

export default NotFoundPage;
