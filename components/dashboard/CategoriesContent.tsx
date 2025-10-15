"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Search,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchCategories, updateCategory } from "@/services/categories";
import { Category } from "@/lib/types";
import AddCategoryDialog from "../inventory/AddCategoryDialog";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { deleteCategory } from "@/services/categories";
import { ViewDetailsDialog } from "../ViewDetailsDialog";
import { EditSheet } from "../EditSheet";
import CategoriesStatCards from "../categories/CategoriesStatCards";
// import ErrorDisplay from "../error-display";

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
 

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

  // Reusable table component for categories list
  function CategoryTable({
    categories,
    onView,
    onEdit,
    onDelete,
  }: {
    categories: Category[];
    onView: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
  }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Category ID</TableHead>
            <TableHead className="whitespace-nowrap">Category Name</TableHead>
            <TableHead className="whitespace-nowrap">
              Category Description
            </TableHead>
            <TableHead className="whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.category_name}</TableCell>
                <TableCell>
                  {category.category_description || "Not Available"}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:bg-slate-900">
                      <DropdownMenuItem onClick={() => onView(category)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(category)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(category)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="p-4 text-center text-sm text-gray-500"
              >
                No Categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      {/* ///////////  COMPONENT HEADER   /////////////////////// */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Category Management</h2>
      </div>

      {/* ///////////  CATEGORIES CARDS   /////////////////////// */}

      <CategoriesStatCards />
      {/* Error point */}
      {/* <ErrorDisplay /> */}

      {/* ///////////  Category TABLE CARD  /////////////////////// */}
      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">
            Product Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">

          {/* To view */}
          {selectedCategory && (
            <ViewDetailsDialog
              open={openViewDialog}
              setOpen={setOpenViewDialog}
              title="Category Details"
              fields={[
                { label: "Category ID", value: selectedCategory.id },
                {
                  label: "Category Name",
                  value: selectedCategory.category_name,
                },
                {
                  label: "Category Decription",
                  value:
                    selectedCategory.category_description || "Not available",
                },
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
                await updateCategory(
                  selectedCategory.id,
                  updatedData,
                  loadCategories
                );
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

          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search category "
                className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-[400px] text-sm bg-background"
              />
            </div>

            {/* ///////////  ADD Category DIALOG    /////////////////////// */}
            <AddCategoryDialog refreshCategories={loadCategories} />
          </div>

          {/* ///////////  CATEGORY TABLE   /////////////////////// */}

          <div className="max-h-100 overflow-x-auto">
            <CategoryTable
                categories={categories}
                onView={(c) => {
                  setSelectedCategory(c);
                  setOpenViewDialog(true);
                }}
                onEdit={(c) => {
                  setSelectedCategory(c);
                  setOpenEditSheet(true);
                }}
                onDelete={(c) => {
                  setSelectedCategory(c);
                  setOpenDelete(true);
                }}
              />
          </div>
        </CardContent>
      </Card>

      <ToastContainer />
    </>
  );
}
