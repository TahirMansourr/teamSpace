'use client'
import React from 'react'
import { useWorkSpaceContext } from '../Contexts/WorkSpaceContext'
import ChatComponent from './smallerComponents/ChatComponent'
import ChatProvider from '../Contexts/ChatContext'
import ComponentWrapper from './MultiTabsComponentWrapper'

const ChatSpaceComponent = () => {
    const {chatComponentExpandState ,setChatComponentExpandState} = useWorkSpaceContext()
    return (
        <ComponentWrapper 
            componentExpandState={chatComponentExpandState} 
            className= 'opacity-100 min-w-[28rem] flex-grow h-full'
            stateSetter={setChatComponentExpandState}
            componentName='ChatSpace'
            >
            <section className='flex-grow'>
                    <ChatProvider >
                        <ChatComponent />
                    </ChatProvider>
            </section>
        </ComponentWrapper>
    )
}

export default ChatSpaceComponent