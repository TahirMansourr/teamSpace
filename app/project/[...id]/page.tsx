'use client'
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/ProjectPageComponents/sideBar";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { useState } from "react";

export default function WorkSpace() {
    const [selectedItemInSideBar , setSelectedItemInSideBar] = useState<string>('projects')
    const [opened , setOpened] = useState<boolean>(false)
  return (
   <WorkSpaceProvider>
      <main className="flex w-full min-h-screen">
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
      </main>
   </WorkSpaceProvider>
  );
}
