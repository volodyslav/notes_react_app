import { format } from 'date-fns'
import { TiDelete } from "react-icons/ti";
import { NoteType } from '../../types/note';
import { useTheme } from '../../providers/ThemeProvider'

type NoteGridShowType = {
    note: NoteType;
    noteDelete: boolean;
    handleDeleteNoteFalse: () => void;
    handleDeleteNoteTrue: () => void;
    onDeleteNote: (id: string) => void;
}

const NoteGridShow = ({note, noteDelete, handleDeleteNoteFalse, handleDeleteNoteTrue, onDeleteNote}: NoteGridShowType) => {
    const { theme } = useTheme()
  
    return (
    <div className={`relative h-fit  p-10 shadow-2xl space-y-4 duration-300 ease-in-out rounded-xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
      <div className={`${noteDelete ? " visible" : "hidden"} ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"} p-4 border-2 border-yellow-800 rounded-xl text-xl duration-500 ease-in-out absolute -right-10 -top-16 z-40`}>
          <p className='text-xl lg:text-2xl'>Are you sure?</p>
          <div className='flex justify-center gap-4'>
            <button className='bg-red-800 hover:bg-red-600 duration-200 ease-in-out p-2 rounded-2xl text-white' onClick={() => onDeleteNote(note.id)}>Yes</button> 
            <button className='bg-green-800 hover:bg-green-600 duration-200 ease-in-out p-2 rounded-2xl text-white' onClick={handleDeleteNoteFalse}>No</button> 
          </div>
        </div>
      <div className=' absolute right-2 top-2 '>
        <button onClick={handleDeleteNoteTrue} title='delete note button' className='lg:text-4xl text-xl text-red-700 hover:scale-105 duration-500 ease-in-out'>
          <TiDelete />
        </button>
      </div>
      <h1 className='md:text-5xl text-2xl'>{note.title}</h1>
      <p className='md:text-2xl text-xl'>{note.text}</p>
      <div className='flex justify-between items-center'> 
        <div>
          <p>Start date: {format(note.date_added, "PPP")}</p>
          <p>End date: {format(note.end_date, "PPP")}</p>
        </div>
        <div >
            <p className={`ms-2 ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>{note.is_done ? "Done" : "Still active"}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteGridShow