import Meetings from "./components/meetings"
import Messages from "./components/messagesComponent"
import ProjectsComponent from "./components/projectComponents/projectsComponent"
import Notification from "./components/notifications"
import { Dispatch, SetStateAction } from "react"
import Docs from "./components/ProjectPageComponents/Docs"
import MultiTabsComponent from "./components/ProjectPageComponents/MultiTabsComponent"
import NotesPageComponent from "./components/ProjectPageComponents/NotesPageComponent"
import IssuesPageComponent from "./components/ProjectPageComponents/IssuesPageComponent"
import TasksPageComponent from "./components/ProjectPageComponents/TasksPageComponent"
import FeaturesComponent from "./components/ProjectPageComponents/FeaturesComponent"
import Activity from "./components/ProjectPageComponents/Activity"
import Settings from "./components/ProjectPageComponents/Settings"

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
      case 'NotesPage':
        return <NotesPageComponent opened = {opened} setOpened = {setOpened}/>
      case 'IssuesPage':
        return <IssuesPageComponent opened = {opened} setOpened = {setOpened}/>
      case 'TasksPage':
        return <TasksPageComponent opened = {opened} setOpened = {setOpened}/>
      case 'Features':
        return <FeaturesComponent opened = {opened} setOpened = {setOpened}/>
      case 'Activity':
        return <Activity opened = {opened} setOpened = {setOpened}/>
      case 'Settings':
        return <Settings opened = {opened} setOpened = {setOpened}/>
      default: 
        return <MultiTabsComponent opened = {opened} setOpened = {setOpened}/>
    }
}
