import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllOptions = async (setData: any) => {
    try {
       const response = await api.get(URLS.options.getAll);
       const data = response?.data.map((ele: any) => {
        
        return {
            id: ele.id,         
            special_name: ele.special_name,
           date: ele.createdAt,
           name:ele.name
        }   
       
      
       });
       setData(data); 
    } catch (err) {
        return [];
    }

};

export const updateOptionSettingAPI = async (id: string, status: boolean) => {
    try {
        await api.put(URLS.options.setting(id, status));
    } catch (err) {
        
    }
    console.log(id,'>>>>>>>>option>>>>.')
}

export const getAllCategories = async () => {
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
        return data;
    } catch (err) {
        
    }
};
