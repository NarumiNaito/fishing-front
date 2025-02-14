"use client";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/hooks/useForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthApi";
import { useState } from "react";
import { TogglePasswordOfIcon, TogglePasswordOnIcon } from "@/components/togglePasswordIcon";
import { usePathname } from "next/navigation";

export default function AuthForm() {
  const pathname = usePathname();
  const [password, setPassword] = useState(false);
  const { form, onSubmit, isError } = useAuth({ type: pathname });

  const togglePassword = () => {
    setPassword(!password);
  };

  console.log(pathname);

  return (
    <>
      {pathname === "/login" ? (
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
              </div>
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
      ) : (
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
      )}
    </>
  );
}
