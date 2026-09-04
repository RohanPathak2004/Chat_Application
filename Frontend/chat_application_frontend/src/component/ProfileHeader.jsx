import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState, useRef } from "react";
import { LogOutIcon } from "lucide-react";
const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  // const { isSoundEnabled, toggleSound } = useChatStore();
  const [ selectedImg, setSelectedImg ] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async ()=>{
      const base64str = reader.result;
      setSelectedImg(base64str);
      updateProfile({profilePic:base64str});
    }
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center gap-3">
        {/* avatar */}
        <div className="avatar avatar-online">
          <button
            className="size-16 rounded-full overflow-hidden relative group"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser.profilePic || "/profile.png"}
              alt={authUser.fullName}
              className="w-full h-full object-cover"
            />
            <div className="absolute rounded-full inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-xs">Change</span>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* username, online text & logout button */}
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[200px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-green-400 text-xs">Online</p>
          </div>

          <button
            className="text-red-400 hover:text-red-300 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
