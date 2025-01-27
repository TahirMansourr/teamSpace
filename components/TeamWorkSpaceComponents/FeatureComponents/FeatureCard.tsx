'use client'
import { FeatureDto } from '@/Utils/types';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import FeatureDrawer from './FeatureDrawer';

const FeatureCard = ({feature} : {feature : FeatureDto}) => {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <section className=' border h-20 shadow-md rounded-md p-3 relative flex flex-col'>
        <Drawer  radius="md" size={'100%'} opened={opened} onClose={close} withCloseButton={false} >
            <FeatureDrawer feature = {feature} close = {close}/>
        </Drawer>
        {feature.name}
        <IoLogOutOutline onClick={open} className='absolute top-2 right-2 transition-all hover:scale-105 hover:translate-x-1 duration-300 hover:cursor-pointer' size={20} color='blue'/>
    </section>
  )
}

export default FeatureCard