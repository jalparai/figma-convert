import { toast } from "react-toastify";
import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const updateDepartmentCode: any = async (payload: any) => {
  try {
    const response = await api.post(URLS.integration.add, payload);
    toast.success("Department code updated")
    return response;
  } catch (err) {
    toast.error("Error while updating the department code")
    return err;
  }
};
