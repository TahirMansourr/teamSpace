'use client'
import { socket } from "@/socket";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface WorkSpaceContextDto{
    notesComponentExpandState : boolean
    tasksComponentExpandState : boolean
    issuesComponentExpandState : boolean
    chatComponentExpandState : boolean
    setNotesComponentExpandState : Dispatch<SetStateAction<boolean>>
    setTasksComponentExpandState : Dispatch<SetStateAction<boolean>>
    setIssuesComponentExpandState: Dispatch<SetStateAction<boolean>>
    setChatComponentExpandState: Dispatch<SetStateAction<boolean>>
}

const WorkSpaceContext = createContext<WorkSpaceContextDto>({} as WorkSpaceContextDto)

export const useWorkSpaceContext = () => {
    return useContext(WorkSpaceContext);
};

const WorkSpaceProvider = (
    {children}
    :
    {
        children : React.ReactNode
    }
)=>{
    const [ notesComponentExpandState , setNotesComponentExpandState] = useState<boolean>(false)
    const [ tasksComponentExpandState , setTasksComponentExpandState] = useState<boolean>(false)
    const [ issuesComponentExpandState , setIssuesComponentExpandState] = useState<boolean>(false)
    const [ chatComponentExpandState , setChatComponentExpandState] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        if (socket.connected) {
          onConnect();
        }
    
        function onConnect() {
          setIsConnected(true);
          setTransport(socket.io.engine.transport.name);
    
          socket.io.engine.on("upgrade", (transport : any) => {
            setTransport(transport.name);
          });
        }
    
        function onDisconnect() {
          setIsConnected(false);
          setTransport("N/A");
        }
    
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
    
        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
        };
      }, []);
      socket.on("hello" , (value : any)=>console.log(value))

    return(
        
        <WorkSpaceContext.Provider
            value={{
                notesComponentExpandState,
                setNotesComponentExpandState,
                tasksComponentExpandState ,
                setTasksComponentExpandState,
                issuesComponentExpandState ,
                setIssuesComponentExpandState,
                chatComponentExpandState ,
                setChatComponentExpandState
            }}
            >
            {children}
        </WorkSpaceContext.Provider>
    )
}

export default WorkSpaceProvider;