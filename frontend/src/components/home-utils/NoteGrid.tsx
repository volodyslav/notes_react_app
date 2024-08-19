import { NoteType } from '../../types/note'
import NoteGridShow from './NoteGridShow';
import NoteGridEdit from './NoteGridEdit';
import { useEffect, useState } from 'react';

type NoteGridType = {
  note: NoteType;
}

const NoteGrid = ({note}: NoteGridType) => {

  // Check delete mode
  const [noteDelete, setNoteDelete] = useState(false);
  const [noteEdit, setNoteEdit] = useState(false);

  // Check edit mode
  const handleEditNote = () => {
    setNoteEdit(true);
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
      {!noteEdit && <NoteGridShow handleDeleteNoteFalse={handleDeleteNoteFalse} handleDeleteNoteTrue={handleDeleteNoteTrue} note={note} noteDelete={noteDelete}  handleEditNote={handleEditNote}/>}
      {noteEdit && <NoteGridEdit note={note} setNoteEdit={setNoteEdit}/>}
    </>
  )
}

export default NoteGrid