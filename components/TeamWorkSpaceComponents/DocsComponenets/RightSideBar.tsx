"use client";
import { useDocsContext } from "@/components/Contexts/DocsContext";
import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { TfiSave } from "react-icons/tfi";
import { Avatar } from "@mantine/core";
import { DocsComponentWrapper } from "./DocsComponentWrapper";
import { MdEdit, MdPreview } from "react-icons/md";

const RightSideBar = ({
  edit,
  setEdit,
  content,
}: {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  content: string;
}) => {
  const { handleUpdateFile, selectedFile } = useDocsContext();

  const formatDate = (date: any) => {
    if (!date) return "";
    const validDate = new Date(date);
    return isNaN(validDate.getTime()) ? "" : validDate.toDateString();
  };

  return (
    <DocsComponentWrapper className="shadow-lg h-full rounded-lg">
      <div className="flex flex-col w-full p-4 h-full ">
        <span className="flex w-full mx-auto justify-center mb-4 font-mono text-lg p-2 rounded-md bg-white/50">
          {edit ? "You are now in Editing Mode" : "You are now in Preview Mode"}
        </span>
        <div className="flex gap-2 w-full mb-4 border-b border-slate-200 pb-4">
          <Button
            variant="light"
            className={`flex-1 transition-all duration-200 ${
              edit
                ? "hover:bg-purple-50 text-purple-600"
                : "hover:bg-blue-50 text-blue-600"
            }`}
            onClick={() => setEdit(!edit)}
          >
            <div className="flex items-center justify-center gap-2">
              {edit ? (
                <MdPreview className="text-lg" />
              ) : (
                <MdEdit className="text-lg" />
              )}
              <span>{edit ? "Preview" : "Edit"}</span>
            </div>
          </Button>
          <Button
            variant="light"
            className="hover:bg-green-50 transition-all duration-200 flex-1"
            onClick={() => {
              handleUpdateFile({ content });
              setEdit(false);
            }}
          >
            <div className="flex items-center justify-center gap-2 text-green-600">
              <TfiSave className="text-lg" />
              <span>Save</span>
            </div>
          </Button>
        </div>

        <div className="flex flex-col space-y-6 px-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-700">
              {selectedFile?.name}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-500">Created By</h4>
              <div className="flex items-center gap-3 p-2 rounded-md bg-white/50">
                <Avatar
                  size={35}
                  src={selectedFile?.createdBy?.image}
                  alt="Creator avatar"
                />
                <p className="font-medium text-slate-700">
                  {selectedFile?.createdBy?.username}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-500">Edited By</h4>
              <div className="flex items-center gap-3 p-2 rounded-md bg-white/50">
                <Avatar
                  size={35}
                  src={selectedFile?.createdBy?.image}
                  alt="Editor avatar"
                />
                <p className="font-medium text-slate-700">
                  {selectedFile?.createdBy?.username}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-500">Timestamps</h4>
              <div className="space-y-2 p-2 rounded-md bg-white/50">
                <p className="text-sm text-slate-600">
                  Created: {formatDate(selectedFile?.createdAt)}
                </p>
                <p className="text-sm text-slate-600">
                  Modified: {formatDate(selectedFile?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsComponentWrapper>
  );
};

export default RightSideBar;
