'use client'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

const NotificationsBar = () => {
    const {
        notesComponentExpandState ,
        tasksComponentExpandState,
        setNotesComponentExpandState,
        setTasksComponentExpandState,
        issuesComponentExpandState,
        setIssuesComponentExpandState ,
        chatComponentExpandState,
        setChatComponentExpandState
        } = useWorkSpaceContext()
  return (
    <section className=' mx-auto flex bg-slate-100 rounded-lg p-2 gap-2 items-center shadow-lg'>
       <div>Status Bar:</div>
       <div className={` cursor-pointer transition-all ease-in-out duration-200 rounded-md px-2 bg-slate-600 text-white ${notesComponentExpandState ? 'p-1 opacity-100 shadow-sm ' : 'opacity-0 w-0 h-0 translate-x-10 '}`}
        onClick={()=> setNotesComponentExpandState(false)}
       >
            Notes
       </div>
       <div className={` cursor-pointer transition-all ease-in-out duration-200  rounded-md px-2  bg-slate-600 text-white ${tasksComponentExpandState ? 'p-1 opacity-100 shadow-sm ' : 'opacity-0 w-0 h-0 translate-x-10'}`}
        onClick={()=> setTasksComponentExpandState(false)}
       >
            Tasks
       </div>
       <div className={` cursor-pointer transition-all ease-in-out duration-200 rounded-md px-2  bg-slate-600 text-white ${issuesComponentExpandState ? 'p-1 opacity-100 shadow-sm' : 'opacity-0 w-0 h-0 translate-x-10'}`}
        onClick={()=> setIssuesComponentExpandState(false)}
       >
            Issues
       </div>
       <div className={` cursor-pointer transition-all ease-in-out duration-200 rounded-md px-2  bg-slate-600 text-white  ${chatComponentExpandState ? 'p-1 opacity-100 shadow-sm' : 'opacity-0 w-0 h-0 translate-x-10'}`}
        onClick={()=> setChatComponentExpandState(false)}
       >
            ChatSpace
       </div>
       <div> {!notesComponentExpandState && !chatComponentExpandState && !tasksComponentExpandState && !issuesComponentExpandState ?  'You have nothing minimized' : null}</div>
    </section>
  )
}

export default NotificationsBar