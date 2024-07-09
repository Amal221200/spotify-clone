import { Outlet } from "react-router-dom"
import Information from "../components/Information"
import Player from "../components/Player"
import Header from "../components/Header"
import GlobalStyles from "../components/GlobalStyles"
import { useContext, useMemo } from "react"
import hexToRgba from "hex-to-rgba"
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider"
import MusicMenu from "../components/MusicMenu"

const MainLayout = () => {
    const { currentSong } = useContext(PlayerContext) as TPlayerContext
    const rgbaAccent = useMemo(() => hexToRgba(currentSong?.accent ?? '#000', 0.4), [currentSong])
    return (
        <>
            <GlobalStyles color={rgbaAccent} />
            <div className="h-full p-3">
                <Header />
                <div className="flex h-[90%] gap-x-2 md:h-full">
                    <Information>
                        <Outlet />
                    </Information>
                    <div className="block h-full w-full sm:flex-[1.5_1.5_0] md:flex-1">
                        <Player />
                    </div>
                </div>
                <MusicMenu />
            </div>
        </>
    )
}

export default MainLayout