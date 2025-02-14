"use client";
import { ReactNode, useEffect } from "react";
import Axios from "axios";
import { useToaster } from "@/components/ui/useToaster";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withCredentials: true,
  withXSRFToken: true,
} as any);

export function AxiosClientProvider({ children }: { children: ReactNode }) {
  const { toast } = useToaster();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          const successMessage = (response.data as { message?: string }).message || "ログインに成功しました";
          toast({
            title: "成功",
            description: successMessage,
            duration: 10000,
            className: "bg-green-500 text-white",
          });
        }
        return response;
      },
      (error) => {
        console.log(error || "エラーが発生だ");

        const errorMessage = error.response?.data?.message || error.message;

        switch (error.response?.status) {
          case 400:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          case 401:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          case 403:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          case 404:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          case 422:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          case 500:
            toast({
              title: "サーバーエラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "エラー",
              description: errorMessage,
              duration: 10000,
              variant: "destructive",
            });
            break;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return <>{children}</>;
}
