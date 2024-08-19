'use client'
import { FeatureDto } from '@/Utils/types'
import { Tabs, rem } from '@mantine/core';
import React from 'react'
import FeaturesDocsTab from './FeaturesDocsTab';
import FeaturesIssuesTab from './FeaturesIssuesTab';
import FeaturesTabsTasks from './FeaturesTabsTasks';

const FeatureDrawer = ({feature} : {feature : FeatureDto}) => {
  return (
    <main className='flex flex-col w-full h-full m-0 p-0'>
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
                <FeaturesTabsTasks featureTasks={{tasks :feature.tasks , id : feature._id}}/>
            </Tabs.Panel>
        </Tabs>
        

    </main>
  )
}

export default FeatureDrawer