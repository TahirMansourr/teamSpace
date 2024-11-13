'use client'
import { useChatContext } from '@/components/Contexts/ChatContext'
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext'
import React from 'react'
import './chatsection.css'; // Import your custom CSS file

const ChatSection = () => {
  const { messages } = useChatContext();
  const { userInfo } = useWorkSpaceContext();
  const user = userInfo._id;

  return (
    <div className="flex flex-col w-full p-4 space-y-2">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => {
          const date = new Date (message.createdAt)
          return(
            <div
            key={index}
            className={`chat-bubble shadow-md whitespace-pre-line ${message.author._id === user ? 'bg-blue-500 text-white self-end sent' : 'bg-gray-200 text-gray-800 self-start received'}`}
            >
            <header className=' font-bold mb-2'>
              {message.author.username}
            </header>
            <div >
              {message.body}
            </div>
            <footer className='text-right mt-2'>
              {date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'})}
            </footer>
          </div>
          )
        })
      ) : (
        <h1>No messages yet</h1>
      )}
    </div>
  );
}

export default ChatSection;
