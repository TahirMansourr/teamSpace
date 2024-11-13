import { ScrollArea } from '@mantine/core'
import React from 'react'
import ChatSection from './ChatSection'
import MessageForm from '@/components/Forms/messageForm'

const ChatComponent = () => {
  return (
    <div className='h-[calc(100vh-8rem)] flex flex-col'>
        <div className='flex-1 relative'>
            <ScrollArea className='absolute inset-0'>
                <ChatSection />
            </ScrollArea>
        </div>
        <div className='h-[4rem]'>
            <MessageForm />
        </div>
    </div>
  )
}

export default ChatComponent
