// ProfileDialog.js
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/hooks/useForm";
import { Form } from "@/components/ui/form";
import { useEdit } from "@/features/profile/ProfileApi";
import { UseToast } from "@/hooks/useToast";
import useFileInput from "@/hooks/useFileInput";
import { Controller } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";

export function ProfileDialog() {
  const { form, onSubmit, userImage } = useEdit();
  const [isOpen, setIsOpen] = useState(false);

  const { register, control, setValue } = form;

  const inputProps = register("image");

  const { file, imageData, resets, selectFile, contextHolder } = useFileInput(inputProps);

  // file が変更されたらフォームの image フィールドに設定
  useEffect(() => {
    if (file) {
      setValue("image", file);
    }
  }, [file, setValue]);

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

          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <>
                {contextHolder}
                <div>
                  <button onClick={selectFile}>
                    <Avatar>
                      <AvatarImage src={imageData} alt="image" />
                      <AvatarFallback>
                        <AvatarNoneImage />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  <div>
                    <button onClick={resets}>削除</button>
                  </div>
                </div>
              </>
            )}
          />

          <FormInput control={control} name="name" label="ユーザ名" placeholder="ユーザ名を入力してください" />
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
      <UseToast />
    </Dialog>
  );
}
