import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../component/ProfileHeader";
import ActiveTabSwitch from "../component/ActiveTabSwitch";
import ChatsList from "../component/ChatsList";
import ContactList from "../component/ContactList";
import ChatContainer from "../component/ChatContainer";
import NoConversationPlaceHolder from "../component/NoConversationPlaceHolder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
  <div className="w-full max-w-8xl h-[850px] flex rounded-lg overflow-hidden border border-slate-700">
    {/* left side */}
    <div className="w-100 shrink-0 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700">
      <ProfileHeader />
      <ActiveTabSwitch />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === "chats" ? <ChatsList /> : <ContactList />}
      </div>
    </div>

    {/* right side */}
    <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
      {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
    </div>
  </div>
);
};

export default ChatPage;
