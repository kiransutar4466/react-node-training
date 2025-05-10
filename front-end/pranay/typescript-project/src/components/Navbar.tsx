import {navbarProps} from "../types/navbarTypes"


const Navbar = ({ headerData }:navbarProps) => {
  return (
    <nav
    className="w-full h-16 z-40 flex justify-between items-center  text-zinc-300 shadow-sm font-mono bg-zinc-600 "
    role="navigation"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Republic_TV.svg/1200px-Republic_TV.svg.png"
      className="pl-8 w-[70px]"
    />

    <div className="px-4 flex justify-between space-x-5">
      {headerData?.map((item, key) => (
        <a key={key} href={item.link}>
          {item.label}
        </a>
      ))}
    </div>
  </nav>
  )
}

export default Navbar