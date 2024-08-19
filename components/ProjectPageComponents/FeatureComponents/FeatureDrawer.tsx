'use client'
import { FeatureDto } from '@/Utils/types'
import { Tabs, rem } from '@mantine/core';
import React from 'react'
import FeaturesDocsTab from './FeaturesDocsTab';
import FeaturesIssuesTab from './FeaturesIssuesTab';
import FeaturesTabsTasks from './FeaturesTabsTasks';
import TaskProvider from '@/components/Contexts/TasksContext';
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext';
import { IoIosArrowBack } from "react-icons/io";

const FeatureDrawer = ({feature , close} : {feature : FeatureDto , close : ()=>void}) => {
    const {projectInfo , userInfo} = useWorkSpaceContext()
  return (
    <main className='flex flex-col w-full h-full m-0 p-0'>
        <div 
            className='fixed top-2 left-2 hover:cursor-pointer hover:scale-105'
            onClick={close}
            >
            <IoIosArrowBack size={20}/>
        </div>
        <p className='mx-auto'> {feature.name} </p>
       
        <Tabs variant="pills" radius="lg" defaultValue="Docs" className='!flex !flex-col !w-full' >
            <div className=" mx-auto">
                <Tabs.List>
                    <Tabs.Tab value="Docs">
                        Docs
                    </Tabs.Tab>
                    <Tabs.Tab value="Issues" >
                        Issues
                    </Tabs.Tab>
                    <Tabs.Tab value="Tasks" >
                        Tasks
                    </Tabs.Tab>
                </Tabs.List>
            </div>
           

            <Tabs.Panel value="Docs">
                <FeaturesDocsTab/>
            </Tabs.Panel>

            <Tabs.Panel value="Issues">
                <FeaturesIssuesTab/>
            </Tabs.Panel>

            <Tabs.Panel value="Tasks">
            <TaskProvider project={projectInfo} user={userInfo} featureTasks={feature.tasks}>
                <FeaturesTabsTasks featureId={ feature._id}/>
            </TaskProvider>
            </Tabs.Panel>

            <Tabs.Panel value="Settings">
                Settings tab content
            </Tabs.Panel>
        </Tabs>
        

    </main>
  )
}

export default FeatureDrawer