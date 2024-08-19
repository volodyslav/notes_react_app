import { useTheme } from "../../providers/ThemeProvider"
import { NoteType } from "../../types/note";
import { AiOutlineCloseSquare } from "react-icons/ai";
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

    // Close the note editor
    const handleCloseEditor = () => {
        setNoteEdit(false);
    }

  return (
        <div className={`relative h-fit  p-10 shadow-2xl space-y-4 duration-300 ease-in-out rounded-xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
            <div className=' absolute right-2 top-4  items-center flex'>
                <button  onClick={() => handleUpdateNote(note.id)} title="save button" className="md:text-3xl text-xl hover:scale-105 duration-500 ease-in-out"><FaRegSave/></button>
                <button onClick={handleCloseEditor} title="close editor" className="md:text-3xl text-xl hover:scale-105 duration-500  ease-in-out"><AiOutlineCloseSquare /></button>
            </div>

            <input className='md:text-3xl text-xl w-full rounded-lg p-2' onChange={(e) => setTitleEdit(e.target.value)} value={note.title}/>
            <textarea className='md:text-3xl text-xl resize-none w-full p-2 rounded-lg' onChange={(e) => setTextEdit(e.target.value)}>{note.text}</textarea>
            <div className='flex justify-between items-center'> 
                <div>
                    <input type="date" onChange={(e) => setEndDateEdit(new Date(e.target.value))} className=" rounded-xl p-2" value={endDateEdit.toISOString().substring(0, 10)}  />
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="default-checkbox" className={`${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>Done</label>
                    <input id="default-checkbox" type="checkbox" onChange={() => setIsDoneEdit(!isDoneEdit)} className={`  w-4 h-4 rounded-xl  f${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"} `} />
                    
                </div>
            </div>
        </div>)
}

export default NoteGridEdit