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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Read-only details for this item.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-4">
          {fields.map((field, index) => (
            <div key={index} className="text-sm">
              <span className="font-semibold">{field.label}:</span>{" "}
              <span className="text-muted-foreground">{field.value ?? "—"}</span>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
