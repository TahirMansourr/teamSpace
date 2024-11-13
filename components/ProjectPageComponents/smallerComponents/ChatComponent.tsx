import { ScrollArea } from '@mantine/core'
import React from 'react'
import ChatSection from './ChatSection'
import MessageForm from '@/components/Forms/messageForm'

const ChatComponent = () => {

  return (
    <div className='flex h-full relative w-full'>
        
        <ScrollArea className='h-[calc(100vh-200px)]' w={'100%'} >
           <ChatSection />
        </ScrollArea>
        
          <footer className=' absolute bottom-0  w-full bg-white mt-2'>
            <MessageForm />
          </footer>  
    </div>
  )
}

export default ChatComponent