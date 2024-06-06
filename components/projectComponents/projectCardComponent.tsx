import React from 'react'
import { Text, Paper } from '@mantine/core';

const ProjectCardComponent = () => {
  return (
    <main className='flex items-start gap-5'>
      <section className=' shadow-md rounded-md p-3 w-fit border transition-all hover:scale-105 duration-200 flex flex-col min-h-[20rem] min-w-[20rem]'>
         <header>
         <Text size='xl' fw={700} ta={'center'} className='font-bold mb-4'>Project Name</Text>
         </header>
         <figure>
          Project image
         </figure>
         <footer>
          Information about the project
         </footer>
      </section>
      <section className='flex flex-col p-5'>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Project Name</Text></header>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Content:</Text></header>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Activity</Text></header>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Contributors:</Text></header>

      </section>
    </main>
    
  )
}

export default ProjectCardComponent