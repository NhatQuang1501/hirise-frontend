import { useEffect, useState } from "react";
import { profileService } from "@/services/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const applicantProfileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional(),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .optional(),
  dateOfBirth: z.string().optional(), // Thêm trường dateOfBirth
  gender: z.enum(["male", "female", "other"]),
  description: z.string().optional(),
  cv: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof applicantProfileFormSchema>;

const ApplicantProfileEditForm = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(applicantProfileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "", // Thêm giá trị mặc định
      gender: "male",
      description: "",
    },
  });

  // Load profile data khi component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await profileService.getMyProfile(user?.id, user?.role);

        // Định dạng ngày từ API (nếu có) sang định dạng YYYY-MM-DD cho input
        let formattedDate = "";
        if (data.profile?.date_of_birth) {
          formattedDate = new Date(data.profile.date_of_birth).toISOString().split("T")[0];
        }

        // Cập nhật form với dữ liệu từ API
        form.reset({
          fullName: data.profile?.full_name || "",
          email: data.email,
          phoneNumber: data.profile?.phone_number || "",
          dateOfBirth: formattedDate, // Thêm giá trị date_of_birth
          gender: data.profile?.gender || "male",
          description: data.profile?.description || "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      loadProfile();
    }
  }, [user?.id, user?.role, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      await profileService.updateProfile(user?.id, user?.role, {
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        date_of_birth: data.dateOfBirth || null,
        gender: data.gender,
        description: data.description,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 px-4 py-8"
      >
        {/* Personal Information Section */}
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-2.5">
            <User className="text-primary size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-muted-foreground text-sm">Your basic profile information</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                  <p className="text-muted-foreground text-[0.8rem]">Email cannot be changed</p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="0123456789" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thêm trường Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} placeholder="Select your date of birth" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description Section */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About You</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about yourself, your skills, experience and career goals"
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CV Upload Section */}
        {/* Phần này có thể thêm sau khi làm chức năng upload CV */}

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplicantProfileEditForm;
