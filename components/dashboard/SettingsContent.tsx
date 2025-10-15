"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";
import { AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

export default function SettingsContent() {
  const handleUpdateAvatar = () => {
    alert("Just a moment");
  };
  return (
    <>
      {/* ///////////  COMPONENT HEADER   /////////////////////// */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Setttings and Preferences</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* /////////  CARD 1 //////////////// */}
        <Card className="max-w-140 pt-3">
          
          <CardContent className="text-center max-h-130 ">
            <Avatar className="flex justify-center items-center ">
              <AvatarImage
                className="w-25 h-25 text-center"
                src={"/images/avatar.svg"}
                alt="Business logo"
              />

              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span
              onClick={handleUpdateAvatar}
              className="block text-sm text-blue-500 cursor-pointer "
            >
              Update Logo
            </span>

            <Table>
              <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>Business profile</TableHead>
              </TableRow>
            </TableHeader>

              <TableBody className="text-left text-1.2">
                <TableRow className="m-0">
                  <TableCell className="text-sm">Name</TableCell>
                  <TableCell className="text-sm">GLORY TO GOD LTD</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>PLOT 234 FAKE STREET</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>admin@glory.com</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  <TableCell>****************</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* /////////  CARD 2 //////////////// */}
        <Card className="max-w-140 pt-3">
          <CardContent className="text-center max-h-130 ">
            <Avatar className="flex justify-center items-center ">
              <AvatarImage
                className="w-25 h-25 text-center"
                src={"/images/avatar.svg"}
                alt="Business logo"
              />

              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span
              onClick={handleUpdateAvatar}
              className="block text-sm text-blue-500 cursor-pointer "
            >
              Update Logo
            </span>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={3}>Business info</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-left text-1.2">
                <TableRow className="m-0">
                  <TableCell className="text-sm">Name</TableCell>
                  <TableCell className="text-sm">GLORY TO GOD LTD</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>PLOT 234 FAKE STREET</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>admin@glory.com</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  <TableCell>****************</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
