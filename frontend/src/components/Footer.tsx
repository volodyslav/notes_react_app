import { useTheme } from "../providers/ThemeProvider"

const Footer = () => {
  const {theme} = useTheme();

  return (
    <footer className={`p-6 font-bold duration-500 ease-in-out md:text-3xl text-xl ${theme === "dark" ? "bg-secondary text-success" : "text-secondary bg-success"}`}>
        <p>Copyright {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer