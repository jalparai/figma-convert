import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllSections = async (setSection: any) => {
  try {
    const response = await api.get(URLS.section.getAll);
    const data = response?.data.map((ele: any) => {
      return {
        id: ele.id,
        title: ele.title,
        branch: ele.branch,
        createdAt: ele.createdAt,
      };
    });
    setSection(data);
  } catch (err) {}
};

export const addNewSection: any = async (payload: Object) => {
  try {
    return await api.post(URLS.section.add, payload);
  } catch (err) {
    return err;
  }
};

export const getSectionById: any = async (id: string, setData: any) => {
    try {
        const response = await api.get(URLS.section.get(id));
        console.log("getSectionById.response", response)
        setData({id: response.data._id, ...response.data});

    } catch (err) {
        return err;
    }
}

export const updateSectionById: any = async (id: string, payload: any) => {
  try {
    const response = await api.put(URLS.section.get(id), payload);
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteSectionById: any = async (id: string) => {
  try {
    const response = await api.delete(URLS.section.get(id));
    return response;
  } catch (err) {
    return err;
  }
};
