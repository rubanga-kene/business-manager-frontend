"use client";

import { Filter,  Plus,  MoreHorizontal, FileText, ShoppingCart, Briefcase, Edit2, X, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner"
import {  DollarSign } from "lucide-react";

export default function SalesContent() {

  const sales = [
    {
      id: "S-002",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: '12-06-2025 01:32PM'
    },
    {
      id: "S-003",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: '12-06-2025 01:32PM'
    },
    {
      id: "S-004",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: '12-06-2025 01:32PM'
     
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sales & Revenue Management</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter by Date
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            View Report
          </Button>

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
                  <Input id="quantity" type="number" min={1} className="col-span-3 dark:bg-zinc-800" required/>
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
                  onClick={() => {
                              toast.success("Sale Made", {
                                description: `Sale has been made successfully `,
                              })
                            }}
                >
                  Make Sale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
          {/* /////////  SALES CARDS  ///////////// */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <ShoppingCart className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales Today</p>
              <h3 className="text-2xl font-bold">UGX. 125,000</h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                +12% from yesterday
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales this Week</p>
              <h3 className="text-2xl font-bold">UGX. 398,500</h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                +8% from last week
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <Briefcase className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales this Month</p>
              <h3 className="text-2xl font-bold">UGX. 2,526,500</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                +22% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

       {/* ////////  SALES TABLE  //////////  */}
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price </TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Date and Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>{sale.product}</TableCell>
                    <TableCell>{sale.category}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>{sale.price}</TableCell>
                    <TableCell>{sale.total}</TableCell>
                    <TableCell>{sale.datetime}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast.success( "Sale canceled",{
                                description: `Sale ${sale.id} has been cancelled`,
                              });
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
