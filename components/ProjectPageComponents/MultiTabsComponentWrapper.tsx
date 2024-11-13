import { ScrollArea, Text, Tooltip } from "@mantine/core";
import { MdPlaylistAdd } from "react-icons/md";

const ComponentWrapper = ({
    children , 
    componentExpandState,
    className,
    stateSetter,
    componentName,
    modalOpener
} : {
    children : React.ReactNode , 
    componentExpandState : boolean,
    className? : string, 
    stateSetter : React.Dispatch<React.SetStateAction<boolean>>,
    componentName : string,
    modalOpener? : ()=>void
}) => {
  return (
   <article  
    className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl ${className}
                ${componentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100  flex-grow'}`}
    style={{
          width: componentExpandState ? '0' : '100%',
          height: componentExpandState ? '0' : '96%',
          padding: componentExpandState ? '0' : '1rem',
    }}>
    <header className='flex justify-between'> 
        <Text size="xl" fw={600}>{componentName}</Text>
        <div className="flex items-center gap-2"> 
            <Tooltip label='Create a new Task' color='blue'>
                <MdPlaylistAdd size={25} color='blue' className='hover:cursor-pointer' onClick={modalOpener}/>
            </Tooltip>
            <div className='hover:cursor-pointer' onClick={()=>stateSetter(true)}>x</div>
        </div>
    </header>
    <ScrollArea className="flex-1 w-full " w={'100%'} >
        {children}
    </ScrollArea>
   </article>

  )
};

export default ComponentWrapper