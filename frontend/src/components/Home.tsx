import { useEffect, useState } from "react"
import NoteGrid from "./home-utils/NoteGrid"
import ButtonLoading from "../utils/ButtonLoading"
import { useNotes } from "../providers/NoteProvider"

const Home = () => {
  const [loading, setLoading] = useState(true);

  const { notes } = useNotes();

  // // Delete a note
  // const onDeleteNote  = (id: string) => {
  //   const noteFind = notes.data.find(note => note.data.id === id);
  //   if (noteFind){
  //     noteFind.delete();
  //   }
  // }

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
      <div className="grid  lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1 ">{!loading && notes && notes.map(note => (
        <NoteGrid key={note.id} note={note} />
      ))}</div>
      {!loading && !notes && <div>Please add new notes</div>}
    </div>
  )
}

export default Home