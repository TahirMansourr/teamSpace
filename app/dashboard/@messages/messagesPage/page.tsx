'use client'
import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'


const Meetings = () => {
    const route = useSelectedLayoutSegments()
  return (
    <div className='w-screen ml-48'>{route}</div>
  )
}

export default Meetings