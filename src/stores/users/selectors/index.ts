import { UserState } from "../state";

const getUsername = (state: UserState) => state.name; // Specify state type for clarity
const isLoggedIn = (state: UserState) => state.isLoggedIn; // Explicitly declare state type for selector

export { getUsername, isLoggedIn };