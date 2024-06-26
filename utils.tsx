import Meetings from "./components/meetings"
import Messages from "./components/messagesComponent"
import ProjectsComponent from "./components/projectComponents/projectsComponent"
import Notification from "./components/notifications"
import { Dispatch, SetStateAction } from "react"
import Docs from "./components/ProjectPageComponents/Docs"
import MultiTabsComponent from "./components/ProjectPageComponents/MultiTabsComponent"

export const SelectedItemInSideBarToRenderOnScreen = ({
  selectedItemInSideBar,
  opened,
  setOpened,
  user 
} : {
  selectedItemInSideBar  : string,
  opened : boolean,
  setOpened : Dispatch<SetStateAction<boolean>>,
  user : any


}) : React.ReactNode => {
    switch (selectedItemInSideBar) {
      case 'projects':
         return <ProjectsComponent  opened = {opened} setOpened = {setOpened} user = {user}/>
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
export const SelectedItemToRenderOnScreen = ({
  selectedItemInSideBar,
  opened,
  setOpened,
} : {
  selectedItemInSideBar  : string,
  opened : boolean,
  setOpened : Dispatch<SetStateAction<boolean>>,

}) : React.ReactNode => {
    switch (selectedItemInSideBar) {
      case 'Docs':
         return <Docs  opened = {opened} setOpened = {setOpened}/>
      case 'TeamSpace':
        return <MultiTabsComponent opened = {opened} setOpened = {setOpened}/>
      default: 
        return <MultiTabsComponent opened = {opened} setOpened = {setOpened}/>
    }
}