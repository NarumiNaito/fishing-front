import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axios } from "@/lib/api/Axios";
import { useUser } from "@/hooks/useUser";
import { useAppSelector } from "@/redux/store/store";
import { getUserId, getUserImage, getUserName } from "@/redux/users/selectors";
import { useState, useRef, InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { FormInput } from "@/hooks/useForm";

// バリデーションスキーマの定義
const EditSchema = z.object({
  name: z.string().min(2, { message: "ユーザーネームは2文字以上で入力してください" }),
  image: z.any().refine((file) => file instanceof File || null, {
    message: "有効な画像ファイルを選択してください",
  }),
});

// useEditフックの定義
function useEdit() {
  const selector = useAppSelector((state) => state);
  const id = getUserId(selector);
  const userName = getUserName(selector);
  const userImage = getUserImage(selector);
  const { refetchUser } = useUser();

  // フォームのセットアップ
  const form = useForm({
    defaultValues: { name: userName || "", image: userImage || null },
    resolver: zodResolver(EditSchema),
  });

  // フォーム送信時の処理
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await axios.get("sanctum/csrf-cookie");

      // 画像ファイルをFormDataに追加
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      if (data.image) {
        formData.append("image", data.image);
      }

      // サーバーにデータを送信
      await axios.post("api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refetchUser();
    } catch (error) {
      console.error("プロフィールの更新に失敗しました:", error);
    }
  });

  return { form, onSubmit };
}

// useFileInputフックの定義
type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: (e: HTMLInputElement | null) => void;
  initialImageData?: string | null;
};

function useFileInput(props: FileInputProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string>(props.initialImageData || "");
  const { ref, type, accept, style, onChange, ...rest } = props;

  const deployment = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFile(file);
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;
    deployment(files);
    if (onChange) onChange(e);
  };

  const _ref = (e: HTMLInputElement | null) => {
    ref(e);
    fileInput.current = e;
  };

  const resets = () => {
    setFile(null);
    setImageData(props.initialImageData || "");
    if (!fileInput.current) return;
    fileInput.current.value = "";
  };

  const trigger = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  const selectFile = () => {
    if (!fileInput.current) return;
    fileInput.current.removeAttribute("capture");
    trigger();
  };

  const selfie = () => {
    if (!fileInput.current) return;
    fileInput.current.setAttribute("capture", "user");
    trigger();
  };

  const contextHolder = <input type={type || "file"} accept={accept || "image/*"} style={{ display: "none", ...style }} onChange={_onChange} ref={_ref} {...rest} />;

  return {
    file,
    imageData,
    resets,
    selectFile,
    selfie,
    contextHolder,
    deployment,
  };
}

// ProfileDialogコンポーネントの定義
export function ProfileDialog() {
  const { form, onSubmit } = useEdit();
  const [isOpen, setIsOpen] = useState(false);

  // useFileInputフックの使用
  const { file, imageData, resets, selectFile, contextHolder } = useFileInput({
    ref: form.register("image").ref,
    initialImageData: form.getValues("image"),
    onChange: (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        form.setValue("image", files[0]);
      }
    },
  });

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
          <div className="mt-4">
            <FormLabel>プロフィール画像</FormLabel>
            <div className="flex items-center space-x-4">
              {imageData && <img src={imageData} alt="プロフィール画像" className="w-16 h-16 rounded-full object-cover" />}
              <Button type="button" onClick={selectFile}>
                画像を選択
              </Button>
              {imageData && (
                <Button type="button" variant="destructive" onClick={resets}>
                  削除
                </Button>
              )}
            </div>
          </div>
          {contextHolder}
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
