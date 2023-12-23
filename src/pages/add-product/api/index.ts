import { toast } from "react-toastify";
import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllCategories: any = async () => {
    try {
        const response = await api.get(URLS.categories.getAll);
        const data = response?.data.map((ele: any) => {
            return {
                id: ele.id,
                title: ele.title,
                isSubCategory: ele.is_sub_category,
                rank: ele.rank,
            }
        });
        return data
    } catch (err) {
        
    }
};

export const getAllAllergen = async (setAllAllergen: any) => {
    try {
        const response = await api.get(URLS.allergen.getAll);
        const data = response?.data.map((ele: any) => {
            return {
                id: ele.id,
                title: ele.title,
            }
        });
        setAllAllergen(data);
    } catch (err) {
        
    }
};


export const addNewProduct: any = async (payload: Object) => {
    try {
        return await api.post(URLS.products.add, payload);
    } catch (err) {
        return err;
    }
}

export const getProductById: any = async (id: string, setData: any) => {
    try {
        const response = await api.get(URLS.products.get(id));
        setData(response.data);

    } catch (err) {
        return err;
    }
}

export const updateProductById: any = async (id: string, payload: any) => {
    try {
        const response = await api.put(URLS.products.get(id), payload);
        return response;

    } catch (err) {
        return err;
    }
}


export const deleteProductById: any = async (id: string) => {
    try {
        const response = await api.delete(URLS.products.get(id));
        toast.success("Product Deleted")
        console.log("==================>",response)
        return response;

    } catch (err: any) {
        toast.error("Error while deleting Product", err?.message)
        return err;
    }
}
