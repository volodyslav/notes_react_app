import ButtonToggle from "./header-utils/ButtonToggle"
import { Link } from "react-router-dom"
import { MdNoteAdd } from "react-icons/md";
import { useTheme } from "../providers/ThemeProvider";

const Header = () => {
  const {theme} = useTheme();

  return (
    <header className={`flex  fixed top-0 left-0 z-50 w-full justify-center items-center ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"}`}>
        <h1 className="md:text-5xl text-2xl flex-1 flex items-center justify-center space-x-2 "><Link to="/" title="home page" className="hover:scale-105 duration-500 ease-in-out">Your Notes</Link> <Link to="add-note" className="hover:scale-105 duration-500 ease-in-out md:mt-2" title="addNewNote" ><MdNoteAdd /></Link></h1>
        <ButtonToggle />
    </header>
  )
}

export default Header