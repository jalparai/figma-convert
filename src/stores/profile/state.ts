export interface IProfile {
  name: string;
  permissions: number[];
  id: string;
  role: string;
  branchId: string;
  password: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProfileState {
  profile: IProfile,
  setProfile: (profile:any) => void
}
