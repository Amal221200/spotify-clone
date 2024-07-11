/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "../lib/utils";
import { useContext, useEffect, useMemo, useState } from "react";
import { tabs } from "../constants";
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider";
import SearchBox from "./SearchBox";
import SongsList from "./SongsList";
import { MenuIcon, XIcon } from "lucide-react";
import { MusicMenuContext, TMusicMenuContext } from "../context/MusicMenuProvider";
import hexToRgba from "hex-to-rgba";

const MusicMenu = () => {
    const { currentSong, setPlaylist, playlist } = useContext(PlayerContext) as TPlayerContext
    const { open, toggleOpen } = useContext(MusicMenuContext) as TMusicMenuContext
    const [openTab, setOpenTab] = useState<'top-tracks' | 'for-you' | 'current-playlist'>('for-you')
    const { songs } = useContext(PlayerContext) as TPlayerContext;
    const [searchText, setSearchText] = useState('')

    const searchResults = useMemo(() => {
        if (openTab === 'top-tracks') {
            return songs.filter(song => song.top_track && (song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText)))
        } else if (openTab === 'current-playlist') {
            return playlist.filter(song => song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText))
        }

        return songs.filter(song => song.name.toLowerCase().startsWith(searchText) || song.artist.toLowerCase().startsWith(searchText))
    }, [searchText, songs, openTab])


    const rgbaAccent = useMemo(() => hexToRgba(currentSong?.accent ?? '#000',), [currentSong])

    useEffect(()=> {
        setPlaylist(songs)
    }, [songs])
    return (
        <div className={cn("absolute bottom-0 block sm:hidden top-0 z-20 h-full w-full bg-inherit p-3 transition-all duration-700", open ? 'left-0' : 'left-full')} style={{ background: `linear-gradient(135deg, ${rgbaAccent}, rgb(0, 0, 0) 100%), rgba(0 0 0 /0.4)`, backgroundBlendMode: 'overlay' }}>
            <div className="flex justify-end">
                <button type="button" onClick={toggleOpen}>
                    {
                        open ? (
                            <XIcon />
                        ) : (
                            <MenuIcon />
                        )
                    }
                </button>
            </div>

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
                <SongsList handleClick={() => setPlaylist(searchResults)} songs={searchResults} />
            </div>
        </div>
    )
}

export default MusicMenu