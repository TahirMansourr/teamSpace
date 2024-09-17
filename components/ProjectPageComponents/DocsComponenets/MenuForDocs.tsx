'use client'
import { FileDto, FolderDto } from '@/Utils/types';
import React from 'react'
import { isFolder } from './FolderStructure';
import { useDocsContext } from '@/components/Contexts/DocsContext';

const MenuForDocs = ({
        menuPosition ,
        setMenuVisible,
        clickedItem,
        
} : {
         menuPosition : {x : number , y : number} ,
         setMenuVisible : React.Dispatch<React.SetStateAction<boolean>> ,
         clickedItem : FolderDto | FileDto | null ,
}) => {

            const handleMenuAction = (action: string) => {
                switch (action) {
                  case 'Rename':
                    // Handle rename action
                    break;
                  case 'Delete':
                    // Handle delete action
                    break;
                  case 'Move':
                    // Handle move action
                    break;
                  case 'Create New Folder':
                    // Handle create new folder action
                    break;
                  case 'Create New File':
                    // Handle create new file action
                    break;
                  default:
                    break;
                }
                // Close the menu after action selection
                setMenuVisible(false); 
              };

              const {setInitialContentOfFile} = useDocsContext()
  return (
    
    <div
          className='fixed z-50 bg-white border shadow-md rounded p-2'
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
            { clickedItem && isFolder(clickedItem) ?
            
            <>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Rename')}>
                    Rename
                </div>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Delete')}>
                    Delete
                </div>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Move')}>
                    Create New Folder
                </div>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Move')}>
                    Create New File
                </div>
            </>
            
            :
            
            <>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Rename')}>
                    Rename
                </div>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Delete')}>
                    Delete
                </div>
            </>
            }
          
        </div>
  )
}

export default MenuForDocs