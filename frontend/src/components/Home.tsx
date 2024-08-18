import { useEffect, useState } from "react"
import { NoteType } from "../types/note"
import NoteGrid from "./home-utils/NoteGrid"
import { useCollection, useQuery } from "@squidcloud/react"
import ButtonLoading from "../utils/ButtonLoading"

const Home = () => {
  const [loading, setLoading] = useState(true);

  const collection = useCollection<NoteType>("notes");
  const notes = useQuery(collection.query());

  // Delete a note
  const onDeleteNote  = (id: string) => {
    const noteFind = notes.data.find(note => note.data.id === id);
    if (noteFind){
      noteFind.delete();
    }
  }

  // unset loading
  useEffect(() => {
    const timeout = setTimeout(() =>{
      setLoading(false);
    }, 2000)
    return () => clearTimeout(timeout);
  }, [loading])

  return (
    <div className=" flex  justify-center md:mx-10 mx-2">
      {loading && <ButtonLoading text="Loading..."/>}
      <div className="grid  lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1 ">{!loading && notes && notes.data.map(note => (
        <NoteGrid key={note.data.id} note={note.data} onDeleteNote={onDeleteNote} />
      ))}</div>
      {!loading && !notes && <div>Please add new notes</div>}
    </div>
  )
}

export default Home