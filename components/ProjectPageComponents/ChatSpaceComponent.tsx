'use client'
import { ScrollArea, Text } from '@mantine/core'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import ChatComponent from './smallerComponents/ChatComponent'
import ChatProvider from '../Contexts/ChatContext'
import MultiTabsComponentWrapper from './MultiTabsComponentWrapper'

const ChatSpaceComponent = () => {
    const {chatComponentExpandState ,setChatComponentExpandState} = useWorkSpaceContext()
    return (
        <MultiTabsComponentWrapper 
            componentExpandState={chatComponentExpandState} 
            className= 'opacity-100 min-w-[28rem] flex-grow h-full'
            stateSetter={setChatComponentExpandState}
            componentName='ChatSpace'
            >
             {/* <header className=' flex justify-between'> 
            <Text size="xl" fw={600}>ChatSpace:</Text>
            <div 
            className='hover:cursor-pointer'
            onClick={()=>setChatComponentExpandState(true)}
            >x</div>
            </header> */}
            <section className='flex-grow'>
                    <ChatProvider >
                        <ChatComponent />
                    </ChatProvider>
            </section>
        </MultiTabsComponentWrapper>
    )
}

export default ChatSpaceComponent