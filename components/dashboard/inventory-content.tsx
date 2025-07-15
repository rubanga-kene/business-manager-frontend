"use client";

import { MoreHorizontal, RotateCcw, Search } from "lucide-react";
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
import CategoryDistribution from "../inventory/category-distribution";
import InventoryStatCards from "../inventory/inventory-stat-cards";
import {
  deleteProduct,
  fetchPaginatedProducts,
} from "@/services/products";
import { fetchSuppliers } from "@/services/suppliers";
import { fetchCategories } from "@/services/categories";
import AddProductDialog from "../inventory/add-product-dialog";
import { ConfirmDeleteDialog } from "../confirm-delete-dialog";
import { ViewDetailsDialog } from "../view-details-dialog";
import  EditProductSheet  from "../inventory/edit-product-sheet";
// import AddSupplierDialog from "../inventory/add-supplier-dialog";
// import AddCategoryDialog from "../inventory/add-category-dialog";

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

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  type BadgeVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "success"
    | "warning";

  const getStockStatus = (
    quantity: number
  ): { label: string; variant: BadgeVariant } => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" };
    if (quantity <= 10) return { label: "Few Left", variant: "warning" };
    return { label: "In Stock", variant: "success" };
  };

  // Reusable table component for product list
  function ProductTable({ products }: { products: Product[] }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>
                {product.category?.category_name || "Uncategorized"}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.unit_price}</TableCell>
              <TableCell>{product.e_date ? product.e_date : "N/A"}</TableCell>
              <TableCell>
                <Badge variant={getStockStatus(product.quantity).variant}>
                  {getStockStatus(product.quantity).label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenViewDialog(true);
                        }}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenEditSheet(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenDelete(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* To view */}
                  {selectedProduct && (
                    <ViewDetailsDialog
                      open={openViewDialog}
                      setOpen={setOpenViewDialog}
                      title="Product Details"
                      fields={[
                        { label: "Product ID", value: selectedProduct.id },
                        {
                          label: "Product Category",
                          value:
                            selectedProduct.category?.category_name ||
                            "Uncategorised",
                        },
                        {
                          label: "Product Supplier",
                          value:
                            selectedProduct.supplier?.supplier_name ||
                            "Not available",
                        },
                        {
                          label: "Product Name",
                          value:
                            selectedProduct.product_name || "Not available",
                        },
                        {
                          label: "Product Description",
                          value:
                            selectedProduct.product_description ||
                            "Not available",
                        },
                        {
                          label: "Unit Price",
                          value: selectedProduct.unit_price || "Not available",
                        },
                        {
                          label: "Quantity",
                          value: selectedProduct.quantity || "Not available",
                        },
                        {
                          label: "Manufacturing date",
                          value: selectedProduct.m_date || "Not available",
                        },
                        {
                          label: "Expiry date ",
                          value: selectedProduct.e_date || "Not available",
                        },

                        // Add more fields if needed
                      ]}
                    />
                  )}

                  {/* Edit sheet */}
                  <EditProductSheet
                  open={openEditSheet}
                  setOpen={setOpenEditSheet}
                  initialData={selectedProduct}
                  categories={categories}
                  suppliers={suppliers}
                  onProductUpdated={handleProductAdded}
                />

                  {/* To delete */}
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
                </div>
              </TableCell>
            </TableRow>
          ))}
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
      <InventoryStatCards />

      {/* ///////////  TABS AND TABLE   /////////////////////// */}
      <div className="md:col-span-2 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Product Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
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
                  <Button
                    onClick={handleProductAdded}
                    variant="outline"
                    className="ml-6"
                  >
                    Refresh
                    <RotateCcw />
                  </Button>
                </div>

                {/* <AddSupplierDialog/> */}
                {/* <AddCategoryDialog/> */}
                <AddProductDialog
                  categories={categories}
                  suppliers={suppliers}
                  onProductAdded={handleProductAdded}
                />
              </div>

              {/* Tab Content for "all" */}
              <TabsContent value={activeTab} className="w-full">
                {products.length > 0 ? (
                  <ProductTable products={products} />
                ) : (
                  <p className="p-4 text-gray-500">No products found.</p>
                )}
              </TabsContent>
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
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      </div>

      {/* Pie Chart */}
      <CategoryDistribution />

      {/* Toast container */}
      <ToastContainer />
    </>
  );
}
