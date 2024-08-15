import ButtonToggle from "./header-utils/ButtonToggle"


const Header = () => {
  return (
    <header className=" flex text-white  bg-secondary fixed top-0 left-0 z-50 w-full justify-center items-center">
        <h1 className="md:text-5xl text-2xl flex-1 text-center ">Notes App</h1>
        <ButtonToggle />
    </header>
  )
}

export default Header