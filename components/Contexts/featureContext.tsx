'use client'

import { createFeature, GetAllFeatures } from "@/lib/actions/FeatureAction"
import { ProjectDto, UserDto } from "@/Utils/types"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useWorkSpaceContext } from "./WorkSpaceContext"
import useGetAllFeatures from "@/app/Hooks/featureHooks"

interface FeatureContextDto{
    allFeatures : any[]
    submitCreateFeatureForm : (values : {name : string, description : string})=>void
}

const FeautreContext = createContext<FeatureContextDto>({} as FeatureContextDto)
export const useFeatureContext = ()=>{
    return useContext(FeautreContext)
}

const FeatureProvider = (
    {
        children,
    }
    :
    { 
     children : React.ReactNode,
    }
)=>{

    // const {allFeatures : initailFeatures} = useGetAllFeatures()
    const {projectInfo , userInfo} = useWorkSpaceContext()

    const [allFeatures , setAllFeatures] = useState<any[]>([])
    console.log("🚀 ~ allFeatures:", allFeatures)
    useEffect(()=>{
        async function getAllFeatures(){
          const Features = await GetAllFeatures({projectId : projectInfo?.project._id})
          setAllFeatures(Features.features)
        }
        getAllFeatures()
    },[])

    async function submitCreateFeatureForm(values : {name : string , description : string}){
        const newFeature = await createFeature({
                name : values.name,
                description : values.description,
                projectId : projectInfo.project._id,
                userId : userInfo._id
            })
        setAllFeatures((prev) => [...prev , newFeature.feature])
      }
    
    const value = {
        allFeatures,
        submitCreateFeatureForm
    }

    return(

        <FeautreContext.Provider value={value}>
            {children}
        </FeautreContext.Provider>
    )
}

export default  FeatureProvider