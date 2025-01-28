"use client";
import { CreateMessage } from "@/lib/actions/MessageActions";
import { socket } from "@/socket";
import { useForm, UseFormReturnType } from "@mantine/form";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { MesssageDto } from "@/Utils/types";

type chatContextDTO = {
  messageForm: UseFormReturnType<{ body: string }>;
  handleSendMessage: Function;
  messages: MesssageDto[] | null;
};
const ChatContext = createContext<chatContextDTO>({} as chatContextDTO);
export const useChatContext = () => {
  return useContext(ChatContext);
};
const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, projectInfo } = useWorkSpaceContext();
  const [messages, setMessages] = useState<MesssageDto[]>(
    projectInfo.project.chatSpace
  );

  useEffect(() => {
    console.log("Chat Context Rerendered");

    socket.on("Groupmessage", (message: any) => {
      console.log("🚀 ~ message:", message);
      if (message) {
        setMessages((prev: any) => [...prev, message]);
      } else {
        console.error(
          "Received message is undefined or has no response property:",
          message
        );
      }
      console.log("new message:", message);
    });

    return () => {
      socket.off("Groupmessage");
    };
  }, []);


  const messageForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      body: "",
    },
  });

  async function handleSendMessage({ body }: { body: string }) {
    console.log("🚀 ~ handleSendMessage ~ body:", body);

    const newMessage = await CreateMessage({
      body,
      userId: userInfo._id,
      projectId: projectInfo.project._id,
    });
    if (newMessage.status === "success") {
      
      socket.emit("Groupmessage", {
        room: projectInfo.project._id,
        value: newMessage.response,
      });
    }else{
      console.error("Failed to send message:",newMessage);
    }
  }
  const value = {
    messageForm,
    handleSendMessage,
    messages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
