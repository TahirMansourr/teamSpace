'use client'
import TiptapForDocs from '@/components/TipTapForDocs/tipTapForDocs'
import React from 'react'

const SingleFeature = ({feature} : {feature : any}) => {
  return (
    <main className='flex flex-col w-full'>
        <h1>{feature.name}</h1>
        <p>{feature.description}</p>
        <article className='w-full'>
            this is where the docs should be
        </article>
    </main>
  )
}

export default SingleFeature