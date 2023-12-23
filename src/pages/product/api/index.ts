import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllProducts = async (setData: any) => {
  try {
    const response = await api.get(URLS.products.getAll);
    const data = response?.data.map((ele: any) => {
      return {
        id: ele.id,
        image: ele.image,
        name: ele.title,
        price: ele.prices.length > 0 ? ele.prices[0].price : 0,
        date: ele.createdAt,
        status: ele.active_list.length > 0 ? true : false,
        rank: ele.rank,
        barCode: ele.barcode,
        plu: ele.plu,
      };
    });
    setData(data);
  } catch (err) {
    return [];
  }
};

export const updateProductSettingAPI = async (id: string, status: boolean) => {
  try {
    await api.put(URLS.products.setting(id, status));
  } catch (err) {}
};

export const getAllCategories = async () => {
  try {
    const response = await api.get(URLS.categories.getAll);
    const data = response?.data.map((ele: any) => {
      return {
        id: ele.id,
        title: ele.title,
        isSubCategory: ele.is_sub_category,
        rank: ele.rank,
      };
    });
    return data;
  } catch (err) {}
};
