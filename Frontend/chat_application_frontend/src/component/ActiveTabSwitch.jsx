import React from 'react'
import {useChatStore} from "../store/useChatStore.js";

const ActiveTabSwitch = () => {

    const {activeTab, setActiveTab} = useChatStore();
    return (
        <div className={'tabs tabs-boxed bg-transparent p-2 m-2'}>
            <button
                className={`tab  px-14 rounded-l-xl ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
                onClick={() => setActiveTab("chats")}>Chats
            </button>
            <button
                className={`tab px-14 rounded-r-xl ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
                onClick={() => setActiveTab("contacts")}>Contacts</button>
        </div>
    )
}

export default ActiveTabSwitch
