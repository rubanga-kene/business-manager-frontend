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
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { addCategory } from "@/services/categories";
import { useState } from "react";

type FormData ={
    category_name:string,
    category_description:string
}
type AddCategoryDialogProps = {
  refreshCategories: () => void
}

export default function AddCategoryDialog({ refreshCategories }: AddCategoryDialogProps) {

    const{register, handleSubmit, formState, reset} = useForm<FormData>()
    const {errors, isSubmitting} = formState
    const [open, setOpen] = useState(false)


   const onSubmit = async (data: FormData) => {
    await addCategory(data);     
    refreshCategories();         
    reset();  
    setOpen(false);                    
  };
    

  return (
    <>
      {/* ///////////  ADD CATEGORY  DIALOG    /////////////////////// */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-zinc-900 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Add a new category. Fill in all the required details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}  className="grid gap-4 py-4 max-h-100 overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Type category name..."
                {...register('category_name', {required: "Category name is required"})}
                className="col-span-3 dark:bg-zinc-800"
              />
              {errors?.category_name?.message && <small className="text-red-500">{errors.category_name.message}</small>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Category Description
              </Label>
              <Textarea
                id="description"
                placeholder="Type category description..."
                {...register('category_description')}
                className="col-span-3 dark:bg-zinc-800"
                
              />

            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Add Category"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </>
  );
}
