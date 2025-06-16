import { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
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

// Schema validation using Zod
const loginSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Create form instance using react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Process form submission
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("Login successfully");
      // Navigation will be handled in AuthContext after successful login
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card mx-auto w-full max-w-md space-y-6 rounded-lg p-8 px-4 shadow-md sm:p-10 sm:px-0">
      <div className="mx-2 text-center">
        <h1 className="text-foreground text-xl font-bold sm:text-2xl">Login</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Welcome back to HiRise! Please enter your information
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-2 space-y-5 sm:space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
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
                <FormLabel className="text-foreground px-1 font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative mx-0.5">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="border-input bg-background text-foreground h-11 rounded-md px-4 py-2 pr-10 shadow-sm"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute top-0 right-0 h-full px-3"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
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
              to={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground mx-0.5 mt-2 h-11 w-full rounded-md font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mx-2 mt-6 text-center text-sm">
        <span className="text-muted-foreground">You don't have an account? </span>
        <Link to={ROUTES.AUTH.REGISTER} className="text-primary hover:text-primary/80 font-medium">
          Register now
        </Link>
      </div>
    </div>
  );
}
