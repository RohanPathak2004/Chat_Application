import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnable", get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => ({ setSelectedUser: selectedUser }),

  getAllContacts: async () => {
    set({isUsersLoading:true});
    try{

        const res = await axiosInstance.get("/message/chats");
        set({allContacts:res.data});
    }catch(e) {
        console.log("Error in getting all contacts",e);
        toast.error("Error in Loading Contacts.")
    }finally{
        set({isUsersLoading:false});
    }
  },

  getMyChatPartners: async () => {
    set({isUsersLoading:true});
    try{
        const res = await axiosInstance.get("/message/chats");
        set({chats:res.data});

    }catch(e){
        console.log("Error in Loading Chats",e);
        toast.error("Error in Loading Chats.");
    }finally{
        set({isUsersLoading:false});
    }
  },
}));
