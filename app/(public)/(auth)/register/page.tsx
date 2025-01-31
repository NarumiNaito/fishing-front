"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/elements/FormInput";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import MainSubVideo from "@/components/elements/MainSubVideo";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";

export default function RegisterFormPage({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit } = useRegisterForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 lg:grid-cols-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">新規登録</h1>
                  <p className="text-muted-foreground">Create an account at Acme Inc</p>
                </div>
                <FormInput control={form.control} name="name" label="ユーザーネーム" placeholder="ユーザーネームを入力してください" />
                <FormInput control={form.control} name="email" label="メールアドレス" placeholder="メールアドレスを入力してください" />
                <FormInput control={form.control} name="password" label="パスワード" placeholder="パスワードを入力してください" />
                <FormInput control={form.control} name="confirmPassword" label="パスワードを再入力" placeholder="確認のためパスワードを再入力してください" />
                <Button type="submit" className="w-full">
                  登録
                </Button>
              </div>
            </form>
          </Form>
          <MainSubVideo />
        </CardContent>
      </Card>
    </div>
  );
}
