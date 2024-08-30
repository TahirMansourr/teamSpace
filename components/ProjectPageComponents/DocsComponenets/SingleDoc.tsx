'use client'
import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import React from 'react'
import '../DocsComponenets/singleDoc.css'
import SideBarForDocs from './SideBarForDocs'
import LeftSideBar from './LeftSideBar'

const SingleDoc = ({edit} : {edit : boolean}) => {
    const [content , setContent] = React.useState('')
    console.log("🚀 ~ SingleDoc ~ content:", content)
    
    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

  return ( 
    <main className=' flex flex-grow pt-20 ' >
        <section className=' flex flex-grow'>
            <div className=' flex-initial w-52  ' >
            {/* <SideBarForDocs content = {content} /> */}
            <LeftSideBar/>
            </div>
        <section className=' flex flex-grow  p-3 border shadow-md m-3 '>
           {edit ?
           <TiptapForDocs
                content  = {content}
                onChange={(newContent: string) => handleContentChange(newContent)}
                /> 
            : null
            }
            {!edit ?<div  className = {'w-full'}dangerouslySetInnerHTML={{ __html : content}}/> : null}

        </section>
        </section>
        
    </main>
  )
}

export default SingleDoc