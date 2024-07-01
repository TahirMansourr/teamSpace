'use client'
import { CreateMessage } from "@/lib/actions/MessageActions";
import { socket } from "@/socket";
import { useForm, UseFormReturnType } from "@mantine/form";
import { createContext, useContext, useEffect, useState } from "react";

type chatContextDTO = {
    trial : () => void
    messageForm : UseFormReturnType<{body : string}>,
    handleSendMessage : Function
}
const ChatContext = createContext<chatContextDTO>({} as chatContextDTO )
export const useChatContext = () =>{
    return useContext(ChatContext)
}
const ChatProvider = ({children , user} : {children : React.ReactNode , user : any})=>{

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        if (socket.connected) {
          onConnect();
        }
    
        function onConnect() {
          setIsConnected(true);
          setTransport(socket.io.engine.transport.name);
            console.log('i am connected');
            
          socket.io.engine.on("upgrade", (transport : any) => {
            setTransport(transport.name);
          });
        }
        socket.on('message' , (any : any) =>{
            console.log('i am welcome' , any);
            
        })
    
        function onDisconnect() {
          setIsConnected(false);
          setTransport("N/A");
          console.log('i am connected disconnected');
        }
    
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
       
    
        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
        };
      }, []);

     
      function trial(){
        console.log('i am clicked');
        socket.emit('hello' ,'tahir'
        )
      }
      
      const messageForm = useForm({
        mode : 'uncontrolled',
        initialValues : {
            body : ''
        }
      })

      async function handleSendMessage({body} : {body : string}) {
        console.log("🚀 ~ handleSendMessage ~ body:", body)
        
        const newMessage = await CreateMessage({body , userId : user._id})
        console.log("🚀 ~ handleSendMessage ~ newMessage:", newMessage)
      }
      const value ={
        trial,
        messageForm,
        handleSendMessage
      }

    
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;