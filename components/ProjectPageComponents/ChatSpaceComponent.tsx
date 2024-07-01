'use client'
import { ScrollArea, Text } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import ChatComponent from './smallerComponents/ChatComponent'
import ChatProvider from '../Contexts/ChatContext'

const ChatSpaceComponent = () => {
    const {chatComponentExpandState ,setChatComponentExpandState} = useWorkSpaceContext()
    return (
    <article  className={`transition-all ease-in-out duration-200 border flex flex-col  bg-white rounded-md shadow-xl p-2 ${chatComponentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 min-w-[28rem] flex-grow h-full'}`}
    style={{
        width: chatComponentExpandState ? '0' : '20rem',
        height: chatComponentExpandState ? '0' : '100%',
        padding: chatComponentExpandState ? '0' : '1rem',
    }}>
         <header className=' flex justify-between'> 
          <Text size="xl" fw={600}>ChatSpace:</Text>
          <div 
          className='hover:cursor-pointer'
          onClick={()=>setChatComponentExpandState(true)}
          >x</div>
         </header>
           <section className='flex-grow'>
            <ChatProvider>
                 <ChatComponent/>
            </ChatProvider>
             
           </section>
        </article>
    )
}

export default ChatSpaceComponent