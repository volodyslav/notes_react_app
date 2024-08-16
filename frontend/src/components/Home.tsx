import { useEffect, useState } from "react"
import { NoteType } from "../types/note"
import NoteGrid from "./home-utils/NoteGrid"
import { useCollection, useQuery } from "@squidcloud/react"
import ButtonLoading from "./home-utils/ButtonLoading"

const Home = () => {
  const [loading, setLoading] = useState(true);

  const collection = useCollection<NoteType>("notes");
  const notes = useQuery(collection.query());

  // unset loading
  useEffect(() => {
    const timeout = setTimeout(() =>{
      setLoading(false);
    }, 2000)
    return () => clearTimeout(timeout);
  }, [loading])

  return (
    <div className=" flex  justify-center mx-20">
      {loading && <ButtonLoading />}
      <div className="grid  lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1 ">{!loading && notes && notes.data.map(note => (
        <NoteGrid key={note.data.id} note={note.data} />
      ))}</div>
      {!loading && !notes && <div>Please add new notes</div>}
    </div>
  )
}

export default Home