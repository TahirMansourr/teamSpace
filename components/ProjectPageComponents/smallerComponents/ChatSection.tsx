'use client'
import { useChatContext } from '@/components/Contexts/ChatContext'
import React from 'react'

const ChatSection = () => {
  const {messages} = useChatContext()
  return (
    <div>
     { messages && messages.length > 0 ? <ul>
      {messages.map((message : any , index : number) => {
          return <li>{message.body}</li>
        }) }
      </ul> : <h1>No messages yet</h1>}
    </div>
  )
}

export default ChatSection