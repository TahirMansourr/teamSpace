"use client";
import { useDocsContext } from "@/components/Contexts/DocsContext";
import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { TfiSave } from "react-icons/tfi";
import { Avatar } from "@mantine/core";
import { DocsComponentWrapper } from "./DocsComponentWrapper";

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

  // Function to safely format the date if available
  const formatDate = (date: any) => {
    if (!date) return ""; // Handle undefined/null case
    const validDate = new Date(date); // Convert to Date object
    return isNaN(validDate.getTime()) ? "" : validDate.toDateString(); // Check if it's a valid date
  };
  return (
    <DocsComponentWrapper className="">
      <div className="flex flex-col justify-center w-full pl-3">
        <div className="flex mx-auto">
          <Button onClick={() => setEdit(!edit)} className="">
            {edit ? "Preview" : "Edit"}
          </Button>
          <Button variant="transparent">
            <TfiSave
              size={35}
              onClick={() => {
                handleUpdateFile({ content });
                setEdit(false);
              }}
            />
          </Button>
        </div>
        <div className="flex flex-col pt-10">
          <h3>{selectedFile?.name}</h3>
          <h4>Created By</h4>
          <div className="flex gap-2">
            <Avatar
              size={30}
              src={selectedFile?.createdBy?.image}
              alt="it's me"
            />
            <p className="font-semibold">{selectedFile?.createdBy?.username}</p>
          </div>
          <h4>Edited By</h4>
          <div className="flex gap-2">
            <Avatar
              size={30}
              src={selectedFile?.createdBy?.image}
              alt="it's me"
            />
            <p className="font-semibold">{selectedFile?.createdBy?.username}</p>
          </div>
          <h4>Created At</h4>
          <div className="flex flex-col gap-2">
            <p>{formatDate(selectedFile?.createdAt)}</p>
            <p>{formatDate(selectedFile?.createdAt)}</p>
          </div>
        </div>
      </div>
    </DocsComponentWrapper>
  );
};

export default RightSideBar;
