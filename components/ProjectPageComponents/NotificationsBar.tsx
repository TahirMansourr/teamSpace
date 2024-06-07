'use client'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'

const NotificationsBar = () => {
    const {
        notesComponentExpandState ,
        tasksComponentExpandState,
        setNotesComponentExpandState,
        setTasksComponentExpandState
        } = useWorkSpaceContext()
  return (
    <section className=' mx-auto flex bg-slate-100 rounded-lg p-2 '>
       <div className={`bg-white cursor-pointer transition-all ease-in-out duration-200 ${notesComponentExpandState ? 'p-1 opacity-100 ' : 'opacity-0 w-0 h-0 translate-x-10'}`}
        onClick={()=> setNotesComponentExpandState(false)}
       >
            Notes
       </div>
       <div className={`bg-white cursor-pointer transition-all ease-in-out duration-200 ${tasksComponentExpandState ? 'p-1 opacity-100 ' : 'opacity-0 w-0 h-0 translate-x-10'}`}
        onClick={()=> setTasksComponentExpandState(false)}
       >
            Tasks
       </div>
    </section>
  )
}

export default NotificationsBar