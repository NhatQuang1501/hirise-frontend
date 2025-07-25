import { RegisterForm } from "@/components/authentication/RegisterForm";

const RegisterPage = () => {
  const hiriseLogo =
    "https://hirise.sgp1.cdn.digitaloceanspaces.com/media/test_uploads/hiriseLogo.png";

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="mx-auto mb-8 w-full max-w-md">
        <img className="mx-auto h-10 w-auto sm:h-12" src={hiriseLogo} alt="HiRise Logo" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
