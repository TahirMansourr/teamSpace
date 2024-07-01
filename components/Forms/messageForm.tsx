'use client'
import { Button, keys, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import { useChatContext } from '../Contexts/ChatContext'

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

  return (
    <form onSubmit={form.onSubmit((values) =>{
         handleSendMessage(values)
         form.reset()
         })}>
        <Textarea
            key={form.key('body')}
            rightSection = {<Button type='submit'>send</Button>}
            {...form.getInputProps('body')}
            />
       
    </form>
  )
}

export default MessageForm