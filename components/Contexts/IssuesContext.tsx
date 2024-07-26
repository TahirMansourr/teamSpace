'use client'
import { IssueDto, ProjectDto, UserDto } from "@/Utils/types";
import { createContext, useContext, useEffect, useState } from "react";
import { createOrUpdateIssueForm } from "../Forms/createOrUpdateIssue";
import { CreateIssue, UpdateIssue } from "@/lib/actions/IssueActions";
import { socket } from "@/socket";

type IssuesContextDto = {
    allIssues : IssueDto[], 
    formLoading : boolean,
    handleCreateIssue : ( values : createOrUpdateIssueForm , close :() => void)=>void
    handleUpdateIssue : ( values : createOrUpdateIssueForm , close :() => void)=>void
}
 const IssuesContext = createContext<IssuesContextDto>({} as IssuesContextDto)
 
 export const useIssuesContext = () => {
    if(IssuesContext === undefined){
        throw new Error(`Error at IssuesContext, You probably forgot to wrap the consumer component with the Issues Context`)
    }else{
        return useContext(IssuesContext)
    }
 }

 const IssuesProvider = ({children , project , user} : {children : React.ReactNode , project : ProjectDto , user : UserDto }) => {

    const [userInfo , setUserInfo] = useState<UserDto>(user)
    const [issuesInfo , setIssuesInfo] = useState<IssueDto[]>(project.issues)
    console.log("🚀 ~ IssuesProvider ~ issuesInfo:", issuesInfo)
    const [formLoading , setFormLoading] = useState<boolean>(false)

    async function handleCreateIssue( values : createOrUpdateIssueForm , close : ()=>void){
        console.log(values , 'thhhhhhhhhh');
        const assignedToMembers  = values.assignedTo.map((id) =>{
            const assignedToMember = project.team.find( (member : UserDto) => id === member._id)
            return assignedToMember
        }).filter((id) => id !== undefined)
        
        try {
            setFormLoading(true)
            CreateIssue({
                assignedTo : values.assignedTo,
                description : values.description,
                dueDate : values.dueDate,
                name : values.name,
                priority : values.priority,
                projectId : project._id,
                status : values.status,
                tags : values.tags,
                userId : userInfo._id
            }).then((res) => {
                const newIssue = {
                    ...values,
                    _id : res.issue._id,
                    assignedTo : assignedToMembers ? assignedToMembers : [] as UserDto[],
                    creationDate : res.issue.creationDate
                }
                // socket.emit('createIssue' , newIssue)
                setIssuesInfo((prev : IssueDto[]) => [newIssue , ...prev])
                // setIssuesInfo((prev) => [...prev , newIssue])
            })
        } catch (error) {
            throw new Error(`error at handleCreateIssue : ${error}`);
            
        }finally{
            setFormLoading(false)
            close
        }
    }
    async function handleUpdateIssue( values : createOrUpdateIssueForm , close : ()=>void){
        console.log(values , 'thhhhhhhhhh');
        const assignedToMembers  = values.assignedTo.map((name) =>{
            const assignedToMember = project.team.find( (member : UserDto) => name === member.username)
            return assignedToMember
        }).filter((id) => id !== undefined)
        
        try {
            setFormLoading(true)
            UpdateIssue({
                _id : values._id as string,
                assignedTo : assignedToMembers.map((member : UserDto | undefined) => member ? member._id : ''),
                description : values.description,
                dueDate : values.dueDate,
                name : values.name,
                priority : values.priority,
                projectId : project._id,
                status : values.status,
                tags : values.tags,
                userId : userInfo._id
            }).then((res) => {
                const newIssue = {
                    ...values,
                    _id: values._id as string,
                    assignedTo : assignedToMembers ? assignedToMembers : [] as UserDto[],
                    creationDate : ''
                }
                // socket.emit('updateIssue' , newIssue)
                setIssuesInfo(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === newIssue._id ? newIssue : prevIssue)))
                // setIssuesInfo(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === newIssue._id ? newIssue : prevIssue)))
            })
        } catch (error) {
            throw new Error(`error at handleCreateIssue : ${error}`);
            
        }finally{
            setFormLoading(false)
            close
        }
    }

    useEffect(()=>{
        socket.on('createIssue' ,(issue : IssueDto) => {
            setIssuesInfo((prev : IssueDto[]) => [issue , ...prev])
        })
        socket.on('updateIssue' , (newIssue : IssueDto) => {
            setIssuesInfo(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === newIssue._id ? newIssue : prevIssue)))

        })
    } , [])

    const value = {
        allIssues : issuesInfo,
        formLoading,
        handleCreateIssue,
        handleUpdateIssue
    }
    return(
        <IssuesContext.Provider value={value}>
            {children}
        </IssuesContext.Provider>
    )
 }

 export default IssuesProvider