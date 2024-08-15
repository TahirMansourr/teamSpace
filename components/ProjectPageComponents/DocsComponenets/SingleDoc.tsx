'use client'
import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import { Button, Input } from '@mantine/core'
import React from 'react'
import '../DocsComponenets/singleDoc.css'

const SingleDoc = () => {
    const [content , setContent] = React.useState('')
    console.log("🚀 ~ SingleDoc ~ content:", content)
    const [edit , setEdit] = React.useState(false)
    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

  return (
    <main className=' flex w-full mt-12' >
        <Button onClick={() => setEdit(!edit)}>{edit ? 'Preview' : 'Edit'}</Button>
        {/* <section className='border-r-4 p-4 flex flex-col '>
            <Input placeholder='enter the title of the script'/>
        </section> */}
        <section className=' flex flex-grow  p-3'>
           {edit ?<TiptapForDocs
                content  = {content}
                onChange={(newContent: string) => handleContentChange(newContent)}
            /> : null}
            {!edit ?<div dangerouslySetInnerHTML={{ __html : content}}/> : null}

        </section>
    </main>
  )
}

export default SingleDoc