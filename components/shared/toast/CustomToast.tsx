import React from "react";
import { CheckCircle, X, XCircle } from "lucide-react";
import { toast } from "sonner";

type CustomToastProps = {
  success: boolean;
  message: string;
  toastId: string | number;
};

const CustomToast = ({ success, message, toastId }: CustomToastProps) => {
  return (
    <div
      className={`flex items-center justify-between gap-3 p-3 rounded-lg text-white w-full max-w-sm ${
        success ? "bg-[#22c55e]" : "bg-[#EA4A78]"
      }`}
    >
      <div className="flex items-center gap-2">
        {success ? <CheckCircle size={20} /> : <XCircle size={20} />}
        <span className="font-bold text-xs md:text-sm">{message}</span>
      </div>
      <button onClick={() => toast.dismiss(toastId)}>
        <X size={16} className="opacity-70 hover:opacity-100 cursor-pointer" />
      </button>
    </div>
  );
};

export default CustomToast;
