import { useNotesContext } from "@/components/Contexts/NotesContext";
import { NotesDto } from "@/Utils/types";
import React from "react";
import NotesCard from "./NotesCard";

const TeamSpaceNotes = () => {
  const { allNotes } = useNotesContext();
  return (
    <section className="flex flex-col w-full gap-3">
      {allNotes.length > 0 ? (
        allNotes.map((note: NotesDto) => (
          <NotesCard key={note._id} Note={note} />
        ))
      ) : (
        <h1>No Notes</h1>
      )}
    </section>
  );
};

export default TeamSpaceNotes;
