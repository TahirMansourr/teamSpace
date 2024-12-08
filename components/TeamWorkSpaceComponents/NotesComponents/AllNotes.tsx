"use client";
import { useNotesContext } from "@/components/Contexts/NotesContext";
import { NotesDto } from "@/Utils/types";
import React from "react";
import NotesCard from "./NotesCard";

const AllNotes = () => {
  const { allNotes } = useNotesContext();
  return (
    <div className=" grid grid-cols-5 m-5 gap-5">
      {allNotes.length > 0 ? (
        allNotes.map((note: NotesDto) => (
          <NotesCard key={note._id} Note={note} />
        ))
      ) : (
        <div>No notes found</div>
      )}
    </div>
  );
};

export default AllNotes;
