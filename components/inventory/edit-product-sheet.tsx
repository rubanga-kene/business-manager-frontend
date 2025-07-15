"use client";

import { ProductFormData, updateProduct } from "@/services/products";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: number;
  category_name: string;
};

type Supplier = {
  id: number;
  supplier_name: string;
};

type Product = {
  id: number;
  product_name: string;
  product_description: string | null;
  category: Category;
  supplier: Supplier;
  quantity: number;
  unit_price: number;
  m_date: string | null;
  e_date: string | null;
};

type EditProductSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onProductUpdated: () => void;
};

export default function EditProductSheet({
  open,
  setOpen,
  initialData,
  categories,
  suppliers,
  onProductUpdated,
}: EditProductSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>();

  useEffect(() => {
    if (open && initialData) {
      reset({
        product_name: initialData.product_name,
        product_description: initialData.product_description || "",
        category_id: String(initialData.category.id),
        supplier_id: String(initialData.supplier.id),
        quantity: initialData.quantity,
        unit_price: initialData.unit_price,
        m_date: initialData.m_date?.split('T')[0] || undefined,
        e_date: initialData.e_date?.split('T')[0] || undefined,
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: ProductFormData) => {
    if (!initialData) return;
    
    try {
      await updateProduct(initialData.id, data);
      onProductUpdated();
      setOpen(false);
    } catch  {
      // Error is already logged in the service
      // Add any UI-specific error handling here if needed
    }
  };

  if (!initialData) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="col-span-4 text-sm text-red-500 text-right">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Supplier */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Supplier
            </Label>
            <Controller
              name="supplier_id"
              control={control}
              rules={{ required: "Supplier is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={String(supplier.id)}>
                        {supplier.supplier_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.supplier_id && (
              <p className="col-span-4 text-sm text-red-500 text-right">
                {errors.supplier_id.message}
              </p>
            )}
          </div>

          {/* Product Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product_name" className="text-right">
              Product Name
            </Label>
            <Input
              id="product_name"
              className="col-span-3"
              {...register("product_name", {
                required: "Product name is required",
              })}
            />
            {errors.product_name && (
              <p className="col-span-4 text-sm text-red-500 text-right">
                {errors.product_name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product_description" className="text-right">
              Description
            </Label>
            <Textarea
              id="product_description"
              className="col-span-3"
              {...register("product_description")}
            />
          </div>

          {/* Unit Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit_price" className="text-right">
              Unit Price
            </Label>
            <Input
              id="unit_price"
              type="number"
              step="0.01"
              min="0.01"
              className="col-span-3"
              {...register("unit_price", {
                required: "Price is required",
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: "Price must be at least 0.01",
                },
              })}
            />
            {errors.unit_price && (
              <p className="col-span-4 text-sm text-red-500 text-right">
                {errors.unit_price.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              className="col-span-3"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
            />
            {errors.quantity && (
              <p className="col-span-4 text-sm text-red-500 text-right">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Manufacturing Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="m_date" className="text-right">
              Manufacturing Date
            </Label>
            <Input
              id="m_date"
              type="date"
              className="col-span-3"
              {...register("m_date")}
            />
          </div>

          {/* Expiry Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="e_date" className="text-right">
              Expiry Date
            </Label>
            <Input
              id="e_date"
              type="date"
              className="col-span-3"
              {...register("e_date")}
            />
          </div>

          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}