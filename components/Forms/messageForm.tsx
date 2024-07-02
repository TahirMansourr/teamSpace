'use client'
import { Button, keys, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useRef } from 'react'
import { useChatContext } from '../Contexts/ChatContext'
import { FiSend } from "react-icons/fi";

const MessageForm = () => {

    const {handleSendMessage} = useChatContext()
    const form = useForm({
        mode : 'uncontrolled',
        initialValues : {
            body : ''
        },
        validate:{
            
        }
    })
 
    const formRef = useRef<any>(null);
  return (
    <form onSubmit={form.onSubmit((values) =>{
         handleSendMessage(values)
         form.reset()
         })}
         ref ={formRef}
         >
        <Textarea
            key={form.key('body')}
            rightSection = {<FiSend type='submit' className='hover:cursor-pointer mt-4' color='blue' size={25} onClick={()=> formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}/>}
            {...form.getInputProps('body')}
            />
       
    </form>
  )
}

export default MessageForm