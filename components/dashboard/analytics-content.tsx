"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ChevronDown } from "lucide-react"
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

export default function AnalyticsContent() {

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

  return (
    <>

          {/*Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* ////////    OVERALL RATING //////// */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
            <CardTitle className="text-base font-medium">Overall Rating</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  This Week <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-24">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path d="M 0 50 A 50 50 0 0 1 100 50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <path d="M 0 50 A 50 50 0 0 1 90 50" fill="none" stroke="#3b82f6" strokeWidth="10" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-2xl font-bold">4.5/5</p>
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                      +31%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Service Quality</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="h-2 w-32" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Support</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="h-2 w-32" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Delivery Time</span>
                <div className="flex items-center gap-2">
                  <Progress value={50} className="h-2 w-32" />
                  <span className="text-sm">2.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Product Quality</span>
                <div className="flex items-center gap-2">
                  <Progress value={50} className="h-2 w-32" />
                  <span className="text-sm">2.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Communication</span>
                <div className="flex items-center gap-2">
                  <Progress value={76} className="h-2 w-32" />
                  <span className="text-sm">3.8</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Value for money</span>
                <div className="flex items-center gap-2">
                  <Progress value={76} className="h-2 w-32" />
                  <span className="text-sm">3.8</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
       
       {/* /////////   TOP SELLING ITEMS  //////// */}
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

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        
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



    
    </>
  )
}
