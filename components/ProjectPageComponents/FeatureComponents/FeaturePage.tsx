'use client'
import { useFeatureContext } from '@/components/Contexts/featureContext'
import CreateFeatureForm from '@/components/Forms/createFeatureForm'
import { Button, Modal , Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import FeatureCard from './FeatureCard'
import { FeatureDto } from '@/Utils/types'
const FeaturePage = () => {
  const {allFeatures} = useFeatureContext()
  const [Modalopened, { open, close }] = useDisclosure(false);
  return (
    <main className='flex flex-col w-full'>
        <Button className=' bg-slate-500  !fixed !top-0 !right-0 !w-fit' onClick={open} >Create a new Feauture</Button>
          <Modal opened={Modalopened} onClose={close} title="New Feature !!"  overlayProps={{
                  backgroundOpacity: 0.55,
                  blur: 3,
                }}>
                  <CreateFeatureForm/>
          </Modal>
          <section className=' grid grid-cols-3 gap-2 p-3'>
          {
            allFeatures ? 
              allFeatures.map((feature : FeatureDto) => (
                  <FeatureCard feature = {feature}/>
              )) :
              <h1>No Features </h1>
          }
          </section>
       
    </main>
  )
}

export default FeaturePage