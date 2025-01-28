"use client";
import { useChatContext } from "@/components/Contexts/ChatContext";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";
import React from "react";

const ChatSection = () => {
  const { messages } = useChatContext();
  const { userInfo } = useWorkSpaceContext();
  const user = userInfo._id;

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full p-6 space-y-4 overflow-y-auto">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => {
          const date = new Date(message.createdAt);
          const isSentByUser = message.author?._id === user || 'undefined';
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const showSender =
            !previousMessage ||
            previousMessage.author._id !== message.author._id;

          const showDateSeparator =
            !previousMessage ||
            new Date(previousMessage.createdAt).toDateString() !==
              date.toDateString();

          return (
            <React.Fragment key={index}>
              {showDateSeparator && (
                <div className="flex justify-center my-4">
                  <span className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                    {formatDate(date)}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col max-w-[70%] ${
                  isSentByUser ? "items-end self-end" : "items-start self-start"
                }`}
              >
                {showSender && (
                  <span className="text-sm text-gray-600 font-medium mb-1">
                    {message.author.username}
                  </span>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm flex flex-col ${
                    isSentByUser
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed mb-2">{message.body}</p>
                  <span
                    className={`text-[10px] flex justify-end ${
                      isSentByUser ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {date.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No messages yet</p>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
