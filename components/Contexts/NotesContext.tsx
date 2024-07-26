'use client'
import { CreateNote, UpdateNote } from "@/lib/actions/NoteAction"
import { socket } from "@/socket"
import { NotesDto, ProjectDto, UserDto } from "@/Utils/types"
import { notifications } from "@mantine/notifications"
import { useContext, useState, createContext, useEffect, useRef } from "react"

type NotesContextDto = {
 allNotes : NotesDto[],
 formLoading : boolean,
 handleCreateNote : (body : string , close : ()=>void) => void
 handleUpdateNote : (existingNote : NotesDto , close : ()=>void) => void
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
    const [activeUsers , setActiveUsers] = useState<string[]>([])
    const didMountRef = useRef(false);

    async function handleCreateNote(body : string, close : ()=>void){
        setFormLoading(true)
        try {
             CreateNote({
                projectId : projectInfo._id,
                body,
                creator : userInfo._id
            }).then((res : {status : string , note : NotesDto})=>{
              setNotes((prev : NotesDto[]) => [{...res.note , creator : userInfo} , ...prev])
                // socket.emit('newNote' , res.note)
                // console.log('emmitted');
                
            })
           
        } catch (error) {
            throw new Error(`error at handleCreateNote : ${error}`)
        }finally{
            setFormLoading(false)
            close()
            notifications.show({ message : 'created Note successfully' , color : 'green'})
        }
    }
    async function handleUpdateNote(existingNote: NotesDto, close: () => void) {
      setFormLoading(true);
      try {
         UpdateNote({
          projectId: projectInfo._id,
          body: existingNote.body,
          creator: existingNote.creator._id,
          createdAt : existingNote.createdAt,
          _id: existingNote._id
        }).then((res : {status : string , note : NotesDto})=>{
          const UpdateNote = {...res.note , creator : existingNote.creator}
          setNotes(((prev : NotesDto[])=> prev.map((prevNote : NotesDto) => {return prevNote._id === UpdateNote._id ? UpdateNote : prevNote})))
          // socket.emit('updateNote', {...res.note , creator : existingNote.creator});
        })
    
         // Emit the updated note
        notifications.show({ message: 'Updated Note successfully', color: 'blue' });
      } catch (error) {
        throw new Error(`error at handleUpdateNote : ${error}`);
      } finally {
        setFormLoading(false);
        close();
      }
    }

    useEffect(() => {
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
            setActiveUsers((prev : string[]) => [...prev , userInfo.username])
              console.log(userInfo.username , 'is now connected');
              console.log('Notes Is Connected');
              
            socket.io.engine.on("upgrade", (transport : any) => {
              setTransport(transport.name);
            });
            socket.on('connection' , (socket :any) => {
              socket.join('thisRoom')
            })
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
            setNotes(((prev : NotesDto[])=> prev.map((prevNote : NotesDto) => {return prevNote._id === note._id ? note : prevNote})))
          })
          function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
            console.log('i am connected disconnected');
          }
      
          socket.on("connect", (userInfo : UserDto) =>{
              onConnect
            });
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