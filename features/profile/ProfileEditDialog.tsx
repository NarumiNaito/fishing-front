import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/hooks/useForm";
import { Form } from "@/components/ui/form";
import { ProfileForm } from "./ProfileForm";
import { AuthToast } from "../auth/AuthToast";

export function ProfileEditDialog() {
  const { form, onSubmit, isError, isSuccess } = ProfileForm();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-2 py-1.5 text-sm transition duration-200 hover:text-blue-600" onClick={() => setIsOpen(true)}>
          プロフィール編集
        </button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>プロフィール編集</DialogTitle>
            <DialogDescription>
              ここでプロフィールを変更します。
              <br />
              完了したら保存をクリックしてください。
            </DialogDescription>
          </DialogHeader>
          <FormInput control={form.control} name="name" label="ユーザ名" placeholder="ユーザ名を入力してください" />
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
      <AuthToast isError={isError} isSuccess={isSuccess} />
    </Dialog>
  );
}
