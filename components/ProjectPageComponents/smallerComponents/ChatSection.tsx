'use client'
import { useChatContext } from '@/components/Contexts/ChatContext'
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext'
import React from 'react'
import './chatSection.css'; // Import your custom CSS file

const ChatSection = () => {
  const { messages } = useChatContext();
  const { userInfo } = useWorkSpaceContext();
  const user = userInfo._id;

  return (
    <div className="flex flex-col w-full p-4 space-y-2">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble shadow-md whitespace-pre-line ${message.author === user ? 'bg-blue-500 text-white self-end sent' : 'bg-gray-200 text-gray-800 self-start received'}`}
          >
            {message.body}
          </div>
        ))
      ) : (
        <h1>No messages yet</h1>
      )}
    </div>
  );
}

export default ChatSection;
