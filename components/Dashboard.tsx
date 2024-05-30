'use client'

import React from 'react'

const dataForSideBar  = [ 'Create meeting' , 'notifications' , 'create a new Project' , 'messages' , 'MyProjects' ]
const Dashboard = () => {
  return (
    <div className=' flex h-screen '>
       <section
         className=' h-full w-[15rem] '
       >
        <ul>
        {
            dataForSideBar.map((item : string , index : number) =>(
                <li> {item} </li>
            ) )
        }
        </ul>
       </section>
       <section>my main features</section>
    </div>
  )
}

export default Dashboard