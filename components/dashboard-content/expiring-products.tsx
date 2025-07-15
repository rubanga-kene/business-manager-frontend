import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "../ui/badge"
import { MoreHorizontal } from "lucide-react"
import { toast } from "react-toastify"

export default function ExpiringProducts (){
     const productExpiry = [
    {
      id: "INV-2023-001",
      name: "Super Rice",
      category: "Foods",
      daysLeft: 0,
      status: "Expired",
      
    },
     {
      id: "INV-2023-002",
      name: "Super Rice",
      category: "Foods",
      daysLeft: 0,
      status: "Expired",
      
    },
     {
      id: "INV-2023-003",
      name: "Super Rice",
      category: "Foods",
      daysLeft: 6,
      status: "6 Days",
      
    },
     {
      id: "INV-2023-004",
      name: "Super Rice",
      category: "Foods",
      daysLeft: 10,
      status: "10 Days",
      
    },
  ]

    return(
        <>
              {/* /////////////   EXPIRING PRODUCTS //////////////////////// */}

      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium text-red-500">Expiring Products Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Days to expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productExpiry.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.daysLeft}</TableCell>
                    <TableCell>     
                      <Badge variant= {product.daysLeft === 0 ? "destructive" : "warning"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem >
                            Clear
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                          onClick={() => toast.error('Ignored Failed')}
                          >
                            Ignore
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
        </>
    )
}