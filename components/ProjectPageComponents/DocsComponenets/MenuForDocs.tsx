'use client'
import { FileDto, FolderDto } from '@/Utils/types';
import React, { useState } from 'react'
import { isFolder } from './FolderStructure';
import { useDocsContext } from '@/components/Contexts/DocsContext';
import { Input } from 'postcss';
import { TextInput } from '@mantine/core';

const MenuForDocs = ({
        menuPosition ,
        setMenuVisible,
        clickedItem,  
        showInputField , 
        setShowInputField
} : {
         menuPosition : {x : number , y : number} ,
         setMenuVisible : React.Dispatch<React.SetStateAction<boolean>> ,
         clickedItem : FolderDto | FileDto | null , 
         showInputField : boolean ,
         setShowInputField : React.Dispatch<React.SetStateAction<boolean>>
}) => {

   

            const handleMenuAction = (action: string) => {
                switch (action) {
                  case 'Rename':
                    setShowInputField(true)
                    break;
                  case 'Delete':
                    // Handle delete action
                    break;
                  case 'Move':
                    // Handle move action
                    break;
                  case 'Create New Folder':
                   setShowInputField(true)
                    break;
                  case 'Create New File':
                    setShowInputField(true)
                    break;
                  default:
                    break;
                }
                // Close the menu after action selection
                 
              };

  return (
    
    <div
          className='fixed z-50 bg-white border shadow-md rounded p-2'
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
            <div className='ml-0 hover:cursor-pointer' onClick={()=>{setMenuVisible(false)}}>x</div>
            { clickedItem && isFolder(clickedItem) && !showInputField ?
                 
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
            
            : clickedItem && isFolder(clickedItem) && showInputField ?
            <>
            <TextInput/>
            </>
            : clickedItem && !isFolder(clickedItem) && showInputField ?
            <>
            <TextInput/>
            </> : clickedItem && !isFolder(clickedItem) && !showInputField ?
            <>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Rename')}>
                    Rename
                </div>
                <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Delete')}>
                    Delete
                </div>
            </> : null
            }
          
        </div>
  )
}

export default MenuForDocs