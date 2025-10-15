// components/ViewDetailsDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

type Field = {
  label: string;
  value: string | number | null | undefined;
};

type ViewDetailsDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  fields: Field[];
};

export function ViewDetailsDialog({
  open,
  setOpen,
  title = "Item Details",
  fields,
}: ViewDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl dark:bg-slate-800 rounded-lg">
        <DialogHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Read-only details for this item.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {fields.map((field, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-slate-700 p-3 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-400 dark:text-gray-300">
                {field.label}
              </p>
              <p className="text-normal font-medium mt-1">{field.value ?? "—"}</p>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-6 flex justify-end">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-6 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
