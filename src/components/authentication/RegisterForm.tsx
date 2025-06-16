import { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const registerSchema = z
  .object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" }),
    email: z.string().email({ message: "Email is not valid" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    role: z.enum(["applicant", "company"], {
      required_error: "Please select a role",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms of service",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password confirmation does not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "applicant",
      acceptTerms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: __, acceptTerms: _, ...registerData } = data;
      await register(registerData);
      toast.success("Register successful! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card mx-auto w-full max-w-md space-y-6 rounded-lg p-8 px-4 shadow-md sm:p-10 sm:px-0">
      <div className="mx-2 text-center">
        <h1 className="text-foreground text-xl font-bold sm:text-2xl">Register</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Welcome to HiRise! Create an account to start using our services
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
                    placeholder="johndoe"
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
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Account Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="applicant" />
                      </FormControl>
                      <FormLabel className="font-normal">Applicant</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="company" />
                      </FormControl>
                      <FormLabel className="font-normal">Company</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2 p-2">
                <FormLabel className="text-foreground px-1 font-medium">Confirm password</FormLabel>
                <FormControl>
                  <div className="relative mx-0.5">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="border-input bg-background text-foreground h-11 rounded-md px-4 py-2 pr-10 shadow-sm"
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
                        <EyeOffIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Hide password" : "Show password"}
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
                    I agree to the{" "}
                    <Link
                      to={ROUTES.PUBLIC.TERMS}
                      className="text-primary hover:text-primary/80 mx-1"
                    >
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to={ROUTES.PUBLIC.PRIVACY}
                      className="text-primary hover:text-primary/80 mx-1"
                    >
                      privacy policy
                    </Link>
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
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="mx-2 mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link to={ROUTES.AUTH.LOGIN} className="text-primary hover:text-primary/80 font-medium">
          Login
        </Link>
      </div>
    </div>
  );
}
