import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyEmailCode } from "@/lib/api/email/verify-email-code";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm, Controller } from "react-hook-form";
import {
  CodeOnly,
  codeOnlySchema,
  VerifyCode,
} from "@/schemas/email/verify-code-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircle } from "lucide-react";

type VerificationDialogProps = {
  email: string;
  showVerifyDialog: boolean;
  onVerified: () => void;
  onClose: () => void;
};

const VerificationDialog = ({
  email,
  showVerifyDialog,
  onVerified,
  onClose,
}: VerificationDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CodeOnly>({
    resolver: zodResolver(codeOnlySchema),
  });
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string>("");

  const verifyEmail = async (formData: CodeOnly) => {
    setIsVerifying(true);
    const payload: VerifyCode = {
      ...formData,
      email,
    };

    try {
      const response = await verifyEmailCode(payload);

      if (!response.success) {
        console.error("Verify Code Error:", response.error[0]);
        setVerificationError(response.error);
        return;
      }
      onVerified();
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={showVerifyDialog} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#262626] sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()} //do not close dialog when outside of dialog is clicked
        onEscapeKeyDown={(e) => e.preventDefault()} //do not close dialog when esc is pressed
      >
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription className="font-semibold">
            We have sent to your email ({email}) a verification code. Please use
            that code to verify your order. (Dont Forget to check your Junk
            mail)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(verifyEmail)}>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-start justify-center">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.value}
                    onChange={field.onChange}
                    inputMode="numeric"
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="size-12 text-xl text-center text-white"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.code && (
                <span className="text-xs font-semibold text-[#EA4A78]">
                  {errors.code.message}
                </span>
              )}
              {verificationError && (
                <span className="text-xs font-semibold text-[#EA4A78]">
                  {verificationError}
                </span>
              )}
            </div>

            <Button
              className="w-full max-w-sm font-bold cursor-pointer py-6"
              type="submit"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <LoaderCircle className="size-5 animate-spin font-bold" />
              ) : (
                <span className="text-sm md:text-base font-bold ">Verify</span>
              )}
            </Button>
            {/* todo add resend */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
