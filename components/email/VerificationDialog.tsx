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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(verifyEmail)}>
          <div className="flex flex-col items-center justify-center space-y-4">
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
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.code && <span>{errors.code.message}</span>}
            <Button
              className="w-full max-w-sm text-xs md:text-sm font-bold cursor-pointer"
              type="submit"
              disabled={isVerifying}
            >
              Verify
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
