"use client";

import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dropdown-menu";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useState, useEffect } from "react";
import { Product, Category, Supplier } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { toast, ToastContainer } from "react-toastify";
import CategoryDistribution from "../inventory/CategoryDistribution";
import InventoryStatCards from "../inventory/InventoryStatCards";
import { deleteProduct, fetchPaginatedProducts } from "@/services/products";
import { fetchSuppliers } from "@/services/suppliers";
import { fetchCategories } from "@/services/categories";
import AddProductDialog from "../inventory/AddProductDialog";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { ViewDetailsDialog } from "../ViewDetailsDialog";
import EditProductSheet from "../inventory/EditProductSheet";

export default function InventoryContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;
  const totalPages = Math.ceil(totalCount / pageSize);
  // for searching
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // For dialogs
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // For loading products
  useEffect(() => {
    const loadProducts = async () => {
      console.log({ currentPage, activeTab, searchTerm });
      try {
        const data = await fetchPaginatedProducts(
          currentPage,
          pageSize,
          activeTab
        );
        setProducts(data.results);
        setTotalCount(data.count);
      } catch {
        toast.error("Failed to upload products", { position: "top-center" });
      }
    };

    loadProducts();
  }, [currentPage, activeTab, searchTerm, refreshTrigger]);

  const handleProductAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    loadSuppliers();
  }, []);

  const getStockStatus = (
    quantity: number
  ): { label: string; variant: "destructive" | "success" | "warning" } => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" };
    if (quantity <= 10) return { label: "Few Left", variant: "warning" };
    return { label: "In Stock", variant: "success" };
  };

  // Reusable table component for product list
  function ProductTable({
    products,
    onView,
    onEdit,
    onDelete,
  }: {
    products: Product[];
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
  }) {
    return (
      <Table>
        <TableHeader> 
          <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Unit Price</TableHead>
        <TableHead>Expiry Date</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} >
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>
                  {product.category?.category_name || "Uncategorized"}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.unit_price}</TableCell>
                <TableCell>{product.e_date || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant={getStockStatus(product.quantity).variant}>
                    {getStockStatus(product.quantity).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:bg-slate-900">
                      <DropdownMenuItem onClick={() => onView(product)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(product)}>
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
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inventory & Stock Management</h2>
      </div>

      {/* ///////////  INVENTORY CARDS   /////////////////////// */}
      <InventoryStatCards  refreshTrigger={refreshTrigger} />

      {/* ///////////  TABS AND TABLE   /////////////////////// */}
      {/* <div className="md:col-span-2 gap-6 mb-6"> */}
      <Card className="md:col-span-2 gap-6 mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">Product Stock</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* View Dialog */}
          {selectedProduct && (
            <ViewDetailsDialog
              open={openViewDialog}
              setOpen={setOpenViewDialog}
              title="Product Details"
              fields={[
                { label: "Product ID", value: selectedProduct.id },
                {
                  label: "Category",
                  value:
                    selectedProduct.category?.category_name || "Uncategorised",
                },
                {
                  label: "Supplier",
                  value:
                    selectedProduct.supplier?.supplier_name || "Not available",
                },
                { label: "Product Name", value: selectedProduct.product_name },
                {
                  label: "Description",
                  value: selectedProduct.product_description || "Not available",
                },
                { label: "Unit Price", value: selectedProduct.unit_price },
                { label: "Quantity", value: selectedProduct.quantity },
                {
                  label: "Date of Manufacture",
                  value: selectedProduct.m_date || "Not available",
                },
                {
                  label: "Expiry Date",
                  value: selectedProduct.e_date || "Not available",
                },
              ]}
            />
          )}

          {/* Edit Sheet */}
          <EditProductSheet
            open={openEditSheet}
            setOpen={setOpenEditSheet}
            initialData={selectedProduct}
            categories={categories}
            suppliers={suppliers}
            onProductUpdated={handleProductAdded}
          />

          {/* Delete Dialog */}
          {selectedProduct && (
            <ConfirmDeleteDialog
              open={openDelete}
              setOpen={setOpenDelete}
              itemName={selectedProduct.product_name}
              onConfirm={() => {
                deleteProduct(
                  selectedProduct.id,
                  selectedProduct.product_name,
                  () => {
                    handleProductAdded();
                    setSelectedProduct(null);
                  }
                );
              }}
            />
          )}

          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1);
            }}
            className="w-full"
          >
            <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0 overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:cursor-pointer"
              >
                All Products
              </TabsTrigger>

              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id.toString()}
                  // value={category.category_name.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:cursor-pointer"
                >
                  {category.category_name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex flex-col md:flex-row justify-between mb-2 gap-4 p-2 overflow-x-auto scrollbar-hide">
              <div className="relative">
                <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search product by name or category"
                  value={searchTerm}
                  onChange={(e) => {
                    setCurrentPage(1); // reset page
                    setSearchTerm(e.target.value);
                  }}
                  className="pl-10 pr-4 py-2 border border-input rounded-md w-full md:w-[350px] text-sm bg-background"
                />
              </div>

              <AddProductDialog
                categories={categories}
                suppliers={suppliers}
                onProductAdded={handleProductAdded}
              />
            </div>

            <TabsContent value="all" className="w-full">
              <ProductTable
                products={products}
                onView={(p) => {
                  setSelectedProduct(p);
                  setOpenViewDialog(true);
                }}
                onEdit={(p) => {
                  setSelectedProduct(p);
                  setOpenEditSheet(true);
                }}
                onDelete={(p) => {
                  setSelectedProduct(p);
                  setOpenDelete(true);
                }}
              />
            </TabsContent>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id.toString()}
                className="w-full"
              >
                <ProductTable
                  products={products.filter(
                    (p) => p.category?.id === category.id
                  )}
                  onView={(p) => {
                    setSelectedProduct(p);
                    setOpenViewDialog(true);
                  }}
                  onEdit={(p) => {
                    setSelectedProduct(p);
                    setOpenEditSheet(true);
                  }}
                  onDelete={(p) => {
                    setSelectedProduct(p);
                    setOpenDelete(true);
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>

        {/* Pagination */}
        <Pagination className="mt-6 mb-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {/* First page + ellipsis if past page 3 */}
            {currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Pages around current */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => Math.abs(currentPage - page) <= 2)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Last page + ellipsis */}
            {currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
      {/* </div> */}

      {/* Pie Chart */}
      <CategoryDistribution refreshTrigger={refreshTrigger} />

      {/* Toast container */}
      <ToastContainer />
    </>
  );
}
