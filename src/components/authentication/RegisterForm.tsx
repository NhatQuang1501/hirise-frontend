import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản dịch vụ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Xử lý submit form
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // Gọi API đăng ký ở đây
      console.log("Đăng ký với:", data);
      // await registerUser(data);
      // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card mx-auto w-full max-w-md space-y-6 rounded-lg p-8 px-4 shadow-md sm:p-10 sm:px-0">
      <div className="mx-2 text-center">
        <h1 className="text-foreground text-xl font-bold sm:text-2xl">Đăng ký tài khoản</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Tạo tài khoản để bắt đầu sử dụng dịch vụ của chúng tôi
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-2 space-y-5 sm:space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Họ và tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nguyễn Văn A"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">
                  Xác nhận mật khẩu
                </FormLabel>
                <FormControl>
                  <div className="relative mx-0.5">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="border-input bg-background text-foreground h-11 rounded-md px-4 py-2 shadow-sm"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-destructive px-1 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="mx-0.5 mt-3 flex flex-row items-start space-y-0 space-x-3 rounded-md p-2 px-1 py-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <div className="text-foreground flex flex-wrap text-sm">
                    Tôi đồng ý với{" "}
                    <Link to="/terms" className="text-primary hover:text-primary/80 mx-1">
                      điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 mx-1">
                      chính sách bảo mật
                    </Link>
                    .
                  </div>
                  <FormMessage className="text-destructive text-sm" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground mx-0.5 mt-3 h-11 w-full rounded-md font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </form>
      </Form>

      <div className="mx-2 mt-6 text-center text-sm">
        <span className="text-muted-foreground">Bạn đã có tài khoản? </span>
        <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
