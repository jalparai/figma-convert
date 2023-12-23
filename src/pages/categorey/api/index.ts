import { toast } from "react-toastify";
import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllCategories = async () => {
  try {
    const response = await api.get(URLS.categories.getAll);
    const data = response?.data.map((ele: any) => {
      return {
        id: ele.id,
        title: ele.title,
        isSubCategory: ele.is_sub_category,
        rank: ele.rank,
        image: ele.image,
        createdAt: ele.createdAt,
      };
    });
    return data;
  } catch (err) {}
};

export const addNewCategory: any = async (payload: Object) => {
  try {
    return await api.post(URLS.categories.add, payload);
  } catch (err) {
    return err;
  }
};

export const getCategoryById: any = async (id: string) => {
  try {
      const response = await api.get(URLS.categories.get(id));

      return response.data;
  } catch (err) {
      return err;
  }
}

export const updateCategoryById: any = async (id: string, payload: any) => {
  try {
    const response = await api.put(URLS.categories.get(id), payload);
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteCategoryById: any = async (id: string) => {
    try {
        const response = await api.delete(URLS.categories.get(id));
        toast.success("Category deleted")
        return response;

    } catch (err: any) {
      toast.error("Error Deleting Category", err.message)
        return err;
    }
}