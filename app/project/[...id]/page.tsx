'use client'
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/TeamWorkSpaceComponents/sideBar";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { AblyProvider, ChannelProvider } from "ably/react";
import * as Ably from 'ably';
import { UseGetUserAndPopulate } from "@/app/Hooks/GetUserAndPopulate";


export default function WorkSpace({params}:{params : {id : string[]}}) {

   const {
    selectedItemInSideBar , 
    setSelectedItemInSideBar,
    opened , 
    setOpened,
    projectInfo , 
    user 
    } = UseGetUserAndPopulate({projectId : params.id[0]})
    // const client = new Ably.Realtime({key :process.env.NEXT_PUBLIC_ABLY_KEY})
  return (
  <main className={`flex w-full h-screen p-2`}>
       { user && projectInfo &&
        <WorkSpaceProvider projectInfo = {projectInfo} userInfo={user}>
            {/* <AblyProvider client={client}> */}
              {/* <ChannelProvider channelName="get-started"> */}
                <SideBar
                  SelectedItemInSideBar={selectedItemInSideBar}
                  setSelectedItemInSideBar={setSelectedItemInSideBar}
                  setOpened={setOpened}
                  projectName = {projectInfo.project.name}
                  />
                <SelectedItemToRenderOnScreen
                  selectedItemInSideBar={selectedItemInSideBar}
                  setOpened = {setOpened}
                  opened = {opened}
                  />
                {/* </ChannelProvider> */}
               {/* </AblyProvider> */}
            </WorkSpaceProvider>
    
        
      }
   </main>
  );
}
