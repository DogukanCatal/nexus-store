import {
  OrderStatus,
  orderStatusColors,
  orderStatusLabels,
} from "@/types/order/order";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { editOrderStatusAsync } from "@/lib/api/admin/orders/edit-order-status-async";

type EditOrderStatusDialogProps = {
  onClose: () => void;
  selectedStatus: OrderStatus;
  showEditOrderDialog: boolean;
  orderId: string;
  customerEmail: string;
  orderRef: string;
};

const EditOrderStatusDialog = ({
  onClose,
  selectedStatus,
  showEditOrderDialog,
  orderId,
  customerEmail,
  orderRef,
}: EditOrderStatusDialogProps) => {
  const orderStatusList = Object.values(OrderStatus);
  const [selectedStatusFromList, setSelectedStatusFromList] =
    useState<OrderStatus>(selectedStatus ?? ("pending" as OrderStatus));
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSaveStatus = () => {
    startTransition(async () => {
      const response = await editOrderStatusAsync({
        orderId,
        newStatus: selectedStatusFromList,
        customerEmail,
        orderRef,
      });

      if (!response.success) {
        console.log(response.error);
        return;
      }

      router.replace("/admin/orders");
    });
  };
  return (
    <Dialog open={showEditOrderDialog} onOpenChange={onClose}>
      <DialogContent
        className=" bg-[#262626] sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()} //do not close dialog when outside of dialog is clicked
        onEscapeKeyDown={(e) => e.preventDefault()} //do not close dialog when esc is pressed
      >
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Order Status</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {orderStatusList.map((status, i) => (
              <div key={i}>
                <Button
                  type="button"
                  className={`${orderStatusColors[status as OrderStatus]} cursor-pointer border-2 ${selectedStatusFromList === status ? "border-white" : ""}`}
                  variant="default"
                  onClick={() => {
                    setSelectedStatusFromList(status);
                  }}
                >
                  <p className="text-sm font-semibold text-white/75">
                    {orderStatusLabels[status]}
                  </p>
                </Button>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold">
            Status: <span>{orderStatusLabels[selectedStatusFromList]}</span>
          </p>
          <Button
            onClick={handleSaveStatus}
            className="cursor-pointer text-sm font-semibold"
          >
            {isPending ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderStatusDialog;
