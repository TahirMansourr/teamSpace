"use client";
import React, { useState } from "react";
import Tiptap from "../TipTapEditor/TipTap";
import { Button, LoadingOverlay, Modal } from "@mantine/core";
import { useNotesContext } from "../Contexts/NotesContext";
import { NotesDto } from "@/Utils/types";
import { MdOutlineDeleteSweep, MdSaveAlt } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

const CreateOrUpdateNote = ({
  existingNoteContent,
  close,
}: {
  existingNoteContent?: NotesDto;
  close: () => void;
}) => {
  const { formLoading, handleCreateNote, handleUpdateNote, handleDeleteNote } =
    useNotesContext();
  const [content, setContent] = useState<string>(
    existingNoteContent ? existingNoteContent.body : ""
  );
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  let creationDate;
  let updateDate;
  if (existingNoteContent) {
    creationDate = new Date(existingNoteContent.createdAt);
    updateDate = existingNoteContent.updatedAt
      ? new Date(existingNoteContent.updatedAt)
      : null;
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!existingNoteContent) {
      handleCreateNote(content, close, e);
    } else {
      handleUpdateNote({ ...existingNoteContent, body: content }, close, e);
    }
  };

  return (
    <>
      <LoadingOverlay visible={formLoading} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-lg  w-full h-full"
      >
        <div className="p-4 flex-grow">
          <Tiptap
            content={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </div>

        <div className="flex w-full justify-between items-center p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <div className="flex flex-col gap-1">
            {existingNoteContent && (
              <p className="text-xs text-gray-600 font-medium">
                Created: {creationDate?.toLocaleString()}
              </p>
            )}
            {updateDate && (
              <p className="text-xs text-gray-600 font-medium">
                Last Updated: {updateDate.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="subtle"
              className="hover:bg-red-50 transition-colors"
              onClick={openDeleteModal}
            >
              <MdOutlineDeleteSweep size={25} className="text-red-500" />
            </Button>
            <Button
              type="submit"
              variant="subtle"
              className="hover:bg-blue-50 transition-colors"
            >
              <MdSaveAlt size={25} className="text-blue-600" />
            </Button>
          </div>
        </div>
      </form>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 4,
        }}
        className="bg-transparent"
      >
        <div className="flex flex-col items-center p-8 bg-white rounded-xl">
          <LoadingOverlay visible={formLoading} />
          <div className="mb-6 bg-red-50 p-4 rounded-full">
            <MdOutlineDeleteSweep size={50} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Delete Note</h2>
          <p className="text-gray-600 mb-8 text-center">
            This action cannot be undone. Are you sure you want to delete this
            note?
          </p>
          <div className="flex gap-4">
            <Button
              onClick={closeDeleteModal}
              variant="outline"
              className="px-8 py-2 hover:bg-gray-50 transition-colors"
            >
              No, Keep It
            </Button>
            {existingNoteContent?._id && (
              <Button
                color="red"
                className="px-8 py-2 bg-red-500 hover:bg-red-600 transition-colors"
                onClick={(e) => {
                  handleDeleteNote(
                    existingNoteContent._id,
                    closeDeleteModal,
                    e,
                    close
                  );
                }}
              >
                Yes, Delete
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateOrUpdateNote;
