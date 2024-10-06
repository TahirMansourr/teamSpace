'use client'
import React, { Dispatch, SetStateAction } from 'react'
import UserButton from './user-button/UserButton'

const DashBoardSideBar = ({
  setSelectedItemInSideBar,
  SelectedItemInSideBar,
  setOpened,
} : {
  setSelectedItemInSideBar : Dispatch<SetStateAction<string>>,
  SelectedItemInSideBar : string,
  setOpened : Dispatch<SetStateAction<boolean>>
}) => {

    const dataForSideBar  = [ 'projects' ,'meetings' , 'notifications' , 'messages' ]
  
  return (
    <div>
      <div className="flex flex-col rounded-md shadow-lg  p-1 border overflow-hidden m-2">
          <UserButton/> 
      </div>
        <section
         className=' flex h-full min-w-[15rem] pl-3 border-r text-xl mt-3 hover:cursor-pointer '>
          <ul>
              {
                  dataForSideBar.map((item : string) =>(
                    <li
                    key={item}
                    className={`mb-2 capitalize ${SelectedItemInSideBar === item ?
                      'side-bar-button' : null}`}
                  >
                    <button
                      className="w-full text-left capitalize"
                      onClick={() => {
                        setSelectedItemInSideBar(item);
                        setOpened(false);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                  ))
              }
          </ul>
          <ul>
    </ul>
       </section>
    </div>
  )
}

export default DashBoardSideBar