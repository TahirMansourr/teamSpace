import Meetings from "./components/meetings"
import Messages from "./components/messagesComponent"
import ProjectsComponent from "./components/projectComponents/projectsComponent"
import Notification from "./components/notifications"
import { Dispatch, SetStateAction } from "react"
import ProjectProvider from "./components/Contexts/ProjectContext"

export const SelectedItemInSideBarToRenderOnScreen = ({
  selectedItemInSideBar,
  opened,
  setOpened
} : {
  selectedItemInSideBar  : string,
  opened : boolean,
  setOpened : Dispatch<SetStateAction<boolean>>


}) : React.ReactNode => {
    switch (selectedItemInSideBar) {
      case 'projects':
         return (
         <ProjectProvider>
            <ProjectsComponent  opened = {opened} setOpened = {setOpened}/>
         </ProjectProvider>)
      case 'messages':
        return <Messages opened = {opened} setOpened = {setOpened}/>
      case 'meetings':
       return <Meetings opened = {opened} setOpened = {setOpened}/>
      case 'notifications':
        return <Notification opened = {opened} setOpened = {setOpened}/>
      default:
        break;
    }
}