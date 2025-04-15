import { useEffect } from "react";
import { ROUTES } from "@/routes/routes";
import { profileMetadata } from "@/utils/profileMetadata";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = profileMetadata.title;
  }, []);

  const handleCancel = () => {
    const confirmed = window.confirm("Are you sure you want to cancel? All changes will be lost.");
    // If the user confirms, navigate to the profile page
    if (confirmed) {
      navigate(ROUTES.APPLICANT.PROFILE);
    }
  };

  const handleSubmitSuccess = () => {
    toast.success("Information updated successfully!", {
      description: "Your profile information has been updated.",
      className: "bg-green-500 text-white font-bold rounded-xl",
      duration: 3000,
    });
    // Redirect to the profile page after successful submission
    navigate(ROUTES.APPLICANT.PROFILE);
  };

  const handleSubmitError = () => {
    toast.error("Failed to update information. Please try again.", {
      description: "There was an error updating your profile information.",
      className: "bg-red-500 text-white font-bold rounded-xl",
      duration: 5000,
    });
    // Optionally, you can add more error handling logic here
    // For example, you could log the error or show a more detailed message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-2">
          <Pencil className="text-primary h-8 w-8" />
          <h1 className="text-3xl font-bold">Edit profile</h1>
        </div>

        {/* Form */}
        <ProfileEditForm
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitError={handleSubmitError}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
