"use client";

import { useState } from "react";

import { Users, Edit, Trash, Search, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

import UsersDialog from "../users/UsersDialog";
import { ToastContainer } from "react-toastify";


export default function UsersContent() {
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    {
      id: "ADMIN-001",
      name: "Rubanga Kene",
      email: "solo@email.com",
      contact: "0780828358",
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "STAFF-002",
      name: "Rubanga Kene",
      email: "solo@email.com",
      contact: "0780828358",
      role: "staff",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "STAFF-003",
      name: "Rubanga Kene",
      email: "solo@email.com",
      contact: "0780828358",
      role: "staff",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const filteredUsers = activeTab == "all" ? users : users.filter(user => user.role === activeTab)

  return (
    <>
        {/* ///////////  COMPONENT HEADER   /////////////////////// */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">System User Management</h2>
      </div>

        {/* ///////////  USER CARDS   /////////////////////// */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <UserCheck className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All Users</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <UserCog className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Staff</p>
              <h3 className="text-2xl font-bold">20</h3>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* ///////////  USER TABLE CARD  /////////////////////// */}
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("all")}
              >
                All users
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("admin")}
              >
                Admins
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("staff")}
              >
                Staff
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user by name or phone number or user ID"
                  className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-[400px] text-sm bg-background"
                />
              </div>

              {/* ///////////  ADD USER DIALOG    /////////////////////// */}
              <UsersDialog/>
            </div>

          {/* ///////////  USER TABLE   /////////////////////// */}
          
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">User ID</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Contact{" "}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Role</TableHead>
                    <TableHead className="whitespace-nowrap">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage
                              src={user.avatar || "/images/avatar.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.contact}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-600"
              >
                See all Users
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      <ToastContainer/>
    </>
  );
}
