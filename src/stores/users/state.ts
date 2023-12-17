export interface UserState {
  name: string;
  isLoggedIn: boolean;
  setUserName: (name: string) => void;
}
