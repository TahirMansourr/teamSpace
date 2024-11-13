'use client'
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import UserButton from '../user-button/UserButton';
import { useRouter } from 'next/navigation';
import { LuLayoutDashboard } from "react-icons/lu";

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
  const dataForSideBar = ['Docs' , 'TeamSpace' , 'NotesPage' , 'IssuesPage' , 'TasksPage' , 'Features' , 'Activity' , 'Settings']
  const router = useRouter()
  return (
    <div className='relative '>
        <Burger size="sm" c={'green'} opened={opened} onClick={()=>toggle()} aria-label="Toggle navigation" className={`  ${opened ? 'mt-2' : 'absolute m-2' } top-3 left-3 hover:cursor-pointer z-50`} />
        <section
            className={`transform transition-all duration-150 ${
                opened
                    ? ' max-w-[15rem] flex-grow min-h-[30rem] rounded-xl m-2 w-fit p-3 shadow-xl border '
                    : 'max-h-0 opacity-0 w-0 flex-grow-0 min-h-0'
                }`}
            >
                <div className="flex flex-col rounded-md shadow-lg  p-1 border overflow-hidden">
                    <UserButton/>
                    <h1 className=' text-xl text-center mt-3 '>{projectName}</h1>
                </div>
                
        <section
         className=' flex h-full w-[15rem] pl-3 border-r text-xl mt-3 hover:cursor-pointer '>
          <div className='flex flex-col'>
              {
                  dataForSideBar.map((item : string , index : number) =>(
                      <p 
                      key = {index}
                      className={` mb-2 ml-0 capitalize ${SelectedItemInSideBar === item ?
                      ' bg-gradient-to-br from-blue-600 w-full to-blue-400 rounded-md p-2 shadow-md  text-white transition-all ease-in duration-200 translate-x-2 translate-y-1 ' : null}`}
                      onClick={()=>{
                        setSelectedItemInSideBar(item)
                        setOpened(false)
                      }}
                      >
                         {item}
                      </p>
                  ) )
              }
          </div>
          <ul>
    </ul>
        
       </section>
       <div 
            className='flex items-center justify-center gap-2 pt-3 border-t-4 hover:cursor-pointer'
            onClick={()=>router.push('/myDashboard')}
            >
            <LuLayoutDashboard/>
                <p className='font-bold'>Dashboard</p>
        </div>
      </section>
    </div>
    
    );
}

export default SideBar;
