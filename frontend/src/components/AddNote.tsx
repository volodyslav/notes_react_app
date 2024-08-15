import { useState } from "react"
import { NoteType } from "../types/note"
import { useCollection } from "@squidcloud/react";
import { useTheme } from "../providers/ThemeProvider";

const AddNote = () => {
    // Initial values
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [endDate, setEndDate] = useState("");

    // Theme
    const { theme } = useTheme();

    // Notes db
    const noteCollection = useCollection<NoteType>("notes");

    // Add a note
    const onAddNote = () => {
        const noteId = crypto.randomUUID();
        noteCollection.doc(noteId).insert({
            id: noteId,
            title,
            text,
            end_date: new Date(endDate),
            date_added: new Date(),
            is_done: false,
            sub_notes: []
        })
    }

    

    return (
        <div className={`flex flex-col justify-center items-center  hover:scale-105  duration-500 rounded-2xl ease-in-out border-2 md:mx-32 mx-4 border-gray-600  ${theme === "dark" ? "bg-gray-700 text-primary" : "bg-primary shadow-2xl text-gray-700"}`} >
            <h2 className="font-bold text-2xl py-4 text-center">Add Note</h2>
            <form className="min-w-fit w-full flex flex-col items-center mx-2 space-y-10 mb-10">
                <input
                    type="text"
                    id="title"
                    minLength={5}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow hover:scale-105   focus:scale-105 duration-700 ease-in-out appearance-none my-4 w-3/4 text-black border-2  rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                />
                
                <textarea
                        id="text"
                        placeholder="Description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="shadow hover:scale-105 w-3/4 text-black focus:scale-105 duration-700 ease-in-out appearance-none my-4 h-32   border-2 rounded py-3 px-4 resize-none focus:outline-none "
                    />
                <div className=" flex space-x-2 items-center ">
                    <label htmlFor="dateEnd" className="text-xl font-bold">Last Date</label>
                    <input type="date" id="dateEnd"  className="text-black p-2 border rounded-md "  onChange={(e) => setEndDate(e.target.value)}/>
                </div>
                
            </form>
        </div>
    )
}

export default AddNote