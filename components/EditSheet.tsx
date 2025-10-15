// components/EditSheet.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Field<T> = {
  name: keyof T;
  label: string;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
};

type EditSheetProps<T> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  initialData: T;
  fields: Field<T>[];
  onSubmit: (updatedData: T) => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditSheet<T extends Record<string, any>>({
  open,
  setOpen,
  title = "Edit Item",
  initialData,
  fields,
  onSubmit,
}: EditSheetProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setFormData(initialData);
  }, [open, initialData]);

  const handleChange = (
    key: keyof T,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetContent side="right" className="w-[400px] sm:w-[500px] dark:bg-slate-800">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {fields.map(({ name, label, type = "text", placeholder }) => (
            <div key={String(name)}>
              <label className="block text-sm mb-1">{label}</label>
              <Input
                type={type}
                placeholder={placeholder}
                value={formData[name] ?? ""}
                className="dark:bg-slate-900"
                onChange={(e) =>
                  handleChange(
                    name,
                    type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
              />
            </div>
          ))}

          <SheetFooter className="pt-4 flex justify-end gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline" disabled={loading} className="bg-red-500 hover:bg-red-600">
                Cancel
              </Button>
            </SheetClose>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
