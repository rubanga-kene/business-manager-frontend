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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { addSupplier } from "@/services/suppliers";

type FormData = {
  supplier_name: string;
  supplier_contact: string;
  supplier_address:string
}

type AddSupplierDialogProps = {
  refreshSuppliers: () => void
}
export default function AddSupplierDialog({ refreshSuppliers }: AddSupplierDialogProps) {
   const{register, handleSubmit, formState, reset} = useForm<FormData>()
      const {errors, isSubmitting} = formState
  
      const onSubmit = (data: FormData) => {
          addSupplier(data);
          refreshSuppliers()
          reset()
       };
  return (
    <>
      {/* ///////////  ADD SUPPLIER  DIALOG    /////////////////////// */}
      <Dialog >
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-slate-800 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Add a new Supplier. Fill in all the required details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Supplier Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Type supplier name..."
                {...register('supplier_name', {required: 'The supplier name is required'})}
                className="col-span-3 dark:bg-slate-900"
                
              />
              {errors?.supplier_name?.message && <small className="text-red-500">{errors.supplier_name.message}</small>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                type="text"
                placeholder="Type supplier contact..."
                {...register('supplier_contact', {required:'Contact is required'})}
                className="col-span-3 dark:bg-slate-900"
                
              />
              {errors?.supplier_contact?.message && <small className="text-red-500">{errors.supplier_contact.message}</small>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                placeholder="Type supplier adderess..."
                type="text"
                {...register('supplier_address', {required:'address is required'})}
                className="col-span-3 dark:bg-slate-900"
              />
              {errors?.supplier_address?.message && <small className="text-red-500">{errors.supplier_address.message}</small>}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Add Supplier"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </>
  );
}
