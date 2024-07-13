import { NotesDto, ProjectDto, UserDto } from "@/Utils/types"
import { useContext, useState, createContext } from "react"

type NotesContextDto = {
 allNotes : NotesDto[],
 formLoading : boolean
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

    const value = {
        allNotes : notes,
        formLoading
    }

    return(
        <NotesContext.Provider value = {value}>
            {children}
        </NotesContext.Provider>
    )
 }

 export default NotesProvider