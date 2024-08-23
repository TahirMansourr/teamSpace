'use client'
import React, { Dispatch, SetStateAction } from 'react'
import UserButton from './user-button/UserButton'

const DashBoardSideBar = ({
  setSelectedItemInSideBar,
  SelectedItemInSideBar,
  setOpened,
  user
} : {
  setSelectedItemInSideBar : Dispatch<SetStateAction<string>>,
  SelectedItemInSideBar : string,
  setOpened : Dispatch<SetStateAction<boolean>>
  user : any
}) => {

    const dataForSideBar  = [ 'projects' ,'meetings' , 'notifications' , 'messages' ]
  
  return (
    <div>
      <div className="flex flex-col rounded-md shadow-lg  p-1 border overflow-hidden m-2">
          <UserButton/> 
      </div>
        <section
         className=' flex h-full w-[15rem] pl-3 border-r text-xl mt-3 hover:cursor-pointer '>
          <ul>
              {
                  dataForSideBar.map((item : string , index : number) =>(
                      <li 
                      key = {index}
                      className={` mb-2 capitalize ${SelectedItemInSideBar === item ?
                      ' bg-gradient-to-br from-blue-600 to-blue-400 rounded-md p-2 shadow-md  text-white transition-all ease-in duration-200 translate-x-2 translate-y-1 ' : null}`}
                      onClick={()=>{
                        setSelectedItemInSideBar(item)
                        setOpened(false)
                      }}
                      >
                         {item}
                      </li>
                  ) )
              }
          </ul>
          <ul>
    </ul>
       </section>
    </div>
  )
}

export default DashBoardSideBar