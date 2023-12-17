import api from "../../../utils/axios";
import { URLS } from "../../../utils/constants";

export const getAllCasesByBranchId = async (
  branchId: string,
  currentPage: number = 0,
  perPage: number = 10,
  setCases: any
) => {
  try {
    const response = await api.get(
      URLS.cases.getAllByBranchId(branchId, currentPage, perPage)
    );
    const data = response.data?.data;
    setCases(data);
  } catch (err) {}
};

export const getCaseById: any = async (id: string, setData: any) => {
  try {
    const response = await api.get(URLS.cases.get(id));
    setData(response.data);
  } catch (err) {
    return err;
  }
};
