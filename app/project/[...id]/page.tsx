'use client'
import { GetUserInfo } from "@/app/Utils";
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/ProjectPageComponents/sideBar";
import { GetProjectByIdAndPopulate } from "@/lib/actions/ProjectActions";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { useEffect, useState } from "react";

export default function WorkSpace({params}:{params : {id : string[]}}) {
    // console.log("🚀 ~ WorkSpace ~ params:", params)
    const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
    const [opened , setOpened] = useState<boolean>(false)
    const [projectInfo , setProjectInfo] = useState<any>()
    const [user , setUser] = useState<any>()

    useEffect(()=>{
     async function getProjectInfo(){
        const project = await GetProjectByIdAndPopulate({id : params.id[0]})
        console.log("🚀 ~ getProjectInfo ~ project:", project)
        setProjectInfo(project)
      }
      const getUserInfoAndSetState = async () => {
        const user = await GetUserInfo()
        console.log("🚀 ~ getUserInfoAndSetState ~ user:", user.data)
        setUser(user.data)
        }
       getUserInfoAndSetState()
      getProjectInfo()
    },[])

  return (
    <main className="flex w-full min-h-screen">
     { user && projectInfo &&
        <WorkSpaceProvider projectInfo = {projectInfo} userInfo={user}>
            <SideBar
              SelectedItemInSideBar={selectedItemInSideBar}
              setSelectedItemInSideBar={setSelectedItemInSideBar}
              setOpened={setOpened}
              />
            <SelectedItemToRenderOnScreen
              selectedItemInSideBar={selectedItemInSideBar}
              setOpened = {setOpened}
              opened = {opened}
              />
        </WorkSpaceProvider>
      }
   </main>
  );
}
