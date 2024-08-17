import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext"
import { GetAllFeatures } from "@/lib/actions/FeatureAction"
import { useEffect, useState } from "react"

 const  useGetAllFeatures = ()=> {

    const [allFeatures , setAllFeatures] = useState<any[]>([])
    const {projectInfo} = useWorkSpaceContext()
   
    useEffect(()=>{
        async function getAllFeatures(){
          const Features = await GetAllFeatures({projectId : projectInfo?.project._id})
          setAllFeatures(Features.features)
        }
        getAllFeatures()
    },[])
    console.log("��� ~ useGetAllFeatures ~ allFeatures:", allFeatures)
    return {allFeatures}
}

export default useGetAllFeatures