"use client";
import { NotesDto } from "@/Utils/types";
import { Badge, Spoiler, Avatar } from "@mantine/core";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import DOMPurify from "dompurify";
import CreateOrUpdateNotesModal from "./CreateOrUpdateNotesModal";
import { useDisclosure } from "@mantine/hooks";
import { BiTime } from "react-icons/bi";

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
    <section className="w-[90%] mx-auto transform transition-all duration-300 hover:-translate-y-1 mb-3">
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-sm border border-indigo-100 p-5 min-h-[15rem] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Avatar
              src={Note.creator.image || "https://github.com/user.png"}
              size="md"
              radius="xl"
              className="border-2 border-white ring-2 ring-indigo-50"
            />
            <div>
              <Badge variant="dot" color="indigo" size="lg">
                {Note.creator.username}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <BiTime />
                <span>{date.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Spoiler
            maxHeight={150}
            showLabel="Read more"
            hideLabel="Show less"
            className="prose prose-sm max-w-none"
          >
            {isLoading ? (
              <div className="animate-pulse h-20 bg-gray-100 rounded" />
            ) : (
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                style={{ display: isLoading ? "none" : "block" }}
              />
            )}
          </Spoiler>
        </div>

        <div className="flex justify-end mt-4 pt-3 border-t border-indigo-100">
          <button
            onClick={open}
            className="p-2 hover:bg-indigo-50 rounded-full transition-colors group"
          >
            <FiEdit
              size={20}
              className="text-indigo-600 group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      <CreateOrUpdateNotesModal
        modalOpened={modalOpened}
        closeModal={closeModal}
        initialValues={Note}
      />
    </section>
  );
};

export default NotesCard;
