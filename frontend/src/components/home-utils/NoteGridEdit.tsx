import { useTheme } from "../../providers/ThemeProvider"
import { NoteType } from "../../types/note";
import { format } from "date-fns";
import { FaRegSave } from "react-icons/fa";
import { useNotes } from "../../providers/NoteProvider";
import { useState } from "react";

type NoteEditType = {
    note: NoteType;
    setNoteEdit: (noteEdit: boolean) => void;
}

const NoteGridEdit = ({note, setNoteEdit}: NoteEditType) => {
    // Form state for editing the note
    const [titleEdit, setTitleEdit] = useState(note.title);
    const [textEdit, setTextEdit] = useState(note.text);
    const [endDateEdit, setEndDateEdit] = useState(note.end_date);
    const [isDoneEdit, setIsDoneEdit] = useState(note.is_done);

    const { theme } = useTheme();

    const { updateNote } = useNotes();

    // Save the note
    const handleUpdateNote = async (id: string) => {
        const noteFind = note.id === id;
        if (noteFind) {
            await updateNote({...note, title: titleEdit, text: textEdit, end_date: endDateEdit, is_done: isDoneEdit});
        } else {
            console.error('Note not found to update');
        }
        setNoteEdit(false);
    }

  return (
        <div className={`relative h-fit  p-10 shadow-2xl space-y-4 duration-300 ease-in-out rounded-xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
            <div className=' absolute right-3 top-1 items-center flex'>
                <button onClick={() => handleUpdateNote(note.id)} title="save button" className="md:text-4xl text-xl hover:scale-105 duration-500 ease-in-out"><FaRegSave/></button>
            </div>

            <input className='md:text-5xl text-2xl w-full rounded-lg p-2' onChange={(e) => setTitleEdit(e.target.value)} value={note.title}/>
            <textarea className='md:text-2xl text-xl resize-none w-full p-2 rounded-lg' onChange={(e) => setTextEdit(e.target.value)}>{note.text}</textarea>
            <div className='flex justify-between items-center'> 
                <div>
                    <input type="date" />
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="default-checkbox" className={`${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>Done</label>
                    <input id="default-checkbox" type="checkbox" onChange={() => setIsDoneEdit(!isDoneEdit)} className={`w-4 h-4 rounded  f${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"} `} />
                    
                </div>
            </div>
        </div>)
}

export default NoteGridEdit