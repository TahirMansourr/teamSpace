import React from 'react'

const FeaturePage = ({allFeatures} : {allFeatures : any[]}) => {
  console.log("🚀 ~ FeaturePage ~ allFeatures:", allFeatures)
  return (
    <main className='flex flex-col'>
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