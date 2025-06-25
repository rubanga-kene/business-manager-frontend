"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { Filter, Plus, MoreHorizontal, Search,  Star, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Input } from "../ui/input"
import { toast } from "sonner"
export default function InventoryContent() {

  const categoryData = [
    { name: "Category A", value: 35 },
    { name: "Category B", value: 45 },
    { name: "Category C", value: 55 },
    { name: "Category D", value: 25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const stockItems = [
    {
      id: "P-004",
      name: "Orange",
      category: "Foods",
      quantity: "123",
      status: "In Stock",
      price: "4500",
    },
    {
      id: "P-005",
      name: "Orange",
      category: "Foods",
      quantity: "123",
      status: "Few Left",
      price: "4500",
    },
   {
      id: "P-006",
      name: "Orange",
      category: "Foods",
      quantity: "123",
      status: "Out of Stock",
      price: "4500",
    },
  ]

  return (
    <>
    {/* ///////////   COMPONENT HEADER //////////////////// */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inventory & Stock Management</h2>
        
      </div>

    {/* ///////////  INVENTORY CARDS   /////////////////////// */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <Star className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Stock</p>
              <h3 className="text-2xl font-bold">Phones</h3>
              <p className="text-xs text-blue-500 dark:text-blue-500">No. of Items: 24</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <ArrowUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Stock</p>
              <h3 className="text-2xl font-bold">Fruits</h3>
              <p className="text-xs text-green-600 dark:text-green-400">Items left: 234</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <ArrowDown className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lowest Stock</p>
              <h3 className="text-2xl font-bold">Shoes</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">Items left: 2</p>
            </div>
          </CardContent>
        </Card>
      </div>

        <div className="md:col-span-2 gap-6 mb-6">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Product Stock</CardTitle>
            </CardHeader>
            <div className="flex flex-col md:flex-row justify-between mb-2 gap-4 p-6">
              <div className="relative">
                <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"  />
                <input
                  type="text"
                  placeholder="Search product by name or category or product ID"
                  className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-[400px] text-sm bg-background"
                />
                
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter Products
              </Button>

              {/* ///////////  ADD CATEGORY  DIALOG    /////////////////////// */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
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
                  <div className="grid gap-4 py-4">
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Category Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        className="col-span-3 dark:bg-zinc-800"
                        required
                      />
                    </div>
                    
                  </div>
                  <DialogFooter>
                    <Button
                     className="bg-blue-500 hover:bg-blue-600 text-white"
                      type="submit"
                      onClick={() => {
                        toast.success("Product Added",{
                          description: "New product has been added successfully",
                        });
                      }}
                    >
                      Create Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* ///////////  ADD PRODUCT DIALOG    /////////////////////// */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] dark:bg-zinc-900">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new Product. Fill in all the required details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Product Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3 dark:bg-zinc-800">
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent defaultValue="none" className="dark:bg-zinc-900">
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="electronic">Electronics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        className="col-span-3 dark:bg-zinc-800"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Unit Price
                      </Label>
                      <Input
                        id="name"
                        type="number"
                        min={1}
                        className="col-span-3 dark:bg-zinc-800"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="name"
                        type="number"
                        min={1}
                        className="col-span-3 dark:bg-zinc-800"
                        required
                      />
                    </div>
                    
                    
                  </div>
                  <DialogFooter>
                    <Button
                     className="bg-blue-500 hover:bg-blue-600 text-white"
                      type="submit"
                      onClick={() => {
                        toast.success("Product Added",{
                          description: "New product has been added successfully",
                        });
                      }}
                    >
                      Add Product
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            
            </div>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quntity</TableHead>
                      <TableHead>Unit Price </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockItems.map((stockItem) => (
                      <TableRow key={stockItem.id}>
                        <TableCell className="font-medium">{stockItem.id}</TableCell>
                        <TableCell>{stockItem.name}</TableCell>
                        <TableCell>{stockItem.category}</TableCell>
                        
                        <TableCell>{stockItem.quantity}</TableCell>
                        <TableCell>{stockItem.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              stockItem.status === "In Stock"
                                ? "success"
                                : stockItem.status === "Few Left"
                                  ? "warning"
                                  : stockItem.status === "Out of Stock"
                                    ? "destructive"
                                    : "default"
                            }
                          >
                            {stockItem.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  toast.success( "Stock deleted",{
                                    description: `Product stock has been deleted successfully`,
                                    
                                  })
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
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
        </div>
        
      

      {/* //////////   PIE CHART  /////////// */}
      <div>
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-medium">Product Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>

    </>
  )
}
