'use client';

import { FileDto, FolderDto } from "@/Utils/types";
import FolderStructure from "./FolderStructure";
import { CiFileOn } from "react-icons/ci";
import { useEffect, useState } from "react";


const FolderStructureWrapper = ({
  allFolders,
  allFiles
}: {
  allFolders: FolderDto[];
  allFiles: FileDto[];
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false); // Toggle folder open/close state
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Handle right-click for context menu
  const handleContextMenu = (e: React.MouseEvent, item: string) => {
    e.preventDefault();

    const menuHeight = 120; // Estimate menu height
    const menuWidth = 160;  // Estimate menu width

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

  // Close menu if clicking outside
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
    setMenuVisible(false); // Close menu after action
  };

  return (
    <div>
      {allFolders.map((folder) => (
        <FolderStructure 
          key={folder._id} 
          folder={folder} 
          // handleCloseMenu={handleCloseMenu} 
          handleContextMenu={handleContextMenu}
          />
      ))}

      {/* Render orphaned files (files without parent folders) */}
      <div>
        {allFiles.map((file) => (
          <div
            key={file._id}
            className='flex items-center cursor-pointer'
            onContextMenu={(e) => handleContextMenu(e, file.name)} // Right-click for context menu
          >
            <CiFileOn />
            <span className='ml-2'>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderStructureWrapper;