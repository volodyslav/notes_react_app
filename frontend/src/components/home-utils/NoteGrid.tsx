import { NoteType } from '../../types/note'
import NoteGridShow from './NoteGridShow';
import NoteGridEdit from './NoteGridEdit';
import { useEffect, useState } from 'react';

type NoteGridType = {
  note: NoteType;
  onDeleteNote: (id: string) => void;
}

const NoteGrid = ({note, onDeleteNote}: NoteGridType) => {

  // Check delete mode
  const [noteDelete, setNoteDelete] = useState(false);
  const [noteEdit, setNoteEdit] = useState(false);

  // Check edit mode
  const handleEditNote = () => {
    setNoteEdit(true);
  }
  const handleSaveNote = () => {
    setNoteEdit(false);
  }

  // Check delete mode
  const handleDeleteNoteTrue = () => {
    setNoteDelete(true);
  }
  const handleDeleteNoteFalse = () => {
    setNoteDelete(false);
  }

  useEffect(() => {
    if (noteDelete) { 
      const timeout = setTimeout(() =>{
        setNoteDelete(false);
      }, 20000)

      return () => clearTimeout(timeout);
    }

  }, [noteDelete])

  
  return (
    <>
      {!noteEdit && <NoteGridShow handleDeleteNoteFalse={handleDeleteNoteFalse} handleDeleteNoteTrue={handleDeleteNoteTrue} note={note} noteDelete={noteDelete} onDeleteNote={onDeleteNote} handleEditNote={handleEditNote}/>}
      {noteEdit && <NoteGridEdit note={note} handleSaveNote={handleSaveNote}/>}
    </>
  )
}

export default NoteGrid