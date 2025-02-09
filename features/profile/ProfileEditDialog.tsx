import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/hooks/useForm";
import { Form } from "@/components/ui/form";
import { ProfileForm } from "./ProfileForm";

export function ProfileEditDialog() {
  const { form, onSubmit } = ProfileForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-2 py-1.5 text-sm transition duration-200 hover:text-blue-600">プロフィール編集</button>
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
            <Button type="submit" onClick={onSubmit}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
