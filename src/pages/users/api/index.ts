import { toast } from "react-toastify";
import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllUsers = async (setUsers: any) => {
  try {
    const response = await api.get(URLS.users.getAll);
    const data = response?.data.map((ele: any) => {
      return {
        id: ele.id,
        lastName: ele.name + " " + ele.lastname,
        createdAt: ele.createdAt,
      };
    });
    setUsers(data);
  } catch (err) {}
};

export const addNewUser: any = async (payload: any) => {
  try {
    const res = await api.post(URLS.users.add, payload);
    toast.success("User Added!")
    return res
  } catch (err: any) {
    toast.error("Error Adding user", err.message)
    return err;
  }
};

export const getUserById: any = async (id: string) => {
  try {
      const response = await api.get(URLS.users.get(id));
      return response.data;

  } catch (err) {
      return err;
  }
}

export const updateUserById: any = async (id: string, payload: any) => {
  try {
    const response = await api.put(URLS.users.get(id), payload);
    return response;
  } catch (err) {
    return err;
  }
};


export const deleteUserById: any = async (id: string) => {
  try {
    const response = await api.delete(URLS.users.get(id));
    toast.success("User Deleted")
    return response;
  } catch (err: any) {
    toast.error("Error Deleting User", err.message)
    return err;
  }
};
