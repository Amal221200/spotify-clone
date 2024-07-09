import { useCallback, useContext } from "react"
import { Song } from "../lib/types"
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider"
import { cn } from "../lib/utils"
import { MusicMenuContext, TMusicMenuContext } from "../context/MusicMenuProvider"

const SongCard = ({ song }: { song: Song }) => {
    const { currentSong, setCurrentSong, play, setPlay } = useContext(PlayerContext) as TPlayerContext
    const { onClose } = useContext(MusicMenuContext) as TMusicMenuContext
    const onClick = useCallback(() => {
        if (song.id === currentSong?.id) {
            setCurrentSong(null)
            queueMicrotask(() => {
                setCurrentSong(song)
                setPlay(true)
                onClose()
            })
            return
        }
        setCurrentSong(song)
        setPlay(true)
        onClose()
    }, [setCurrentSong, song, currentSong, setPlay, onClose])

    return (
        <div onClick={onClick} className={cn("flex cursor-pointer items-center rounded-lg p-2 text-white/60 hover:bg-white/10", currentSong?.id === song.id ? "bg-white/10" : 'bg-transparent')}>
            <div>
                <img src={`${import.meta.env.VITE_PUBLIC_ASSETS_API_URL}/${song.cover}`} alt={song.name} className={cn("h-9 w-9 rounded-full object-cover object-center duration-1000", (currentSong?.id === song.id && play) ? 'animate-spin' : '')} />
            </div>
            <div className="flex-1 px-3">
                <p className="text-white/90">
                    {song.name}
                </p>
                <small className="mt-1">
                    {song.artist}
                </small>
            </div>
            <div>
                <p>
                    4:12
                </p>
            </div>
        </div>
    )
}

export default SongCard