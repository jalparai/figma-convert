import { create } from "zustand";
import { IProfile, ProfileState } from "./profile/state";

const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    name: "",
    permissions: [],
    id: "",
    role: "",
    branchId: "",
    password: "",
    lastname: "",
    createdAt: "",
    updatedAt: "",
  },
  setProfile: (profile: IProfile) => set(() => ({ profile})),
}));

export { useProfileStore };
