"use client";
import TiptapForDocs from "@/components/TipTapForDocs/tipTapForDocs";
import React, { useEffect, useState } from "react";
import "./singleDoc.css";
// import SideBarForDocs from './SideBarForDocs'
import LeftSideBar from "./LeftSideBar";
import { useDocsContext } from "@/components/Contexts/DocsContext";
import RightSideBar from "./RightSideBar";
import Docs from "../SideBarPages/Docs";
import { DocsComponentWrapper } from "./DocsComponentWrapper";
import { ScrollArea } from "@mantine/core";

const MainDocPage = () => {
  const { initialContentOfFile } = useDocsContext();
  const [content, setContent] = useState(initialContentOfFile);
  const [edit, setEdit] = useState(false);
  console.log("🚀 ~ SingleDoc ~ content:", content);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  useEffect(() => {
    setContent(initialContentOfFile);
    console.log("🚀 ~ useEffect ~ initialContentOfFile:", initialContentOfFile);
  }, [initialContentOfFile]);

  return (
    <main className="flex flex-grow gap-8">
      <div className="flex-[0.2]  pt-20">
        <LeftSideBar />
      </div>
      <ScrollArea className="flex-[0.6] h-[calc(100vh-1rem)] border rounded-[50px] shadow-[0px_20px_60px_#bebebe,_-20px_-20px_60px_#ffffff] bg-[#e0e0e0]">
        <DocsComponentWrapper className="mx-auto py-5 px-5 border-none rounded-none shadow-none">
          {edit ? (
            <TiptapForDocs
              content={content}
              onChange={(newContent: string) => handleContentChange(newContent)}
            />
          ) : (
            <div
              className="w-full min-h-[calc(100vh)]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </DocsComponentWrapper>
      </ScrollArea>
      <div className="flex-[0.2]  pt-2">
        <RightSideBar edit={edit} setEdit={setEdit} content={content} />
      </div>
    </main>
  );
};

export default MainDocPage;
