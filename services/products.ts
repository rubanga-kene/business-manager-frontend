
import API  from '@/lib/axios'; 
import  {PaginatedResponse, Product}  from '@/lib/types'; 
import { AxiosError } from "axios";
import { toast } from 'react-toastify';

// To fetch all products from the frontend
export const fetchPaginatedProducts = async (
  page = 1,
  pageSize = 5,
  category = "",
  search = ""
): Promise<PaginatedResponse<Product>> => {
  let query = `/products/?page=${page}&page_size=${pageSize}`;
  if (category !== "all") query += `&category=${category}`;
  if (search) query += `&search=${encodeURIComponent(search)}`;

  const res = await API.get<PaginatedResponse<Product>>(query);
  return res.data;
};


// To add products to the backend

export type ProductFormData = {
  category_id: string;
  supplier_id: string;
  product_name: string;
  product_description: string;
  unit_price: number;
  quantity: number;
  m_date?: string;
  e_date?: string;
};

export const addProduct = async (
  data: ProductFormData
): Promise<void> => {
  try {
    await API.post("/products/", {
      category_id: parseInt(data.category_id),
      supplier_id: parseInt(data.supplier_id),
      product_name: data.product_name,
      product_description: data.product_description,
      unit_price: data.unit_price,
      quantity: data.quantity,
      m_date: data.m_date || null,
      e_date: data.e_date || null,
    });
  } catch (err) {
    const error = err as AxiosError<{ [key: string]: string[] }>;
    console.error("Failed to add product", error.response?.data || error.message);
    throw error;
  }
};


// Summary
type InventorySummary = {
  newest: Product | null;
  highest_quantity: Product | null;
  lowest_quantity: Product | null;
};

export const fetchInventorySummary = async (): Promise<InventorySummary> => {
  const res = await API.get<InventorySummary>('/inventory-summary/');
  return res.data;
};

// Category distribution
export const fetchCategoryDistribution = async (): Promise<{ name: string; value: number }[]> => {
  const res = await API.get("/category-distribution/");
  return res.data;
};


// To delete product

export async function deleteProduct(
  id: number,
  name: string,
  onSuccess?: () => void
) {
  try {
    await API.delete(`/products/${id}/delete/`)

    toast.success( `${name} was successfully deleted.`,{position:'top-center'})

    onSuccess?.()
  } catch (error) {
    toast.error(`Failed to delete ${name}.`,{position:'top-center'})
    console.error(error)
  }
}


// To update product
export const updateProduct = async (
  id: number,
  data: ProductFormData
): Promise<void> => {
  try {
    await API.put(`/products/${id}/update/`, {
      category_id: parseInt(data.category_id),
      supplier_id: parseInt(data.supplier_id),
      product_name: data.product_name,
      product_description: data.product_description,
      unit_price: data.unit_price,
      quantity: data.quantity,
      m_date: data.m_date || null,
      e_date: data.e_date || null,
    });

    toast.success( `Product updated successfully.`,{position:'top-center'})
  } catch (err) {
    const error = err as AxiosError<{ [key: string]: string[] }>;
    console.error("Failed to update product", error.response?.data || error.message);
    toast.error( `Failed to add products.`,{position:'top-center'})
    throw error;
  }
};



