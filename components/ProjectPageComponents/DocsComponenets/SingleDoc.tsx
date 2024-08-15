'use client'
import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import { Input } from '@mantine/core'
import React from 'react'

const SingleDoc = () => {
    const [content , setContent] = React.useState('')
    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

  return (
    <main className=' flex w-full mt-12'>
        <section className='border-r-4 p-4 flex flex-col '>
            <Input placeholder='enter the title of the script'/>
        </section>
        <section className=' flex flex-grow  p-3'>
           <TiptapForDocs
                content  = {content}
                onChange={(newContent: string) => handleContentChange(newContent)}
            />
        </section>
    </main>
  )
}

export default SingleDoc