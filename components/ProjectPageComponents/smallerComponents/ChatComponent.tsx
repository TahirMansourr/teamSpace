import { ScrollArea } from '@mantine/core'
import React from 'react'
import ChatSection from './ChatSection'
import MessageForm from '@/components/Forms/messageForm'

const ChatComponent = () => {

  return (
    <div className='flex h-full relative w-ful'>
        
        <ScrollArea mah={700} w={'100%'} >
           <ChatSection />
        </ScrollArea>
        
          <footer className=' absolute bottom-0  w-full bg-white mt-2'>
            <MessageForm />
          </footer>  
    </div>
  )
}

export default ChatComponent