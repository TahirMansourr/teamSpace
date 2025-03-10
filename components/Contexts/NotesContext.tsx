"use client";
import { socket } from "@/socket";
import { NotesDto, ProjectDto, UserDto } from "@/Utils/types";
import { useContext, useState, createContext, useEffect, useMemo } from "react";
import { useNotesActions } from "./context-hooks/NoteContextHooks";
import { useSprintContext } from "./SprintContext";

type NotesContextDto = {
  allNotes: NotesDto[];
  formLoading: boolean;
  handleCreateNote: (
    body: string,
    close: () => void,
    e: React.FormEvent,
    backlogItemId?: string,
    backlogtitle?: string
  ) => void;
  handleUpdateNote: (
    existingNote: NotesDto,
    close: () => void,
    e: React.FormEvent
  ) => void;
  handleDeleteNote: (
    noteId: string,
    close: () => void,
    e: React.FormEvent,
    mainModalClose: () => void
  ) => void;
};

const NotesContext = createContext<NotesContextDto>({} as NotesContextDto);

export const useNotesContext = () => {
  if (NotesContext === undefined) {
    throw new Error(
      `Error at NotesContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(NotesContext);
  }
};

const NotesProvider = ({
  children,
  project,
  user,
}: {
  children: React.ReactNode;
  project: ProjectDto;
  user: UserDto;
}) => {
  const [userInfo] = useState<UserDto>(user);
  const [projectInfo] = useState<ProjectDto>(project);
  const [notes, setNotes] = useState<NotesDto[]>(project.notes);

  const { handleCreateNote, handleUpdateNote, handleDeleteNote, formLoading } =
    useNotesActions({ projectInfo, userInfo });
  const { setSelectedBacklogItemForSingleSprint } = useSprintContext();

  useEffect(() => {
    socket.on("newNote", (note: NotesDto) => {
      if (note) {
        setNotes((prev: NotesDto[]) => [
          { ...note, creator: userInfo },
          ...prev,
        ]);
        setSelectedBacklogItemForSingleSprint((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            notes: prev.notes ? [...prev.notes, note] : [note],
          };
        });
        console.log("i was triggered");
      } else {
        console.error(
          "Recieved Note is undefined or has not response property",
          note
        );
      }
    });
    socket.on("updateNote", (note: NotesDto) => {
      console.log("triggered");
      setNotes((prev: NotesDto[]) =>
        prev.map((prevNote: NotesDto) => {
          return prevNote._id === note._id ? note : prevNote;
        })
      );
      setSelectedBacklogItemForSingleSprint((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          notes: prev.notes?.map((t) => (t._id === note._id ? note : t)) || [],
        };
      });
    });
    socket.on("deleteNote", (noteId: string) => {
      setNotes((prev: NotesDto[]) =>
        prev.filter((note: NotesDto) => note._id !== noteId)
      );
    });

    return () => {
      socket.off("newNote");
      socket.off("updateNote");
      socket.off("deleteNote");
    };
  }, []);

  const value = useMemo(
    () => ({
      allNotes: notes,
      formLoading,
      handleCreateNote,
      handleUpdateNote,
      handleDeleteNote,
    }),
    [notes, formLoading, handleCreateNote, handleUpdateNote, handleDeleteNote]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
