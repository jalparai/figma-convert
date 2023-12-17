import { create } from "zustand";
import { UserState } from "../state";

const useUserStore = create<UserState>()((set) => ({
  name: "",
  setUserName: (name) => set(() => ({ name: name })),
  isLoggedIn: false
}));

export default useUserStore;