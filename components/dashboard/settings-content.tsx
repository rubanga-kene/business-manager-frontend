import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
        alert("Just a moment")
    }
  return (
    <>
      <Card>
        <CardHeader className="">
          <CardTitle>BUSINESS INFORMATION</CardTitle>
        </CardHeader>
        <CardContent className="text-center max-h-130 overflow-scroll">
            
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              className="w-30 h-30 text-center"
              src={"/images/avatar.svg"}
              alt="Business logo"
            />
           
            
            <AvatarFallback>U</AvatarFallback>
           
          </Avatar>
          <span onClick={handleUpdateAvatar} className="block text-sm text-blue-500 cursor-pointer mb-2">Update Logo</span>
          <span>GLORY TO GOD LTD</span>
          <Table className="mb-6">
            <TableHeader>
              <TableHead>Business Info</TableHead>
            </TableHeader>
            <TableBody className="text-left">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>GLORY TO GOD LTD</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>PLOT 234 FAKE STREET</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
             
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableHead>Credentials</TableHead>
            </TableHeader>
            <TableBody className="text-left">
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>admin@glory.com</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Password</TableCell>
                <TableCell>****************</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
