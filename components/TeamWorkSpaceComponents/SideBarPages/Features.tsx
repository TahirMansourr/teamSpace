import  useGetAllFeatures  from '@/app/Hooks/featureHooks'
import { Transition } from '@mantine/core'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import FeaturePage from '../FeatureComponents/FeaturePage'
import FeatureProvider from '../../Contexts/featureContext'
import { TransitionWrapper } from '../TransitionWrapper'

const FeaturesComponent = ({opened , setOpened} : {opened : boolean , setOpened :  Dispatch<SetStateAction<boolean>>}) => {
   
    useEffect(()=>{
        setOpened(true)
        return ()=>setOpened(false)
      })
     
      return (
        <TransitionWrapper opened = {opened}>
            <section className='m-5 w-full' >
                <div className=' flex flex-col w-full'>
                    <h1 className='mx-auto'>Features</h1>
                    <FeatureProvider >
                        <FeaturePage  />
                    </FeatureProvider>
                    
                </div>
            </section>
        </TransitionWrapper>
  )
}

export default FeaturesComponent