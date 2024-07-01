'use client'
import { ScrollArea } from '@mantine/core'
import React from 'react'
import ChatSection from './ChatSection'
import { useChatContext } from '@/components/Contexts/ChatContext'
import MessageForm from '@/components/Forms/messageForm'

const ChatComponent = () => {
    const {trial} = useChatContext()
  return (
    <div className='flex h-full relative w-full bg-slate-300'>
        
        <ScrollArea h={600}>
           <ChatSection/>
        </ScrollArea>
        
          <footer className=' absolute bottom-0  w-full bg-white mt-2' onClick={() => trial()}>
            <MessageForm />
          </footer>  
    </div>
  )
}

export default ChatComponent