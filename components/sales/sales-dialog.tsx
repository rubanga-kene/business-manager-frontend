import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function SalesDialog() {
  return (
    <>
      {/* ///////////   MAKE SALES ////////////////// */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" bg-green-500 hover:bg-green-600 text-white">
            <Plus className="h-4 w-4" />
            Make Sale
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle>Make New Sale</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer. Fill in all the required
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Product Category
              </Label>
              <Select>
                <SelectTrigger className="col-span-3 dark:bg-zinc-800">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="foods">Foods</SelectItem>
                  <SelectItem value="footware">Footware</SelectItem>
                  <SelectItem value="utensils">Utensils</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product name
              </Label>
              <Select>
                <SelectTrigger className="col-span-3 dark:bg-zinc-800">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serviceA">Product A</SelectItem>
                  <SelectItem value="serviceB">Product B</SelectItem>
                  <SelectItem value="productA">Product C</SelectItem>
                  <SelectItem value="productB">Product D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                className="col-span-3 dark:bg-zinc-800"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Total Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="col-span-3 dark:bg-zinc-800"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              type="submit"
              onClick={() =>
                toast.info("We shall get there", { position: "top-center" })
              }
            >
              Make Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
