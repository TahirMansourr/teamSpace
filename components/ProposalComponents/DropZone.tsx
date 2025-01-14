"use client";

import { UploadDropzone } from "@/Utils/uploadThing";
import { notifications } from "@mantine/notifications";
import React from "react";

const DropZone = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md w-[80%]">
      <div className="mt-4 ">
        <p className=" text-lg text-center font-bold mb-2 mx-auto flex w-full">
          Start by uploading client Request document (PDF or Word)
        </p>
        <UploadDropzone
          endpoint="documentUploader"
          appearance={{ button: "hover : cursor-pointer", label: "text-xl" }}
          onClientUploadComplete={async (res: any) => {
            console.log("Files uploaded:", res);
          }}
          onUploadError={(error: Error) => {
            notifications.show({
              message: `Upload failed: ${error.message}`,
              color: "red",
            });
          }}
        />
      </div>
    </div>
  );
};
export default DropZone;
