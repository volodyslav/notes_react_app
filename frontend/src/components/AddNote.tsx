import { useState } from "react"
import { NoteType } from "../types/note"
import { useCollection } from "@squidcloud/react";
import { useTheme } from "../providers/ThemeProvider";

const AddNote = () => {
    // Initial values
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      });

    // Success message or error message
    //const [success, successMessage] = useState(false);
    //const [error, setError] = useState(true);

    // Theme
    const { theme } = useTheme();

    // Notes db
    const noteCollection = useCollection<NoteType>("notes");

    // Add a note
    const onAddNote = () => {
        try{
            const noteId = crypto.randomUUID();
            noteCollection.doc(noteId).insert({
                id: noteId,
                title,
                text,
                end_date: new Date(endDate),
                date_added: new Date(new Date().toISOString().split('T')[0]),
                is_done: false,
                sub_notes: []
            })
        }catch(e){
            console.error(e);
        }
        
    }

    

    return (
        <div className={`flex flex-col justify-center items-center space-y-4 py-10 hover:scale-105  duration-500 rounded-2xl ease-in-out border-2 md:mx-32 mx-4 border-gray-600  ${theme === "dark" ? "bg-gray-700 text-primary" : "bg-primary shadow-2xl text-gray-700"}`} >
            <h2 className="font-bold text-2xl md:text-5xl py-4 text-center">Add Note</h2>
                <input
                    type="text"
                    id="title"
                    minLength={5}
                    maxLength={100}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow hover:scale-105   focus:scale-105 duration-700 ease-in-out appearance-none my-4 w-3/4 text-black border-2  rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                />
                <textarea
                        id="text"
                        placeholder="Description"
                        maxLength={500}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="shadow hover:scale-105 w-3/4 text-black focus:scale-105 duration-700 ease-in-out appearance-none my-4 h-32   border-2 rounded py-3 px-4 resize-none focus:outline-none "
                    />
                <div className=" flex flex-col space-y-4 sm:space-y-0 sm:flex-row md:space-x-4 items-center  ">
                    <label htmlFor="dateEnd" className="text-xl font-bold">Last Date</label>
                    <input type="date" id="dateEnd"  value={endDate} className="text-black p-2 border rounded-md "  onChange={(e) => setEndDate(e.target.value)}/>
                    <button disabled={title.length < 5} onClick={onAddNote} className=" bg-yellow-800 hover:bg-yellow-600 duration-200 ease-in-out disabled:bg-gray-500 text-white p-2 rounded-xl">
                        Submit
                    </button>
                </div>
                
            
        </div>
    )
}

export default AddNote