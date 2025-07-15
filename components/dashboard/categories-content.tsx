"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Users,  Search, UserCheck, MoreHorizontal} from "lucide-react";
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
import { fetchCategories, updateCategory } from "@/services/categories";
import { Category } from "@/lib/types";
import AddCategoryDialog from "../inventory/add-category-dialog";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { deleteCategory } from "@/services/categories";
import { ViewDetailsDialog } from "../view-details-dialog";
import { EditSheet } from "../edit-sheet";
// import ErrorDisplay from "../error-display";


export default function CategoriesContent() {
const [categories, setCategories] = useState<Category[]>([]);  
const [openViewDialog, setOpenViewDialog] = useState(false);
const [openEditSheet, setOpenEditSheet] = useState(false);
const [openDelete, setOpenDelete] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<Category| null>(null);

const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  
useEffect(() => {
  loadCategories();
}, []);



  return (
    <>
        {/* ///////////  COMPONENT HEADER   /////////////////////// */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Category Management</h2>
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
      {/* Error point */}
      {/* <ErrorDisplay /> */}

        {/* ///////////  Category TABLE CARD  /////////////////////// */}
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">Product Categories</CardTitle>
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

              {/* ///////////  ADD Category DIALOG    /////////////////////// */}
              <AddCategoryDialog refreshCategories={loadCategories}/>
            </div>

          {/* ///////////  CATEGORY TABLE   /////////////////////// */}
          
            <div className="max-h-100 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Category ID</TableHead>
                    <TableHead className="whitespace-nowrap">Category Name</TableHead>
                    <TableHead className="whitespace-nowrap">Category Description</TableHead>
                    <TableHead className="whitespace-nowrap">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody >
                  {categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.category_name}</TableCell>
                      <TableCell>{category.category_description || 'Not Available'}</TableCell> 
                      <TableCell>
                        <div className="flex space-x-2">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedCategory(category);
                                  setOpenViewDialog(true);
                                }}>
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenEditSheet(true);
                                  }}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setSelectedCategory(category); // <-- set the correct item
                                    setOpenDelete(true);
                                  }}> 
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {/* To view */}
                            {selectedCategory && (
                            <ViewDetailsDialog
                              open={openViewDialog}
                              setOpen={setOpenViewDialog}
                              title="Category Details"
                              fields={[
                                { label: "Category ID", value: selectedCategory.id },
                                { label: "Category Name", value: selectedCategory.category_name },
                                { label: "Category Decription", value: selectedCategory.category_description || "Not available"},
                                // Add more fields if needed
                              ]}
                            />
                          )}

                          {/* Edit sheet */}
                         {selectedCategory && (
                              <EditSheet<Category>
                                open={openEditSheet}
                                setOpen={setOpenEditSheet}
                                title="Edit Category"
                                initialData={selectedCategory}
                                fields={[
                                  {
                                    name: "category_name",
                                    label: "Category Name",
                                    placeholder: "e.g. Groceries",
                                  },
                                  {
                                    name: "category_description",
                                    label: "Description",
                                    placeholder: "e.g. All grocery items",
                                  },
                                ]}
                                onSubmit={async (updatedData) => {
                                  await updateCategory(selectedCategory.id, updatedData, loadCategories);
                                  setSelectedCategory(null);
                                }}
                              />
                            )}
                            {/* To delete */}
                          {selectedCategory && (
                            <ConfirmDeleteDialog
                              open={openDelete}
                              setOpen={setOpenDelete}
                              itemName={selectedCategory.category_name}
                              onConfirm={() => {
                                deleteCategory(
                                  selectedCategory.id,
                                  selectedCategory.category_name,
                                  () => {
                                    loadCategories();
                                    setSelectedCategory(null); 
                                  }
                                );
                              }}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>        
                  ))
                  ):(<p className="p-4 text-l text-gray-500">No categories found</p>) }
                </TableBody>
              </Table>
            </div>
          
        </CardContent>
      </Card>
      

      
      <ToastContainer/>
    </>
  );
}
