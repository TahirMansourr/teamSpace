import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import React from 'react'

const SingleDoc = () => {
  return (
    <main className=' flex w-full mt-12'>
        <section className='border-r-4 p-4 flex flex-col '>
            Sidebar
        </section>
        <section className=' flex flex-grow  p-3'>
           <TiptapForDocs/>
        </section>
    </main>
  )
}

export default SingleDoc