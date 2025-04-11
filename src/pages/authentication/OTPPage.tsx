import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Xử lý countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Xử lý input OTP
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Di chuyển đến ô tiếp theo nếu có giá trị
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Xử lý xóa OTP
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Xử lý paste OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });
    setOtp(newOtp);
    if (inputRefs.current[5]) inputRefs.current[5].focus();
  };

  // Xử lý gửi lại OTP
  const handleResendOTP = () => {
    setTimeLeft(60);
    // Thêm logic gửi lại OTP ở đây
    toast.success("OTP has been resent to your email");
  };

  // Xử lý xác thực OTP
  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const otpString = otp.join("");
      if (otpString.length !== 6) {
        throw new Error("Please enter complete OTP");
      }

      // Thêm logic verify OTP ở đây
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Email verified successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            We've sent a verification code to your email
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-2">
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
                className="h-12 w-12 text-center text-lg"
              />
            ))}
          </div>

          <Button
            className="mt-8 w-full"
            disabled={isLoading || otp.some((digit) => !digit)}
            onClick={handleVerifyOTP}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="text-muted-foreground mt-4 text-center text-sm">
            Didn't receive the code?{" "}
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
    </div>
  );
};

export default OTPPage;
