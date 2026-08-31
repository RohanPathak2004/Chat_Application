import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {

  const {logout,isLogout} = useAuthStore();

  const handleLogout = (e)=>{
    e.preventDefault();
    console.log("clicked");
    logout();
  }

  return (
    <div className='z-10'>
      <button disabled={isLogout} onClick={(e)=>handleLogout(e)} className='bg-red-500 text-white p-4 z-10'>Logout</button>
    </div>
  )
}

export default ChatPage
