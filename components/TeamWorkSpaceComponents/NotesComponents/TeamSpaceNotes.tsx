import { useNotesContext } from "@/components/Contexts/NotesContext";
import { NotesDto } from "@/Utils/types";
import React from "react";
import NotesCard from "./NotesCard";

const TeamSpaceNotes = () => {
  const { allNotes } = useNotesContext();
  return (
    <section>
      {allNotes ? (
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
