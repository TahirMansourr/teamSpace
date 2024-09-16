'use client';
import React, { useState, useEffect } from 'react';
import { FileDto, FolderDto } from '@/Utils/types';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { CiFileOn } from 'react-icons/ci';

const FolderStructureWrapper = ({ allFolders, allFiles }: { allFolders: FolderDto[], allFiles: FileDto[] }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const handleContextMenu = (e: React.MouseEvent, item: string) => {
    e.preventDefault();

    const menuHeight = 120; // Estimate menu height
    const menuWidth = 160;  // Estimate menu width

    // Calculate where to position the menu, considering screen boundaries
    let xPos = e.pageX + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : e.pageX;
    let yPos = e.pageY + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : e.pageY;

    setMenuPosition({ x: xPos, y: yPos });
    setMenuVisible(true);
    setClickedItem(item);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
    setClickedItem(null);
  };

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuVisible) {
        handleCloseMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  const handleMenuAction = (action: string) => {
    console.log(`${action} clicked for ${clickedItem}`);
    setMenuVisible(false);
  };

  return (
    <div>
      <ul>
        {allFolders.map((folder) => (
          <li
            key={folder._id}
            className='flex gap-1 items-center'
            onContextMenu={(e) => handleContextMenu(e, folder.name)} // Right-click handler
          >
            <FaRegFolderOpen />
            {folder.name}
          </li>
        ))}
      </ul>

      <ul>
        {allFiles.map((file) => (
          <li
            key={file._id}
            className='flex gap-1 items-center'
            onContextMenu={(e) => handleContextMenu(e, file.name)} // Right-click handler
          >
            <CiFileOn />
            {file.name}
          </li>
        ))}
      </ul>

      {menuVisible && (
        <div
          className='fixed z-50 bg-white border shadow-md rounded p-2'
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
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

export default FolderStructureWrapper;
