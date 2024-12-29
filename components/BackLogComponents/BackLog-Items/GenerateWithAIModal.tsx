'use client'

import { BackLogItemDto } from "@/Utils/types"
import { Button, Modal, Textarea } from "@mantine/core"
import { RiRobot2Line } from "react-icons/ri"
import ProductBackLogTable from "./ProductBackLogTable"

export default function GenerateWithAIModal( {
    opened, 
    close , 
    projectDescription, 
    setProjectDescription, 
    handleGenerate, 
    isLoading, 
    output, 
    backlog, 
    isBacklogVisible, 
    error
} : {
    opened : boolean, 
    close : () => void, 
    projectDescription : string, 
    setProjectDescription : (value : string) => void, 
    handleGenerate : () => void, 
    isLoading : boolean, 
    output : string, 
    backlog : BackLogItemDto[], 
    isBacklogVisible : boolean, 
    error : string | null
}) {
    return (
        <Modal
    opened={opened}
    onClose={close}
    title="AI Backlog Generator"
    fullScreen
    overlayProps={{
        blur: 8,
        opacity: 0.55,
    }}
     styles={{
         root : {backgroundColor : 'transparent' , width : '100%' }
     }}
     >
         <div className="flex flex-col gap-4">
             <Textarea
                placeholder="Describe your project and what you want to achieve..."
                 minRows={5}
                autosize
                 value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                classNames={{
                 input: 'bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400',
                 }}
             />
             <div className="flex justify-end gap-4">
             <Button
                 variant="subtle"
                 onClick={close}
                 className="text-gray-300 hover:bg-gray-700/50"
             >
                 Cancel
             </Button>
             <Button
                 onClick={handleGenerate}
                 loading={isLoading}
                 className="bg-purple-600/80 hover:bg-purple-700 backdrop-blur-sm"
                 leftSection={<RiRobot2Line size={20} />}
                 title='Generate with AI'
             >
                 Generate
             </Button>
             </div>
             {output && !backlog.length &&(
                 <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                   <p className="whitespace-pre-wrap">{output}</p>
                 </div>
             )}
            {
                 isBacklogVisible && backlog.length > 0 &&
                   <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">Generated Backlog Items:</h3>
                      <ProductBackLogTable aiGeneratedBackLogs={backlog}/>
                     {/* {
                         backlog.map((item, index) => (
                             <div key={index} className="border-b border-gray-200 py-2">
                                 <h4 className="font-medium text-purple-700">{item.title}</h4>
                                 <p className="text-gray-600 mb-1">{item.description}</p>
                                 <p className="text-gray-500">
                                    Type: {item.type}, Priority: {item.priority}, Status: {item.status}, Estimated Effort: {item.estimatedEffort}
                                   {item.acceptanceCriteria && (<>, Acceptance Criteria : {item.acceptanceCriteria}</>)}
                                 </p>
                             </div>
                         ))
                     } */}
                   </div>
             }
             {error &&(
                 <div className="mt-4 p-4 bg-red-100 rounded-lg">
                      <p className='text-red-500'>{error}</p>
                 </div>
             )}
         </div>
     </Modal>
    )
}