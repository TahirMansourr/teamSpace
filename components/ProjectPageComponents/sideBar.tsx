'use client'
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import UserButton from '../user-button/UserButton';

function SideBar({
    setSelectedItemInSideBar,
    SelectedItemInSideBar,
    setOpened,
    projectName 

} : {
    setSelectedItemInSideBar : Dispatch<SetStateAction<string>>,
    SelectedItemInSideBar : string,
    setOpened : Dispatch<SetStateAction<boolean>>,
    projectName : string
    }) {

  const [opened, { toggle }] = useDisclosure();
  const dataForSideBar = ['Docs' , 'TeamSpace' , 'NotesPage' , 'IssuesPage' , 'TasksPage' , 'Features']
  
  return (
    <div className='relative '>
        <Burger size="sm" c={'green'} opened={opened} onClick={()=>toggle()} aria-label="Toggle navigation" className={`  ${opened ? 'mt-2' : 'absolute m-2' } top-3 left-3 hover:cursor-pointer z-50`} />
        <section
            className={`transform transition-all duration-150 ${
                opened
                    ? ' max-w-[15rem] flex-grow min-h-[30rem] rounded-xl m-2 w-fit p-4 shadow-xl border '
                    : 'max-h-0 opacity-0 w-0 flex-grow-0 min-h-0'
                }`}
            >
                <UserButton/>
                <h1 className=' text-xl text-center mt-3 shadow-xl mb-5'>{projectName}</h1>
        <section
         className=' flex h-full w-[15rem] pl-3 border-r text-xl mt-3 hover:cursor-pointer '>
          <ul>
              {
                  dataForSideBar.map((item : string , index : number) =>(
                      <li 
                      key = {index}
                      className={` mb-2 ml-0 capitalize ${SelectedItemInSideBar === item ?
                      ' bg-gradient-to-br from-blue-600 w-full to-blue-400 rounded-md p-2 shadow-md  text-white transition-all ease-in duration-200 translate-x-2 translate-y-1 ' : null}`}
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
      </section>
    </div>
    
    );
}

export default SideBar;
