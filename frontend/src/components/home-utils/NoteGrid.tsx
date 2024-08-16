import { NoteType } from '../../types/note'

type NoteGridType = {
  note: NoteType;
}

const NoteGrid = ({note}: NoteGridType) => {
  return (
    <div className=' bg-success p-10  text-secondary rounded-xl'>
      <h1 className='md:text-5xl text-2xl border border-white p-4'>{note.title}</h1>
      <p className='md:text-2xl text-xl border border-white p-4'>{note.text}</p>
    </div>
  )
}

export default NoteGrid