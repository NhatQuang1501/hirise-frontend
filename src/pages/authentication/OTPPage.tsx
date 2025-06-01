import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Lấy email từ state khi chuyển từ trang register sang
  const email = location.state?.email;
  useEffect(() => {
    if (!email) {
      navigate(ROUTES.AUTH.REGISTER, { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter" && !otp.some((digit) => !digit)) {
      e.preventDefault();
      handleVerifyOTP();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP(email);
      setTimeLeft(60);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to resend OTP");
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const otpString = otp.join("");
      if (otpString.length !== 6) {
        throw new Error("Please enter complete OTP");
      }

      await verifyOTP(email, otpString);
      toast.success("Email verified successfully!");
      navigate(ROUTES.AUTH.LOGIN, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Verification failed");
      // Reset OTP fields on error
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            We have sent a 6-digit verification code to {email}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {otp.map((_, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={otp[index]}
              ref={(el) => el && (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="focus:border-primary focus:ring-primary size-12 rounded-lg border text-center text-xl shadow-sm focus:ring-1"
              pattern="[0-9]*"
            />
          ))}
        </div>

        <Button
          className="mt-8 w-full text-base font-medium"
          disabled={isLoading || otp.some((digit) => !digit)}
          onClick={handleVerifyOTP}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <div className="text-muted-foreground mt-6 text-center text-sm">
          Haven't receive the code?{" "}
          {timeLeft > 0 ? (
            <span>Resend in {timeLeft}s</span>
          ) : (
            <Button variant="link" className="text-primary p-0" onClick={handleResendOTP}>
              Resend OTP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
