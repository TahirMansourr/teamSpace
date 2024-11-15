"use client";
import { NotesDto } from "@/Utils/types";
import { Badge, Spoiler } from "@mantine/core";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import DOMPurify from "dompurify";
import CreateOrUpdateNotesModal from "./CreateOrUpdateNotesModal";
import { useDisclosure } from "@mantine/hooks";

const NotesCard = ({ Note }: { Note: NotesDto }) => {
  const date = new Date(Note.createdAt);
  const sanitizedContent = DOMPurify.sanitize(Note.body);
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (sanitizedContent) {
      setIsLoading(false);
    }
  }, [sanitizedContent]);

  return (
    <section className=" rounded-md  shadow-md flex flex-col justify-between my-2 border w-[90%] p-2 mx-auto min-h-[15rem] ">
      <CreateOrUpdateNotesModal
        modalOpened={modalOpened}
        closeModal={closeModal}
        initialValues={Note}
      />
      <Spoiler maxHeight={150} showLabel="..." hideLabel="Hide">
        {isLoading && (
          <div className="animate-pulse h-20 bg-gray-200 rounded" />
        )}
        <div
          className="text-xs font-light whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          style={{ display: isLoading ? "none" : "block" }}
        />
      </Spoiler>
      <footer className="flex justify-between items-center">
        <div className="flex text-xs gap-2">
          <p className=" text-gray-600">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex text-xs gap-2">
          <Badge>{Note.creator.username}</Badge>
        </div>
        <div>
          <FiEdit
            className=" ml-auto hover:cursor-pointer mr-3 hover:scale-110"
            color="blue"
            onClick={open}
          />
        </div>
      </footer>
    </section>
  );
};

export default NotesCard;
