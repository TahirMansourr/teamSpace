'use client'
import { CreateMessage } from "@/lib/actions/MessageActions";
import { socket } from "@/socket";
import { useForm, UseFormReturnType } from "@mantine/form";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { MesssageDto } from "@/Utils/types";
import { useChannel, useConnectionStateListener } from "ably/react";

type chatContextDTO = {
    trial : () => void
    messageForm : UseFormReturnType<{body : string}>,
    handleSendMessage : Function,
    messages : MesssageDto[] | null
}
const ChatContext = createContext<chatContextDTO>({} as chatContextDTO )
export const useChatContext = () =>{
    return useContext(ChatContext)
}
const ChatProvider = ({children } : {children : React.ReactNode })=>{
    
    const {userInfo , projectInfo} = useWorkSpaceContext()
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [messages , setMessages] = useState<MesssageDto[]>(projectInfo.project.chatSpace)
    // console.log("🚀 ~ ChatProvider ~ projectInfo:", projectInfo)
    // console.log("🚀 ~ ChatProvider ~ messages:", messages)
    const didMountRef = useRef(false);

    // @ uncomment me to use Ably {
    // const { channel } = useChannel('get-started', 'first', (message) => {
    //   console.log("🚀 ~ const{channel}=useChannel ~ message:", message)
    //   console.log(message);
      
    //   setMessages((prev: any) => [...prev, message.data]);
    // });
    // useConnectionStateListener('connected', () => {
    //   console.log('Connected to Ably!');
    // });}
   

    useEffect(() => {
      console.log('Chat Context Rerendered');
      
      if (didMountRef.current) {
        return;
    }
    didMountRef.current = true;
   
    console.log('Chat Context Rerendered');
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
        socket.on('Groupmessage', (message: any) => {
          if (message) {
              setMessages((prev: any) => [...prev, message]);
          } else {
              console.error('Received message is undefined or has no response property:', message);
          }
          console.log('new message:', message);
      });
    
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
        
        const newMessage = await CreateMessage({body , userId : userInfo._id , projectId : projectInfo.project._id})
        console.log("🚀 ~ handleSendMessage ~ newMessage:", newMessage)
        setMessages((prev: any) => [...prev, newMessage.response]);
        //uncomment me to use Ably{
        // channel.publish('first' , { ...newMessage.response , author : userInfo});}
        // socket.emit('Groupmessage' , newMessage.response)
        console.log("🚀 ~ handleSendMessage ~ newMessage:",{ ...newMessage.response , author : userInfo})
      }
      const value ={
        trial,
        messageForm,
        handleSendMessage,
        messages
      }

    
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;