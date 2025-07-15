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
import { MoreHorizontal, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

export default function SalesTable() {
  const sales = [
    {
      id: "S-002",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: "12-06-2025 01:32PM",
    },
    {
      id: "S-003",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: "12-06-2025 01:32PM",
    },
    {
      id: "S-004",
      product: "Jack Fruit",
      category: "Fruits",
      quantity: "5",
      price: "2,990",
      total: "Paid",
      datetime: "12-06-2025 01:32PM",
    },
  ];

  return (
    <>
      {/* ////////  SALES TABLE  //////////  */}
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">Recent Sales</CardTitle>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.success("We shall get there", {
                                position: "top-center",
                              })
                            }
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
