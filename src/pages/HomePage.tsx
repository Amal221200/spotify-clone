/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "../lib/utils"
import { tabs } from "../constants"
import { useContext, useMemo, useState } from "react"
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider"
import SongsList from "../components/SongsList"
import SearchBox from "../components/SearchBox"

const HomePage = () => {
    const [openTab, setOpenTab] = useState<'top-tracks' | 'for-you' | 'current-playlist'>('for-you')
    const { songs, setPlaylist, playlist } = useContext(PlayerContext) as TPlayerContext;
    const [searchText, setSearchText] = useState('')

    const searchResults = useMemo(() => {
        if (openTab === 'top-tracks') {
            return songs.filter(song => song.top_track && (song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText)))
        } else if (openTab === 'current-playlist') {            
            return playlist.filter(song => song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText))
        }

        return songs.filter(song => song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText))
    }, [searchText, songs, openTab])

    // useEffect(() => {
    //     setPlaylist(searchResults)
    // }, [searchResults])

    return (
        <div>
            <nav className="mb-2 flex gap-x-[2]">
                {
                    tabs.map((tab) => (
                        <p key={tab.label} onClick={() => setOpenTab(tab.key)} className={cn("mr-2 font-semibold cursor-pointer", openTab === tab.key ? "text-white" : "text-white/70")}>
                            {tab.label}
                        </p>
                    ))
                }
            </nav>
            <div>
                <SearchBox value={searchText} handleInput={(val) => setSearchText(val.toLowerCase())} />
                <SongsList songs={searchResults} handleClick={()=> setPlaylist(searchResults)} />
            </div>
        </div>
    )
}

export default HomePage