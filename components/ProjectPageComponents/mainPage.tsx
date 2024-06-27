
import React from 'react'
import NotesComponent from './NotesComponent';
import TasksComponent from './TasksComponent';
import IssuesComponent from './IssuesComponent';
import ChatSpaceComponent from './ChatSpaceComponent';
import NotificationsBar from './NotificationsBar';

const MainPage = () => {
 
  return (
    <section className=' flex flex-col w-full  gap-2 rounded-xl   items-center justify-center p-3'>
        <NotificationsBar/>
        <section className=" flex w-full h-full  gap-2  items-center   ">
        <NotesComponent/> 
        <TasksComponent/> 
        <IssuesComponent/>
        <ChatSpaceComponent/>
      </section>
    </section>
    
      
  )
}

export default MainPage