import { NoteType } from '../../types/note'
import { useTheme } from '../../providers/ThemeProvider'

type NoteGridType = {
  note: NoteType;
}

const NoteGrid = ({note}: NoteGridType) => {

  const { theme } = useTheme()
  return (
    <div className={` p-10 shadow-2xl duration-300 ease-in-out rounded-xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
      <h1 className='md:text-5xl text-2xl p-4'>{note.title}</h1>
      <p className='md:text-2xl text-xl   p-4'>{note.text}</p>
    </div>
  )
}

export default NoteGrid