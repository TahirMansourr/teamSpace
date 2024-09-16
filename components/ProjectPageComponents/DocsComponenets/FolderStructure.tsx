'use client';
import React, { useState, useEffect } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { FaRegFolder, FaRegFolderOpen } from 'react-icons/fa6';
import { FileDto, FolderDto } from '@/Utils/types';

const FolderStructure = ({
  folder,
  handleContextMenu,
}: {
  folder: FolderDto;
  handleContextMenu: (e: React.MouseEvent, itemName: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Folder toggle state
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const handleRightClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    const xPos = e.pageX + 160 > window.innerWidth ? window.innerWidth - 160 : e.pageX;
    const yPos = e.pageY + 120 > window.innerHeight ? window.innerHeight - 120 : e.pageY;

    setMenuPosition({ x: xPos, y: yPos });
    setMenuVisible(true);
    setClickedItem(name);
    handleContextMenu(e, name); // Trigger parent context menu handler
  };

  const handleMenuAction = (action: string) => {
    console.log(`Performing ${action} on ${clickedItem}`);
    setMenuVisible(false); // Hide menu after the action
  };

  // Close menu on outside click
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

  // Helper function to check if an item is a folder (only folders have 'children')
  const isFolder = (item: FolderDto | FileDto): item is FolderDto => {
    return (item as FolderDto).children !== undefined;
  };

  return (
    <div>
      {/* Render the folder */}
      <div
        className='flex items-center cursor-pointer'
        onClick={() => setIsOpen(!isOpen)} // Toggle folder open/close
        onContextMenu={(e) => handleRightClick(e, folder.name)} // Handle right-click
      >
        {isOpen ? <FaRegFolderOpen /> : <FaRegFolder />}
        <span className='ml-2'>{folder.name}</span>
      </div>

      {/* Render folder's children when open */}
      {isOpen && (
        <div className='ml-4'>
          {/* Render children dynamically */}
          {folder.children?.map((child) =>
            isFolder(child) ? (
              // If the child is a folder, render another FolderStructure recursively
              <FolderStructure
                key={child._id}
                folder={child}
                handleContextMenu={handleContextMenu}
              />
            ) : (
              // If the child is a file, render the file
              <div
                key={child._id}
                className='flex items-center cursor-pointer'
                onContextMenu={(e) => handleRightClick(e, child.name)}
              >
                <CiFileOn />
                <span className='ml-2'>{child.name}</span>
              </div>
            )
          )}
        </div>
      )}

      {/* Render context menu */}
      {menuVisible && (
        <div
          className='fixed z-50 bg-white border shadow-md rounded p-2'
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
          <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Rename')}>
            Rename
          </div>
          <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Delete')}>
            Delete
          </div>
          <div className='hover:bg-gray-100 p-2 cursor-pointer' onClick={() => handleMenuAction('Move')}>
            Move
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderStructure;
