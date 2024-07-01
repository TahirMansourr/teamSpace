import React from 'react'
import { Text, Paper } from '@mantine/core';
import Link from 'next/link';

const ProjectCardComponent = ({project} : any) => {
  return (
    <main className='flex items-start gap-5 transition-all ease-in-out duration-200 '>
      <section className=' scale-105 bg-white opacity-100 shadow-md rounded-md p-3 w-fit border transition-all hover:scale-110
       duration-200 flex flex-col min-h-[15rem] min-w-[15rem] '>
         <figure>
          Project image
         </figure>
         <footer>
          Information about the project
         </footer>
      </section>
      <section className='flex flex-col p-5  bg-slate-50 rounded-md w-full h-full'>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>{project.name}</Text></header>
        <header>
          <Link href={`project/${project._id}/another`}>
          <Text size='xl' fw={700}  className='font-bold mb-4'>Visit {project.name}</Text>
          </Link>
          </header>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Description:</Text></header>
        <p><Text>{project.content}</Text></p>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Activity</Text></header>
        <header><Text size='xl' fw={700}  className='font-bold mb-4'>Contributors:</Text></header>

      </section>
    </main>
    
  )
}

export default ProjectCardComponent