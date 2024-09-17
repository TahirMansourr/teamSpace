'use client'
import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import React from 'react'
import '../DocsComponenets/singleDoc.css'
// import SideBarForDocs from './SideBarForDocs'
import LeftSideBar from './LeftSideBar'
import { useDocsContext } from '@/components/Contexts/DocsContext'
import RightSideBar from './RightSideBar'

const SingleDoc = () => {
    
    const {initialContentOfFile} = useDocsContext()
    const [content , setContent] = React.useState(initialContentOfFile)
    const [edit , setEdit] = React.useState(false)
    console.log("🚀 ~ SingleDoc ~ content:", content)
    
    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

  return ( 
    <main className=' flex flex-grow  ' >
        <section className=' flex flex-grow'>
            <div className=' flex-initial w-52 pt-20  ' >
            {/* <SideBarForDocs content = {content} /> */}
            <LeftSideBar/>
            </div>
        <section className=' flex flex-grow  px-3 border shadow-md '>
           {edit ?
           <TiptapForDocs
                content  = {content}
                onChange={(newContent: string) => handleContentChange(newContent)}
                /> 
            : null
            }
            {!edit ?<div  className = {'w-full'}dangerouslySetInnerHTML={{ __html : content}}/> : null}

        </section>
        <div className=' flex-initial w-52 pt-2  '>
            <RightSideBar
                edit = {edit}
                setEdit = {setEdit}
                />
        </div>
        </section>
        
    </main>
  )
}

export default SingleDoc