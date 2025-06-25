"use client"

import { ChevronDown, TrendingUp,  MoreHorizontal, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { toast } from "sonner"
import { Badge } from "../ui/badge"

export default function DashboardContent() {

  const highSales = [
    { name: "Sun", value: 8 },
    { name: "Mon", value: 10 },
    { name: "Tue", value: 12 },
    { name: "Wed", value: 11 },
    { name: "Thu", value: 9 },
    { name: "Fri", value: 11 },
    { name: "Sat", value: 12 },
  ]

   const lowSales = [
    { name: "Sun", value: 1 },
    { name: "Mon", value: 2 },
    { name: "Tue", value: 2 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 3 },
    { name: "Sat", value: 1 },
  ]

  const customersData = [
    { name: "Sun", value: 8000 },
    { name: "Mon", value: 10000 },
    { name: "Tue", value: 12000 },
    { name: "Wed", value: 9000 },
    { name: "Thu", value: 6000 },
    { name: "Fri", value: 8000 },
  ]

   const products = [
    {
      id: "INV-2023-001",
      name: "Super Rice",
      category: "Foods",
      quantity: "10",
      status: "Low",
      
    },
     {
      id: "INV-2023-002",
      name: "Super Rice",
      category: "Foods",
      quantity: "10",
      status: "Low",
      
    },
     {
      id: "INV-2023-003",
      name: "Super Rice",
      category: "Foods",
      quantity: "10",
      status: "Low",
      
    },
     {
      id: "INV-2023-004",
      name: "Super Rice",
      category: "Foods",
      quantity: "10",
      status: "Low",
      
    },
  ]

  return (
    <>
      <div className="flex justify-end mb-4">
        <p className="text-sm text-muted-foreground">Wed // July 26th, 2023</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
            
              <TrendingUp/>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
               Total Sales <span className="text-xs">(Today)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">UGX. 234,500</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                  +24%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Yesterday: UGX. 345,000</p>
            </div>
          </CardContent>
        </Card>

          <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-cyan-50 dark:bg-cyan-950 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Sales <span className="text-xs">(This week)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">UGX. 237,500</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                  +31%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Previous week: UGX. 1,870,500</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">UGX. 1,025,000</h3>
              <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Sales over time</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Today <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={customersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`${payload[0].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "white", stroke: "#3B82F6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                    fill="url(#colorUv)"
                  />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <area type="monotone" dataKey="value" stroke="none" fill="url(#colorUv)" /> */}
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Top selling items</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Today <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={highSales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`${payload[0].value} K`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="value" fill="#26bd26db" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Low selling items</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Today <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={lowSales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border rounded shadow-sm">
                            <p className="text-xs">{`${payload[0].value} K`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

                    
        {/* /////////////   FOR LOW STOCK ALERT //////////////////////// */}

      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium text-red-500">Low Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity Left</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <Badge variant= "warning">{product.status}</Badge>
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
                            Restock
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              toast.success("Product ignored ",{
                                description: `You have ignored ${product.name} successfully`,
                              })
                            }}
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
