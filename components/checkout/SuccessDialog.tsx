import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LottieWrapper from "../lottie/LottieWrapper";
import ContinueShopping from "../button/ContinueShopping";
import { motion } from "framer-motion";
type SuccessDialogProps = {
  showSuccessDialog: boolean;
  orderRef: string;
  onClose: () => void;
};

const SuccessDialog = ({
  showSuccessDialog,
  orderRef,
  onClose,
}: SuccessDialogProps) => {
  return (
    <Dialog open={showSuccessDialog} onOpenChange={onClose}>
      <DialogContent
        className=" bg-[#262626] sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()} //do not close dialog when outside of dialog is clicked
        onEscapeKeyDown={(e) => e.preventDefault()} //do not close dialog when esc is pressed
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-x-2"
        >
          <div className="h-[200px] w-[200px] flex items-center justify-center">
            <LottieWrapper
              path="/animations/lottie_success.json"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div className="text-center mx-auto space-y-4">
            <h1 className="font-bold text-2xl md:text-4xl">Order Confirmed!</h1>
            <div className="text-center">
              <p className="font-semibold text-base md:text-lg text-muted-foreground">
                Thank you for ordering from our store.
              </p>
              <p className="font-semibold text-base md:text-lg text-muted-foreground">
                You will receive a confirmation email shortly.
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-semibold">
              Order No: <span className="font-semibold">{orderRef}</span>
            </p>
          </div>
          <div className="mt-4">
            <ContinueShopping onClose={onClose} />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
