import  useGetAllFeatures  from '@/app/Hooks/featureHooks'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import FeaturePage from './FeatureComponents/FeaturePage'
import FeatureProvider from '../Contexts/featureContext'

const FeaturesComponent = ({opened , setOpened} : {opened : boolean , setOpened :  Dispatch<SetStateAction<boolean>>}) => {
   
    useEffect(()=>{
        setOpened(true)
        return ()=>setOpened(false)
      })
     
      return (
        <Transition
        mounted={opened}
        transition="fade-left"
        duration={600}
        timingFunction="ease"
         >
            {
            (styles) =>(
            <section className='m-5 w-full' style={styles}>
                <div className=' flex flex-col w-full'>
                    <h1 className='mx-auto'>Feautres</h1>
                    <FeatureProvider >
                        <FeaturePage  />
                    </FeatureProvider>
                    
                </div>
            </section>
            )
            }
        </Transition>
  )
}

export default FeaturesComponent