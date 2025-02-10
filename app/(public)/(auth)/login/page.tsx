"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/hooks/useForm";
import { Button } from "@/components/ui/button";
import AuthVideo from "@/features/auth/AuthVideo";
import { useAuthForm } from "@/features/auth/AuthUser";
import AuthCard from "@/features/auth/AuthCard";
import { AuthToast } from "@/features/auth/AuthToast";
import { useState } from "react";
import { TogglePasswordOfIcon, TogglePasswordOnIcon } from "@/components/ui/togglePasswordIcon";

export default function LoginFormPage() {
  const [password, setPassword] = useState(false);

  const { form, onSubmit, isError, isSuccess } = useAuthForm({ type: "login" });
  const togglePassword = () => {
    setPassword(!password);
  };
  return (
    <>
      <AuthCard>
        <Form {...form}>
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">ログイン</h1>
                <p className="text-muted-foreground">Login to your Acme Inc account</p>
                {isError && <p className="text-red-500">{isError}</p>}
              </div>
              <FormInput control={form.control} name="email" label="メールアドレス" placeholder="メールアドレスを入力してください" />
              <div className="relative">
                <FormInput control={form.control} name="password" type={password ? "text" : "password"} label="パスワード" placeholder="パスワードを入力してください" />
                <div onClick={togglePassword} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                  {password ? <TogglePasswordOnIcon /> : <TogglePasswordOfIcon />}
                </div>
              </div>{" "}
              <div className="flex items-center">
                <a href="#" className="ml-auto text-sm hover:underline">
                  パスワードをお忘れの方はこちら
                </a>
              </div>
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </div>
          </form>
        </Form>
        <AuthVideo />
      </AuthCard>
      <AuthToast isError={isError} isSuccess={isSuccess} />
    </>
  );
}
