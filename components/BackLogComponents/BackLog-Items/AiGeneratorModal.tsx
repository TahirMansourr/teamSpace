'use client'
import { BackLogItemDto } from '@/Utils/types';
 import { useState } from 'react';
import GenerateWithAIModal from './GenerateWithAIModal';
import { getInitialBacklogPrompt } from './utils';

 interface AiGeneratorModalProps {
 opened: boolean;
 close: () => void;
 }

 const AiGeneratorModal = ({ opened, close }: AiGeneratorModalProps) => {

 const [projectDescription, setProjectDescription] = useState('');
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [output, setOutput] = useState('');
 const [backlog, setBacklog] = useState<BackLogItemDto[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [isBacklogVisible, setIsBacklogVisible] = useState(false);


 const handleGenerate = async () => {
     try {
     setIsLoading(true);
     setError(null)
     setIsBacklogVisible(true)

     const baseUrl = process.env.NODE_ENV === 'production' 
            ? window.location.origin  // Uses the current domain in production
            : 'http://localhost:3000' // Uses localhost in development

        const response = await fetch(`${baseUrl}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: getInitialBacklogPrompt(projectDescription) }),
        });

     const data = await response.json();
         console.log("Response:", data);
         if (response.ok) {
             try {
                 const parsedOutput = JSON.parse(data.output);
                 console.log("Parsed Output:", parsedOutput)
                 if (Array.isArray(parsedOutput)) {
                     setBacklog(parsedOutput);
                     setOutput('')
                     setError(null)
                 } else {
                   setOutput(data.output)
                   setBacklog([])
                   setError("Error : Response is not a JSON Array");
                 }

             }
              catch (parseError) {
               setBacklog([])
               setOutput(data.output)
                 setError(`JSON parsing error ${parseError}`);
             }


           } else {
                 setOutput(data.output)
                 setBacklog([])
                 setError(`API error: ${data.error}`);
             }
         }
         catch (error : any) {
             console.error("Error:", error);
              setBacklog([])
             setError(`An error occurred: ${error.message}`);

         } finally {
              setIsLoading(false);
          }
  };
 
 return (
     <GenerateWithAIModal 
        opened={opened} 
        close={close} 
        projectDescription={projectDescription} 
        setProjectDescription={setProjectDescription} 
        handleGenerate={handleGenerate} 
        isLoading={isLoading} 
        output={output} 
        backlog={backlog} 
        isBacklogVisible={isBacklogVisible} 
        error={error} />
     );
 };

 export default AiGeneratorModal;