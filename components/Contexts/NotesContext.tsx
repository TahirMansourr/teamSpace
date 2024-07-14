import { CreateNote } from "@/lib/actions/NoteAction"
import { NotesDto, ProjectDto, UserDto } from "@/Utils/types"
import { notifications } from "@mantine/notifications"
import { useContext, useState, createContext } from "react"

type NotesContextDto = {
 allNotes : NotesDto[],
 formLoading : boolean,
 handleCreateNote : (body : string) => void
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

    async function handleCreateNote(body : string){
        setFormLoading(true)
        try {
            await CreateNote({
                projectId : projectInfo._id,
                body,
                creator : userInfo._id
            })
        } catch (error) {
            throw new Error(`error at handleCreateNote : ${error}`)
        }finally{
            setFormLoading(false)
            notifications.show({ message : 'created new Note successfully' , color : 'green'})
        }
    }

    const value = {
        allNotes : notes,
        formLoading,
        handleCreateNote
    }

    return(
        <NotesContext.Provider value = {value}>
            {children}
        </NotesContext.Provider>
    )
 }

 export default NotesProvider