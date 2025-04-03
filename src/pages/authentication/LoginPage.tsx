import { LoginForm } from "@/components/authentication/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="mx-auto mb-8 w-full max-w-md">
        <img className="mx-auto h-10 w-auto sm:h-12" src="/logo.svg" alt="HiRise Logo" />
        <h2 className="text-foreground mt-4 text-center text-2xl font-bold tracking-tight sm:mt-6 sm:text-3xl">
          Đăng ký/Đăng nhập tài khoản
        </h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
