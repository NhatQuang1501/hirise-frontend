import { useAuth } from "@/hooks/useAuth";
import ApplicantProfileEditForm from "@/components/profile/ApplicantProfileEditForm";
import { CompanyProfileEditForm } from "@/components/profile/CompanyProfileEditForm";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">Edit Profile</h1>
      {user?.role === "applicant" ? <ApplicantProfileEditForm /> : <CompanyProfileEditForm />}
    </div>
  );
}
