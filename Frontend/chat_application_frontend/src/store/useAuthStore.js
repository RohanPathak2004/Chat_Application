import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoginUp: false,
  isLogout: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (err) {
      console.log("Error in authCheck:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    // console.log(data);
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (err) {
      console.log("Error in Signup", err);
      set({ authUser: null });
      toast.error(err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoginUp: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const userData = res.data;
      set({ authUser: userData.data });
      toast.success("Logged In");
    } catch (e) {
      console.log("Error in Login Store", e);
      set({ authUser: null });
      toast.error("Error in Login.");
    } finally {
      set({ isLoginUp: false });
    }
  },

  logout: async () =>{
    set({isLogout:true})
    try {
        const res = await axiosInstance.post('/auth/logout');
        set({authUser:null});
        toast.success("Logged Out");
    } catch (error) {
        console.log("Error in logout",error);
        toast.error("Error in Logout");
    } finally {
        set({isLogout:false});
    }
  },

  updateProfile: async (data)=>{
    try{

      const res = await axiosInstance.put('/auth/update/profile',data);
      set({authUser:res.data});
      toast.success("Update Profile Photo");
    }catch(err){
      console.log("Error in update profile",err);
      toast.error("Error in updating profile photo");
    }
  }
}));
