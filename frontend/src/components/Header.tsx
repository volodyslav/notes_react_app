import ButtonToggle from "./header-utils/ButtonToggle"


const Header = () => {
  return (
    <header className=" flex text-white p-4 bg-secondary fixed z-50 w-full justify-center items-center">
        <h1 className="md:text-5xl text-2xl flex-1 text-center ">Notes App</h1>
        <ButtonToggle />
    </header>
  )
}

export default Header