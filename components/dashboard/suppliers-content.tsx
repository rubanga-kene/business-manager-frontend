"use client";

import { Users, Search, UserCheck, MoreHorizontal } from "lucide-react";
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
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Supplier } from "@/lib/types";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import {
  deleteSupplier,
  fetchSuppliers,
  updateSupplier,
} from "@/services/suppliers";
import AddSupplierDialog from "../inventory/add-supplier-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ViewDetailsDialog } from "../view-details-dialog";
import { EditSheet } from "../edit-sheet";

export default function CategoriesContent() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  return (
    <>
      {/* ///////////  COMPONENT HEADER   /////////////////////// */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Suppliers Management</h2>
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
          <CardTitle className="text-base font-medium">
            Product Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
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
            {/* <AddCategoryDialog refreshCategories={loadSuppliers}/> */}
            <AddSupplierDialog refreshSuppliers={loadSuppliers} />
          </div>

          {/* ///////////  CATEGORY TABLE   /////////////////////// */}

          <div className="max-h-100 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">
                    Supplier ID
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Supplier Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Supplier Contact
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Supplier Address
                  </TableHead>
                  <TableHead className="whitespace-nowrap">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell>{supplier.supplier_name}</TableCell>
                    <TableCell>
                      {supplier.supplier_contact || "Not Available"}
                    </TableCell>
                    <TableCell>
                      {supplier.supplier_address || "Not Available"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
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
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setOpenViewDialog(true);
                              }}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setOpenEditSheet(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSupplier(supplier); // <-- set the correct item
                                setOpenDelete(true);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* To view */}
                        {selectedSupplier && (
                          <ViewDetailsDialog
                            open={openViewDialog}
                            setOpen={setOpenViewDialog}
                            title="Supplier Details"
                            fields={[
                              {
                                label: "Supplier ID",
                                value: selectedSupplier.id,
                              },
                              {
                                label: "Supplier Name",
                                value: selectedSupplier.supplier_name,
                              },
                              {
                                label: "Supplier Contact",
                                value:
                                  selectedSupplier.supplier_contact ||
                                  "Not available",
                              },
                              {
                                label: "Supplier Address",
                                value:
                                  selectedSupplier.supplier_address ||
                                  "Not available",
                              },
                              // Add more fields if needed
                            ]}
                          />
                        )}

                        {/* Edit sheet */}
                        {selectedSupplier && (
                          <EditSheet<Supplier>
                            open={openEditSheet}
                            setOpen={setOpenEditSheet}
                            title="Edit Supplier"
                            initialData={selectedSupplier}
                            fields={[
                              {
                                name: "supplier_name",
                                label: "Supplier Name",
                                placeholder: "e.g. John Does",
                              },
                              {
                                name: "supplier_contact",
                                label: "Contact",
                                placeholder: "e.g. +256 760 728493",
                              },
                            ]}
                            onSubmit={async (updatedData) => {
                              await updateSupplier(
                                selectedSupplier.id,
                                updatedData,
                                loadSuppliers
                              );
                              setSelectedSupplier(null);
                            }}
                          />
                        )}
                        {/* To delete */}
                        {selectedSupplier && (
                          <ConfirmDeleteDialog
                            open={openDelete}
                            setOpen={setOpenDelete}
                            itemName={selectedSupplier.supplier_name}
                            onConfirm={() => {
                              deleteSupplier(
                                selectedSupplier.id,
                                selectedSupplier.supplier_name,
                                () => {
                                  loadSuppliers();
                                  setSelectedSupplier(null);
                                }
                              );
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
                ):(<p className="p-4 text-l text-gray-500">No suppliers found</p>) }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
