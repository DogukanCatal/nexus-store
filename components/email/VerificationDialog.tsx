import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VerifyEmailCode } from "@/lib/api/verify-email-code";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const verifyEmail = async () => {
    setIsVerifying(true);

    const response = await VerifyEmailCode({
      code,
      email,
    });

    if (!response.success) {
      console.log("Verify Code Error:", response.error);
      return;
    }
    onVerified();
  };

  console.log(showDialog);
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
        <Input onChange={(e) => setCode(e.target.value)} />
        <Button onClick={verifyEmail}></Button>
        <span>{isVerifying}</span>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
