import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Định nghĩa schema validation
const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Xử lý submit form
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      // Gọi API đăng nhập ở đây
      console.log("Đăng nhập với:", data);
      // await loginUser(data);
      // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card mx-auto w-full max-w-md space-y-6 rounded-lg p-8 px-4 shadow-md sm:p-10 sm:px-0">
      <div className="mx-2 text-center">
        <h1 className="text-foreground text-xl font-bold sm:text-2xl">Đăng nhập</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Chào mừng bạn trở lại! Vui lòng nhập thông tin của bạn
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-2 space-y-5 sm:space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    className="border-input bg-background text-foreground mx-0.5 h-11 rounded-md px-4 py-2 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive px-1 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Mật khẩu</FormLabel>
                <FormControl>
                  <div className="relative mx-0.5">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="border-input bg-background text-foreground h-11 rounded-md px-4 py-2 shadow-sm"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-destructive px-1 text-sm" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end px-1 pt-1">
            <Link
              to="/forgot-password"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground mx-0.5 mt-2 h-11 w-full rounded-md font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Form>

      <div className="mx-2 mt-6 text-center text-sm">
        <span className="text-muted-foreground">Bạn chưa có tài khoản? </span>
        <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
