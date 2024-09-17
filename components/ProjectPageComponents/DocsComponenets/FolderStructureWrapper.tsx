'use client';

import { FileDto, FolderDto } from "@/Utils/types";
import FolderStructure from "./FolderStructure";
import { CiFileOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import MenuForDocs from "./MenuForDocs";
import { useDocsContext } from "@/components/Contexts/DocsContext";


const FolderStructureWrapper = ({
  allFolders,
  allFiles
}: {
  allFolders: FolderDto[];
  allFiles: FileDto[];
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<FolderDto | FileDto | null>(null);
  const [chosenFile , setChosenFile] = useState<string | null>(null);
  const {setInitialContentOfFile} = useDocsContext()

  const handleContextMenu = (e: React.MouseEvent, item: FolderDto | FileDto) => {
    e.preventDefault();
    handleCloseMenu()
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


  return (
    <div>
      {allFolders.map((folder : FolderDto) => (
        <FolderStructure 
          key={folder._id} 
          folder={folder} 
          // handleCloseMenu={handleCloseMenu} 
          handleContextMenu={handleContextMenu}
          />
      ))}

      <div>
        {allFiles.map((file : FileDto) => (
          <div
            key={file._id}
            className='flex items-center cursor-pointer'
            onContextMenu={(e) => {
              handleContextMenu(e, file)
            }} 
            onClick={(e) => { setInitialContentOfFile(file.body)}}
          >
            <CiFileOn />
            <span className='ml-2'>{file.name}</span>
          </div>
        ))}
      </div>
      {
        menuVisible && (
        <MenuForDocs
         clickedItem= {clickedItem}
         menuPosition={menuPosition}
         setMenuVisible={setMenuVisible}
        />
      )
      }
    </div>
  );
};

export default FolderStructureWrapper;