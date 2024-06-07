import React from 'react'
import { Text } from "@mantine/core";

const MainPage = () => {
  return (
    <section className=" flex w-full m-5 gap-2 rounded-xl shadow-2xl bg-gradient-to-br from-[#dedee2] to-[#e1e2e8]  items-center  p-3  ">
    
      <article className="flex flex-initial flex-col w-[20rem] h-[95%] mt-10  bg-white rounded-md shadow-sm p-2">
       <header> <Text size="xl" fw={600}>Notes:</Text></header>
       <section>

       </section>
      </article>

      <article className="flex flex-initial flex-col w-[20rem] h-[95%] mt-10  bg-white rounded-md shadow-sm p-2">
       <header> <Text size="xl" fw={600}>Tasks:</Text></header>
       <section>

       </section>
       </article>
      
       <article className="flex flex-initial flex-col w-[20rem] h-[95%] mt-10  bg-white rounded-md shadow-sm p-2">
       <header> <Text size="xl" fw={600}>Issues:</Text></header>
       <section>

       </section>
       </article>
     
       <article className="flex flex-grow flex-col h-[95%] mt-10  bg-white rounded-md shadow-sm p-2">
       <header> <Text size="xl" fw={600}>ChatSpace:</Text></header>
       <section>

       </section>
       </article>
      </section>
      
  )
}

export default MainPage