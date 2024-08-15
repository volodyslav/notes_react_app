import { NoteType } from "../types/note"
import NoteGrid from "./home-utils/NoteGrid"

type NoteListType = {
  notes: NoteType[],
  onDeleteNote: (id: string) => void;
  onAddSubNote: (noteId: string, subNote: string) => void;
  onDeleteSubNote: (noteId: string, subNoteIndex: number) => void;
}

const Home = ({notes, onDeleteNote, onAddSubNote, onDeleteSubNote}: NoteListType) => {
  return (
    <div>
      {notes && notes.map((note, index) => <NoteGrid 
        key={index}
        note={note}
        index={index}
        onDeleteNote={onDeleteNote}
        onAddSubNote={onAddSubNote}
        onDeleteSubNote={onDeleteSubNote}
      />)}
    </div>
  )
}

export default Home