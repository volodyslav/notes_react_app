import { useTheme } from "../../providers/ThemeProvider"
import { NoteType } from "../../types/note";
import { format } from "date-fns";
import { FaRegSave } from "react-icons/fa";

type NoteEditType = {
    note: NoteType;
    handleSaveNote: () => void;
}

const NoteGridEdit = ({note, handleSaveNote}: NoteEditType) => {
    const { theme } = useTheme();

  return (
        <div className={`relative h-fit  p-10 shadow-2xl space-y-4 duration-300 ease-in-out rounded-xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
            <div className=' absolute right-2 top-2 items-center flex'>
                <button onClick={handleSaveNote} title="save button" className="md:text-4xl text-xl m-2 hover:scale-105 duration-500 ease-in-out"><FaRegSave/></button>
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
        </div>)
}

export default NoteGridEdit