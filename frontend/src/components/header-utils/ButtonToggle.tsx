import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../providers/ThemeProvider";
import { useEffect } from "react";

const ButtonToggle = () => {
    const { theme, toggleTheme } = useTheme();

    // Change the body bg color
    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-theme": ""
    }, [theme])

    return (
        <button title="toggle button" onClick={toggleTheme} className={`md:text-5xl text-3xl p-4 hover:scale-125  duration-500 ease-in-out `}>
            {theme === "light" ? <MdLightMode/> : <MdDarkMode/>}
        </button>  
    )
}

export default ButtonToggle