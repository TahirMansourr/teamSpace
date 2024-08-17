'use client'
import CreateFeatureForm from '@/components/Forms/createFeatureForm'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

const FeaturePage = ({allFeatures} : {allFeatures : any[]}) => {
  console.log("🚀 ~ FeaturePage ~ allFeatures:", allFeatures)
  const [Modalopened, { open, close }] = useDisclosure(false);
  return (
    <main className='flex flex-col w-full'>
        <Button className='!mr-0 !top-0 !w-fit' onClick={open} >Create a new Feauture</Button>
        <Modal opened={Modalopened} onClose={close} title="New Feature !!"  overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
              }}>
                <CreateFeatureForm/>
        </Modal>
        {
            allFeatures ? 
              allFeatures.map((feature : any) => (
                  <h1>{feature.name}</h1>
              )) :
              <h1>No Features </h1>
        }
    </main>
  )
}

export default FeaturePage