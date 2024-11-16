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
    <main className="flex flex-grow">
      <section className="flex flex-grow">
        <div className="flex-[0.2] min-w-[200px] pt-20">
          <LeftSideBar />
        </div>
        <DocsComponentWrapper className="flex-[0.6] min-w-[600px] mx-auto py-5 px-5">
          {edit ? (
            <TiptapForDocs
              content={content}
              onChange={(newContent: string) => handleContentChange(newContent)}
            />
          ) : null}
          {!edit ? (
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : null}
        </DocsComponentWrapper>
        <div className="flex-[0.2] min-w-[200px] pt-2">
          <RightSideBar edit={edit} setEdit={setEdit} content={content} />
        </div>
      </section>
    </main>
  );
};

export default MainDocPage;
