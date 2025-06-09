import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type DeleteAlertDialogProps = {
  id: string;
  onDelete: (id: string) => void;
};

const DeleteAlertDialog = ({ id, onDelete }: DeleteAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="size-10 cursor-pointer"
          variant="outline"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#262626]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this variant?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The selected color and all its stock
            entries will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
