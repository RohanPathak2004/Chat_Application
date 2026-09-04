import React, {useEffect} from 'react'
import {useChatStore} from "../store/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";

const ContactList = () => {

    const {getAllContacts, allContacts, setSelectedUser, isUsersLoading} = useChatStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts])

    if (isUsersLoading) return <UsersLoadingSkeleton/>;

    return (
        <div>
            {
                allContacts.map((contact) => (
                    <div
                        key={contact._id}
                        className={'bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'}
                        onClick={() => setSelectedUser(contact)}
                    >
                    <div className={'flex items-center gap-3'}>
                        <div className={'avatar avatar-online'}>
                            <div className={'size-12 rounded-full'}>
                                <img src={contact.profilePic || "profile.png"}/>
                            </div>
                        </div>
                        <h4 className={'text-slate-200 font-medium'} >{contact.fullName}</h4>
                    </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ContactList
