import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", _id: 23, age: 23 }, //states
  isLoading: false,
  isLoggedIn:false,
  login: () => {
   set({isLoggedIn:true})
  },
}));
