'use client'
import { CreateNote, UpdateNote } from "@/lib/actions/NoteAction"
import { socket } from "@/socket"
import { NotesDto, ProjectDto, UserDto } from "@/Utils/types"
import { notifications } from "@mantine/notifications"
import { useContext, useState, createContext, useEffect } from "react"

type NotesContextDto = {
 allNotes : NotesDto[],
 formLoading : boolean,
 handleCreateNote : (body : string) => void
 handleUpdateNote : (existingNote : NotesDto) => void
 isConnected : boolean
}

const NotesContext = createContext<NotesContextDto>({} as NotesContextDto)
 
 export const useNotesContext = () => {
    if(NotesContext === undefined){
        throw new Error(`Error at NotesContext, You probably forgot to wrap the consumer component with the Issues Context`)
    }else{
        return useContext(NotesContext)
    }
 }

 const NotesProvider = ({children , project , user} : {children : React.ReactNode , project : ProjectDto , user : UserDto }) =>{
    
    const [userInfo , setUserInfo] = useState<UserDto>(user)
    const [projectInfo , setProjectInfo] = useState<ProjectDto>(project)
    const [notes , setNotes] = useState<NotesDto[]>(project.notes)
    const [formLoading , setFormLoading] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    async function handleCreateNote(body : string){
        setFormLoading(true)
        try {
             CreateNote({
                projectId : projectInfo._id,
                body,
                creator : userInfo._id
            }).then((res : {status : string , note : NotesDto})=>{
                socket.emit('newNote' , res.note)
                console.log('emmitted');
                
            })
           
        } catch (error) {
            throw new Error(`error at handleCreateNote : ${error}`)
        }finally{
            setFormLoading(false)
            notifications.show({ message : 'created new Note successfully' , color : 'green'})
        }
    }
    async function handleUpdateNote(existingNote : NotesDto){
        UpdateNote({
            projectId : projectInfo._id,
            body : existingNote.body,
            creator : existingNote.creator._id,
            _id : existingNote._id
        }).then((res : {status : string , note : NotesDto}) => {
            socket.emit('updateNote' , {...res.note , creator : existingNote.creator})
        })
    }
    useEffect(() => {
        console.log('Chat Context Rerendered');
        
    //     if (didMountRef.current) {
    //       return;
    //   }
    //   didMountRef.current = true;
      console.log('Chat Context Rerendered');
          if (socket.connected) {
            onConnect();
          }
      
          function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);
              console.log('Notes Is Connected');
              
            socket.io.engine.on("upgrade", (transport : any) => {
              setTransport(transport.name);
            });
          }
          socket.on('newNote', (note : NotesDto) => {
            if(note){
                setNotes((prev : NotesDto[]) => [{...note , creator : userInfo} , ...prev])
                console.log('i was triggered');
                
            }else{
                console.error('Recieved Note is undefined or has not response property' , note)
            }
          })
          socket.on('updateNote' , (note : NotesDto) => {
            console.log('triggered');
            setNotes((prev : NotesDto[])=> prev.map((prevNote : NotesDto) => prevNote._id === note._id ? note : prevNote))
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
        }, [])
    const value = {
        allNotes : notes,
        formLoading,
        handleCreateNote,
        handleUpdateNote,
        isConnected
    }

    return(
        <NotesContext.Provider value = {value}>
            {children}
        </NotesContext.Provider>
    )
 }

 export default NotesProvider