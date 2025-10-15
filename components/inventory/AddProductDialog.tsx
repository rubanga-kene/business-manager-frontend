"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { addProduct, ProductFormData } from "@/services/products";

type Category = {
  id: number;
  category_name: string;
};

type Supplier = {
  id: number;
  supplier_name: string;
};

type FormData = {
  category_id: string;
  supplier_id: string;
  product_name: string;
  product_description: string;
  unit_price: number;
  quantity: number;
  m_date?: string;
  e_date?: string;
};

type AddProductDialogProps = {
  categories: Category[];
  suppliers: Supplier[];
  onProductAdded: () => void;
};

export default function AddProductDialog({ categories, suppliers, onProductAdded }: AddProductDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

const onSubmit = async (data: ProductFormData) => {
  try {
    await addProduct(data);
    toast.success("Product added successfully!", { position: "top-center" });
    reset();
    onProductAdded();
  } catch  {
    toast.error("Failed to add product", { position: "top-center" });
  }
};



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]  dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in all the required details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4 max-h-100 overflow-y-auto">
          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Product Category
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue="Uncategorized"
                >
                  <SelectTrigger className="col-span-3 dark:bg-slate-900">
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-900">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && <p className="col-span-2 text-red-500 text-sm">{errors.category_id.message}</p>}
          </div>

          {/* Supplier */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Product Supplier
            </Label>
            <Controller
              name="supplier_id"
              control={control}
              rules={{ required: "Supplier is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="col-span-3 dark:bg-slate-900">
                    <SelectValue placeholder="Select product supplier" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-900">
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.id} value={String(sup.id)}>
                        {sup.supplier_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.supplier_id && <p className="col-span-4 text-red-500 text-sm">{errors.supplier_id.message}</p>}
          </div>

          {/* Product Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              id="name"
              placeholder="Type product name..."
              type="text"
              className="col-span-3 dark:bg-slate-900"
              {...register("product_name", { required: "Product name is required" })}
            />
            {errors.product_name && <p className="col-span-4 text-red-500 text-sm">{errors.product_name.message}</p>}
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Product Description
            </Label>
            <Textarea
              id="description"
              placeholder="Type product description..."
              className="col-span-3 dark:bg-slate-900"
              {...register("product_description")}
            />
            {errors.product_description && <p className="col-span-4 text-red-500 text-sm">{errors.product_description.message}</p>}
          </div>

          {/* Unit Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Unit Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.0"
              min={1}
              className="col-span-3 dark:bg-slate-900"
              {...register("unit_price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be at least 1" },
              })}
            />
            {errors.unit_price && <p className="col-span-4 text-red-500 text-sm">{errors.unit_price.message}</p>}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              className="col-span-3 dark:bg-slate-900"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
            />
            {errors.quantity && <p className="col-span-4 text-red-500 text-sm">{errors.quantity.message}</p>}
          </div>

          {/* Manufacturing Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="m_date" className="text-right">
              Manufacturing Date
            </Label>
            <Input
              id="m_date"
              type="date"
              className="col-span-3 dark:bg-slate-700 "
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
              className="col-span-3 dark:bg-slate-700"
              {...register("e_date")}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}