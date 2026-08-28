import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
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

  signup: async (data)=>{
    console.log(data);
    set({isSigningUp:true});
    try{
        const res = await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data});
        toast.success("Account created successfully!")
    }catch(err){
        console.log("Error in Signup",err);
        set({authUser:null})
        toast.error(err.message);
    }finally{
        set({isSigningUp:false})
    }
  }

}));
