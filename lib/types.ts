// types.ts
export interface Category {
  id: number;
  category_name: string;
  category_description: string | null;
}

export interface Supplier {
  id: number;
  supplier_name: string;
  supplier_contact: string;
  supplier_address: string;
}

export interface Product {
  id: number;
  product_name: string;
  product_description: string | null;
  quantity: number;
  unit_price: number; // from your API response
  m_date: string;
  e_date: string;
  category: Category;
  supplier: Supplier;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}