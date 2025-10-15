import API from "@/lib/axios";
import { Supplier } from "@/lib/types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// To fetch suppliers
export const fetchSuppliers = async (): Promise<Supplier[]> => {
  let allSuppliers: Supplier[] = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const res = await API.get<{
      count: number;
      next: string | null;
      results: Supplier[];
    }>(`/suppliers/?page=${page}`);

    allSuppliers = [...allSuppliers, ...res.data.results];

    hasNext = !!res.data.next;
    page += 1;
  }

  return allSuppliers;
};


// To add Supplier to the backend
interface SupplierFormData {
  supplier_name: string;
  supplier_contact: string;
  supplier_address:string
}

export const addSupplier = async (
  data: SupplierFormData,
  // reset: () => void
) => {
  try {
    const res = await API.post("/suppliers/", {
      supplier_name: data.supplier_name,
      supplier_contact: data.supplier_contact,
      supplier_address: data.supplier_address,
    });

    toast.success("Supplier added successfully!", { position: "top-center" });
    return res.data
    // reset();
  } catch (error) {
    const axiosError = error as AxiosError<{ [key: string]: string[] }>;
    const errorData = axiosError.response?.data;

    console.error("Failed to add supplier", errorData || axiosError.message);
    toast.error("Failed to add supplier", { position: "top-center" });
  }
};


// To delete supplier
export async function deleteSupplier(
  id: number,
  name: string,
  onSuccess?: () => void
) {
  try {
    await API.delete(`/suppliers/${id}/delete/`)

    toast.success( `${name} deleted successfully .`,{position:'top-center'})

    onSuccess?.()
  } catch (error) {
    toast.error(`Failed to delete ${name}.`,{position:'top-center'})
    console.error(error)
  }
}

// To update
type UpdateSupplierData = {
  supplier_name: string;
  supplier_contact:string | null;
  supplier_address:string | null;
};
export async function updateSupplier(
  id: number,
  data: UpdateSupplierData,
  onSuccess?: () => void
) {
  try {
    await API.put(`/suppliers/${id}/update/`, data);

    toast.success(`${data.supplier_name}'s details updated successfully .`, {
      position: "top-center",
    });

    onSuccess?.();
  } catch (error) {
    toast.error(`Failed to update ${data.supplier_name}.`, {
      position: "top-center",
    });
    console.error(error);
  }
}