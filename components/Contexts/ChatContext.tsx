'use client'
import { socket } from "@/socket";
import { createContext, useContext, useEffect, useState } from "react";

type chatContextDTO = {
    trial : () => void
}
const ChatContext = createContext<chatContextDTO>({} as chatContextDTO )
export const useChatContext = () =>{
    return useContext(ChatContext)
}
const ChatProvider = ({children} : {children : React.ReactNode})=>{

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
      const value ={
        trial
      }
    
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;