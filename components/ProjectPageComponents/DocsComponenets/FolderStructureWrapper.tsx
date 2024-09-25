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

 
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<FolderDto | FileDto | null>(null);
  const [ showInputField , setShowInputField] = useState<boolean>(false)
  const {setInitialContentOfFile , setSelectedFile} = useDocsContext()

  const handleContextMenu = (e: React.MouseEvent, item: FolderDto | FileDto) => {
    e.preventDefault();
    handleCloseMenu();
    setShowInputField(false)
    const menuHeight = 120; 
    const menuWidth = 160;  

    let xPos = e.pageX + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : e.pageX;
    let yPos = e.pageY + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : e.pageY;

    setMenuPosition({ x: xPos + 2, y: yPos + 2 });
    setMenuVisible(true);
    setClickedItem(item);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
    setClickedItem(null);
  };

  
  return (
    <div>
      {allFolders.map((folder : FolderDto) => (
        <FolderStructure 
          key={folder._id} 
          folder={folder}  
          handleContextMenu={handleContextMenu}
          showInputField = {showInputField}
          setShowInputField = {setShowInputField}
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
            onClick={(e) => { 
              setInitialContentOfFile(file.body)
              setSelectedFile(file)
            }}
          >
            <CiFileOn />
            <span className='ml-2'>{file.name}</span>
          </div>
        ))}
      </div>
      {
        menuVisible && (
        <MenuForDocs
         setShowInputField={setShowInputField}
         showInputField ={showInputField}
         clickedItem= {clickedItem}
         menuPosition={menuPosition}
         setMenuVisible={setMenuVisible}
         isChild = {false}
        />
      )
      }
    </div>
  );
};

export default FolderStructureWrapper;