"use client";
import { useDocsContext } from "@/components/Contexts/DocsContext";
import { Button, TextInput, Tree } from "@mantine/core";
import React, { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import FolderStructureWrapper from "./FolderStructureWrapper";
import { DocsComponentWrapper } from "./DocsComponentWrapper";

const LeftSideBar = () => {
  const { allFolders, allFiles } = useDocsContext();
  const [title, setTitle] = useState<string>("");
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const [createFile, setCreateFile] = useState<boolean>(false);
  const [type, setType] = useState<"File" | "Folder">("File");
  const { handleCreateDoc } = useDocsContext();

  return (
    <DocsComponentWrapper className="shadow-lg h-full rounded-lg ">
      <div className="w-full flex flex-col items-center p-4 h-full">
        <div className="flex gap-2 w-full mb-4 border-b border-slate-200 pb-4">
          <Button
            variant="light"
            size="compact-md"
            className="hover:bg-blue-50 transition-all duration-200 flex-1"
            onClick={() => {
              setCreateFile(false);
              setCreateFolder(true);
              setType("Folder");
            }}
          >
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span>+</span>
              <FaRegFolderOpen className="text-lg" />
            </div>
          </Button>
          <Button
            variant="light"
            size="compact-md"
            className="hover:bg-purple-50 transition-all duration-200 flex-1"
            onClick={() => {
              setCreateFolder(false);
              setCreateFile(true);
              setType("File");
            }}
          >
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <span>+</span>
              <CiFileOn className="text-lg" />
            </div>
          </Button>
        </div>
        {(createFolder || createFile) && (
          <div className="flex gap-2 w-full mb-4 px-2">
            <TextInput
              className="flex-1"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: createFolder
                      ? "rgb(59 130 246)"
                      : "rgb(147 51 234)",
                  },
                },
              }}
              leftSection={
                createFolder ? (
                  <FaRegFolderOpen className="text-blue-500" />
                ) : (
                  <CiFileOn className="text-purple-500" />
                )
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`New ${type}...`}
            />
            <Button
              variant="subtle"
              className={`hover:bg-green-50 ${
                title.length > 0 ? "opacity-100" : "opacity-50"
              }`}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (title.length > 0) {
                  await handleCreateDoc(title, type);
                  setCreateFolder(false);
                  setCreateFile(false);
                  setTitle("");
                }
              }}
            >
              <MdOutlineDone size={20} className="text-green-600" />
            </Button>
          </div>
        )}
        <div className="w-full">
          <FolderStructureWrapper allFolders={allFolders} allFiles={allFiles} />
        </div>
      </div>
    </DocsComponentWrapper>
  );
};

export default LeftSideBar;
