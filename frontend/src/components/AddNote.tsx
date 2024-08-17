import { useEffect, useState } from "react"
import { NoteType } from "../types/note"
import { useCollection } from "@squidcloud/react";
import { useTheme } from "../providers/ThemeProvider";

const AddNote = () => {
    // Initial values
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [endDate, setEndDate] = useState("");

    // Success message or error message
    const [success,setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
            // If add is successful
            setSuccess(true);
        }catch(e){
            console.error(e);
            setError(true);
        }
    }

    useEffect(() => {
        if (success && !error){
            // set false
            const timeout = setTimeout(() =>{
                setSuccess(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }

        else if (error){
            // set false
            const timeout = setTimeout(() =>{
                setError(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }

        // Clear inputs after successful or error message
        if (success){
            setTitle("");
            setText("");
        }

    }, [success, error]);

    

    return (
        <>
            <div className="flex justify-center md:text-4xl text-xl fixed top-24 left-1/2 transform z-40 -translate-x-1/2">
                {success && <p className="bg-success text-secondary p-4 rounded-lg">The note was added successfully</p>}
                {error && <p className="bg-red-800 text-white p-4 rounded-lg">An error occurred while adding the note. Please try again.</p>}
            </div>
            <div className={`flex flex-col justify-center items-center space-y-4 py-10 hover:scale-105  duration-500 rounded-2xl ease-in-out border-2 md:mx-32 mx-4 border-gray-600  ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`} >
                <h2 className="font-bold text-2xl md:text-5xl py-4 text-center">Add Note</h2>
                    <input
                        type="text"
                        id="title"
                        minLength={5}
                        maxLength={100}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`shadow hover:scale-105 text-xl  focus:scale-105 duration-700 text-black ease-in-out appearance-none my-4 w-3/4  border-2  rounded py-3 px-4 mb-3 placeholder-black leading-tight focus:outline-none ${theme === "dark" ? "bg-success  border-success" : "bg-primary  border-secondary"}`}
                    />
                    <textarea
                            id="text"
                            placeholder="Description"
                            maxLength={500}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className={`shadow hover:scale-105 text-xl placeholder-black w-3/4 text-black focus:scale-105 duration-700 ease-in-out appearance-none my-4 h-32   border-2 rounded py-3 px-4 resize-none focus:outline-none ${theme === "dark" ? "bg-success  border-success" : "bg-primary  border-secondary"}`}
                        />
                    <div className=" flex flex-col space-y-4 sm:space-y-0 sm:flex-row md:space-x-4 items-center  ">
                        <label htmlFor="dateEnd" className="text-xl font-bold">Last Date</label>
                        <input type="date" id="dateEnd"  value={endDate} className={`placeholder-black text-black ${theme === "dark" ? "bg-success  border-success" : "bg-primary border-secondary"} p-2 border rounded-md `}  onChange={(e) => setEndDate(e.target.value)}/>
                        <button disabled={title.length < 5} onClick={onAddNote} className="   duration-200 ease-in-out disabled:bg-gray-500 bg-dark text-white p-2 rounded-xl">
                            Submit
                        </button>
                    </div>
            </div>
        </>
    )
}

export default AddNote