import { MenuIcon, XIcon } from "lucide-react"
import { MusicMenuContext, TMusicMenuContext } from "../context/MusicMenuProvider"
import { useContext } from "react"
const Header = () => {
  const { open, toggleOpen } = useContext(MusicMenuContext) as TMusicMenuContext;

  return (
    <header className="mb-3 flex justify-between md:hidden">
      <img src="/spotify.svg" alt="spotify" width={70} />
      <div className="flex items-center gap-x-2">
        <img src="/profile.png" alt="" width={28} />
        <button type="button" className="inline-block sm:hidden" onClick={toggleOpen}>
          {
            open ? (
              <XIcon />
            ) : (
              <MenuIcon />
            )
          }
        </button>
      </div>
    </header>
  )
}

export default Header