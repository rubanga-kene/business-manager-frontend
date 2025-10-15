
import { Category } from '@/lib/types';
import API  from '@/lib/axios'; 
import { toast } from "react-toastify";

// To fetch all the categories
export const fetchCategories = async (): Promise<Category[]> => {
  let allCategories: Category[] = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const res = await API.get<{
      count: number;
      next: string | null;
      results: Category[];
    }>(`/categories/?page=${page}`);

    allCategories = [...allCategories, ...res.data.results];

    hasNext = !!res.data.next;
    page += 1;
  }

  return allCategories;
};


// To add category to the backend
interface CategoryFormData {
  category_name: string;
  category_description: string;
}

export const addCategory = async (
  data: CategoryFormData,
  // reset: () => void
) => {
  try {
    const res = await API.post("/categories/", {
      category_name: data.category_name,
      category_description: data.category_description,
    });

    toast.success("Category added successfully!", { position: "top-center" });
    return res.data
    //  if (reset) reset()
  } catch {
    toast.error("Category already exists", { position: "top-center" });
  }
};


// To delete category

export async function deleteCategory(
  id: number,
  name: string,
  onSuccess?: () => void
) {
  try {
    await API.delete(`/categories/${id}/delete/`)

    toast.success( `${name} was successfully deleted.`,{position:'top-center'})

    onSuccess?.()
  } catch (error) {
    toast.error(`Failed to delete ${name}.`,{position:'top-center'})
    console.error(error)
  }
}

// To update
type UpdateCategoryData = {
  category_name: string;
  category_description:string | null;
};
export async function updateCategory(
  id: number,
  data: UpdateCategoryData,
  onSuccess?: () => void
) {
  try {
    await API.put(`/categories/${id}/update/`, data);

    toast.success(`${data.category_name} was successfully updated.`, {
      position: "top-center",
    });

    onSuccess?.();
  } catch (error) {
    toast.error(`Failed to update ${data.category_name}.`, {
      position: "top-center",
    });
    console.error(error);
  }
}

// Summary
type CategorySummary = {
  total_categories: number;
  most_populated: { name: string; count: number } | null;
  least_populated: { name: string; count: number } | null;
  uncategorized_count: number;
};

export const fetchCategorySummary = async (): Promise<CategorySummary> => {
  const res = await API.get<CategorySummary>('/category-summary/');
  return res.data;
};




    