import { CreateNote, DeleteNote, UpdateNote } from "@/lib/actions/NoteAction";
import { socket } from "@/socket";
import { NotesDto, ProjectDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type NotesActionsTypes = {
    projectInfo : ProjectDto
    userInfo : UserDto
}

export const useNotesActions = ({projectInfo , userInfo}:NotesActionsTypes)=>{
    const [formLoading, setFormLoading] = useState(false);

    async function handleCreateNote(body : string, close : ()=>void , e : React.FormEvent){
          e.preventDefault()
            setFormLoading(true)
            try {
                const new_note = await CreateNote({
                    projectId : projectInfo._id,
                    body,
                    creator : userInfo._id
                })
                if(new_note.status === 'success'){
                    socket.emit('newNote' , new_note.note)
                }else{
                  notifications.show({ message : 'Error creating note' , color : 'red'})
                }         
            } catch (error) {
                throw new Error(`error at handleCreateNote : ${error}`)
            }finally{
                setFormLoading(false)
                close()
                notifications.show({ message : 'created Note successfully' , color : 'green'})
            }
        }

         async function handleUpdateNote(existingNote: NotesDto, close: () => void , e : React.FormEvent) {
              e.preventDefault();
              setFormLoading(true);
              try {
                const new_note = await UpdateNote({
                  projectId: projectInfo._id,
                  body: existingNote.body,
                  creator: existingNote.creator._id,
                  createdAt : existingNote.createdAt,
                  _id: existingNote._id
                })
                   socket.emit('updateNote', {...new_note.note , creator : existingNote.creator});
                notifications.show({ message: 'Updated Note successfully', color: 'blue' });
              } catch (error) {
                throw new Error(`error at handleUpdateNote : ${error}`);
              } finally {
                setFormLoading(false);
                close();
              }
            }

            async function handleDeleteNote(noteId: string, close: () => void , e : React.FormEvent , mainModalClose : ()=>void) {
                  e.preventDefault();
                  setFormLoading(true);
                  try {
                    const res = await DeleteNote({noteId});
                    if (res.status === 'success') {
                        socket.emit('deleteNote' , noteId)
                    //   setNotes((prev : NotesDto[]) => prev.filter((note : NotesDto) => note._id !== noteId));
                    //   notifications.show({ message: 'Deleted Note successfully', color: 'blue' });
                    }
                  } catch (error) {
                    throw new Error(`error at handleDeleteNote : ${error}`);
                  } finally {
                    setFormLoading(false);
                    close();
                    mainModalClose();
                  }
                }

        return {
            handleCreateNote,
            formLoading,
            handleUpdateNote,
            handleDeleteNote,
        }
}