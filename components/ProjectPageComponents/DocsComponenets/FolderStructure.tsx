'use client';
import React, { useState, useEffect } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { FaRegFolder, FaRegFolderOpen } from 'react-icons/fa6';
import { FileDto, FolderDto } from '@/Utils/types';
import MenuForDocs from './MenuForDocs';
import { useDocsContext } from '@/components/Contexts/DocsContext';

export const isFolder = (item: FolderDto | FileDto): item is FolderDto => {
    return (item as FolderDto).children !== undefined;
  };

  const FolderStructure = ({
  folder,
  handleContextMenu,
}: {
  folder: FolderDto;
  handleContextMenu: (e: React.MouseEvent, item : FolderDto | FileDto) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Folder toggle state
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<FolderDto | FileDto | null>(null);
  const {setInitialContentOfFile , setSelectedFile , setSelectedFolder} = useDocsContext()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuVisible) {
        setMenuVisible(false);
        setClickedItem(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);


 

  return (
    <div>
      {/* Render the folder */}
      <div
        className='flex items-center cursor-pointer'
        onClick={() =>{
             setIsOpen(!isOpen)
             setSelectedFolder(folder)
            }} 
        onContextMenu={(e) => handleContextMenu(e, folder)} // Handle right-click
      >
        {isOpen ? <FaRegFolderOpen /> : <FaRegFolder />}
        <span className='ml-2'>{folder.name}</span>
      </div>

      {isOpen && (
        <div className='ml-4'>
          {folder.children?.map((child : FolderDto | FileDto) =>
            isFolder(child) ? (
              <FolderStructure
                key={child._id}
                folder={child}
                handleContextMenu={handleContextMenu}
               
              />
            ) : (
              <div
                key={child._id}
                className='flex items-center cursor-pointer'
                onContextMenu={(e) => handleContextMenu(e, child)}
                onClick={(e) => { 
                    setInitialContentOfFile(child.body)
                    setSelectedFile(child)
                }}
              >
                <CiFileOn />
                <span className='ml-2'>{child.name}</span>
              </div>
            )
          )}
        </div>
      )}

      {/*context menu */}
      {menuVisible && (
       < MenuForDocs 
        clickedItem= {clickedItem}
        menuPosition={menuPosition}
        setMenuVisible={setMenuVisible}
        
        />
      )}
    </div>
  );
};

export default FolderStructure;
