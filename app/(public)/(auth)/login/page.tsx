"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/elements/FormInput";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SubVideo from "@/components/elements/SubVideo";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export default function LoginFormPage({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 lg:grid-cols-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">ログイン</h1>
                  <p className="text-muted-foreground">Login to your Acme Inc account</p>
                </div>
                <FormInput control={form.control} name="email" label="メールアドレス" placeholder="メールアドレスを入力してください" />
                <FormInput control={form.control} name="password" label="パスワード" placeholder="パスワードを入力してください" />
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
          <SubVideo />
        </CardContent>
      </Card>
    </div>
  );
}
