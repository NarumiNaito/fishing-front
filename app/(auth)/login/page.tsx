import AuthVideo from "@/features/auth/AuthVideo";
import AuthCard from "@/features/auth/AuthCard";
import AuthForm from "@/features/auth/AuthForm";

export default function Login() {
  return (
    <>
      <AuthCard>
        <AuthForm />
        <AuthVideo />
      </AuthCard>
    </>
  );
}
