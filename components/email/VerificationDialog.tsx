import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyEmailCode } from "@/lib/api/verify-email-code";
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
  showDialog: boolean;
  onVerified: () => void;
  onClose: () => void;
};

const VerificationDialog = ({
  email,
  showDialog,
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

  const verifyEmail = async (formData: CodeOnly) => {
    setIsVerifying(true);
    const payload: VerifyCode = {
      ...formData,
      email,
    };

    try {
      const response = await verifyEmailCode(payload);

      if (!response.success) {
        console.error("Verify Code Error:", response.error);
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
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#131313]"
        onInteractOutside={(e) => e.preventDefault()} //do not close dialog when outside of dialog is clicked
        onEscapeKeyDown={(e) => e.preventDefault()} //do not close dialog when esc is pressed
      >
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription>
            We have sent to your email ({email}) a verification code. Please use
            that code to verify your order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(verifyEmail)}>
          <div className="flex flex-col items-center justify-center space-y-6">
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
            {errors.code && <span>{errors.code.message}</span>}
            <Button
              className="w-full max-w-sm text-sm md:text-base font-bold cursor-pointer"
              type="submit"
              disabled={isVerifying}
            >
              <LoaderCircle className="size-5 animate-spin" />
              Verify
            </Button>
            {/* todo add resend */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
