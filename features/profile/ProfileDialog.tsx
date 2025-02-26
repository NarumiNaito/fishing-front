import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/hooks/useForm";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/redux/store/store";
import { getUserId, getUserImage, getUserName } from "@/redux/users/selectors";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import useFileInput from "@/hooks/useFileInput";
import { Avatar, AvatarFallback, AvatarImage, AvatarNoneImage } from "@/components/ui/avatar";
import { axios } from "@/lib/api/Axios";
import { UseToast } from "@/hooks/useToast";

const EditSchema = z.object({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
  image: z.any().optional(),
});

interface FormData {
  name: string;
  image: File | null;
}

export function ProfileDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const selector = useAppSelector((state) => state);
  const id = getUserId(selector);
  const userName = getUserName(selector);
  const image = getUserImage(selector);
  const { refetchUser } = useUser();

  const form = useForm<FormData>({
    defaultValues: { name: userName || "", image: image || null },
    resolver: zodResolver(EditSchema),
  });

  const { register, control } = form;

  const inputProps = register("image");

  const { file, imageData, resets, selectFile, contextHolder } = useFileInput(inputProps);

  const onSubmit = form.handleSubmit(async (data) => {
    setIsOpen(false);
    try {
      await axios.get("sanctum/csrf-cookie");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("image", file);

      console.log(formData);

      await axios.post("api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refetchUser();
    } catch (error) {
      console.error(error);
    }
  });

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
                  <button type="button" onClick={selectFile}>
                    <Avatar>
                      <AvatarImage src={imageData} alt="image" />
                      <AvatarFallback>
                        <AvatarNoneImage />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  {file && (
                    <div>
                      <button type="button" onClick={resets}>
                        削除
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          />

          <img src={image} alt="userIcon" />

          <FormInput control={control} name="name" label="ユーザ名" placeholder="ユーザ名を入力してください" />
          <DialogFooter>
            <Button type="submit" onClick={() => onSubmit()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
      <UseToast />
    </Dialog>
  );
}
