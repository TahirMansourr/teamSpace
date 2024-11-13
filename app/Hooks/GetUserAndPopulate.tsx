'use client'
import { GetProjectByIdAndPopulate } from "@/lib/actions/ProjectActions"
import { useEffect, useState } from "react"
import { GetUserInfo } from "../Utils"

export const UseGetUserAndPopulate = ({projectId } : {projectId : string}) => {
 const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
    const [opened , setOpened] = useState<boolean>(false)
    const [projectInfo , setProjectInfo] = useState<any>()
    const [user , setUser] = useState<any>()
    

    useEffect(()=>{
     async function getProjectInfo(){
        const project = await GetProjectByIdAndPopulate({id : projectId})
        console.log("🚀 ~ getProjectInfo ~ project:", project)
        setProjectInfo(project)
      }
      const getUserInfoAndSetState = async () => {
        const user = await GetUserInfo()
        console.log("🚀 ~ getUserInfoAndSetState ~ user:", user)
        setUser(user)
        }
       getUserInfoAndSetState()
      getProjectInfo()
    },[])


    
    return {
        selectedItemInSideBar,
        setSelectedItemInSideBar,
        opened,
        setOpened,
        projectInfo,
        setProjectInfo,
        user,
        setUser
    }
}