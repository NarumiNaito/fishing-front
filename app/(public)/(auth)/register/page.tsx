"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/hooks/useForm";
import AuthVideo from "@/features/auth/AuthVideo";
import { useAuthForm } from "@/features/auth/AuthUser";
import AuthCard from "@/features/auth/AuthCard";
import { UseToast } from "@/hooks/useToast";
import { useState } from "react";
import { TogglePasswordOfIcon, TogglePasswordOnIcon } from "@/components/ui/togglePasswordIcon";

export default function Register() {
  const [password, setPassword] = useState(false);

  const { form, onSubmit, isError } = useAuthForm({ type: "register" });
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
                <h1 className="text-2xl font-bold">新規登録</h1>
                <p className="text-muted-foreground">Create an account at Acme Inc</p>
                {isError && <p className="text-red-500">{isError}</p>}
              </div>
              <FormInput control={form.control} name="name" label="ユーザーネーム" placeholder="ユーザーネームを入力してください" />
              <FormInput control={form.control} name="email" label="メールアドレス" placeholder="メールアドレスを入力してください" />

              <div className="relative">
                <FormInput control={form.control} name="password" type={password ? "text" : "password"} label="パスワード" placeholder="パスワードを入力してください" />
                <div onClick={togglePassword} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                  {password ? <TogglePasswordOnIcon /> : <TogglePasswordOfIcon />}
                </div>
              </div>
              <FormInput control={form.control} name="confirmPassword" type={password ? "text" : "password"} label="パスワードを再入力" placeholder="確認のためパスワードを再入力してください" />
              <Button type="submit" className="w-full">
                登録
              </Button>
            </div>
          </form>
        </Form>
        <AuthVideo />
      </AuthCard>
      <UseToast />
    </>
  );
}
