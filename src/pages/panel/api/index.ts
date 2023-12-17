import { toast } from "react-toastify";
import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getProfileData = async () => {
  try {
    const response = await api.get(URLS.profile.get);
    console.log("Profile: ", response.data);
    const {
      _id,
      name,
      permissions,
      role,
      branchId,
      password,
      lastname,
      createdAt,
      updatedAt,
    } = response.data;
    return {
      id: _id,
      name,
      permissions,
      role,
      branchId,
      password,
      lastname,
      createdAt,
      updatedAt,
    };
  } catch (error) {
    toast.error("Error Occured while fetching profile.")
  }
};
