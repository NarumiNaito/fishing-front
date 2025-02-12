"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

type AuthToastProps = {
  isError?: string | null;
  isSuccess?: string | null;
};

export function AuthToast({ isError, isSuccess }: AuthToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "エラー",
        description: isError,
        duration: 10000,
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "成功",
        description: isSuccess,
        duration: 10000,
        className: "bg-green-500 text-white",
      });
    }
  }, [isSuccess, toast]);

  return null;
}
