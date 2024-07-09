import { Song } from "../lib/types"
import SongCard from "./SongCard"

const SongsList = ({ songs }: { songs: Song[] }) => {
    return (
        <div className="scrollbar space-y-1">
            {
                songs.map((song) => (
                    <SongCard song={song} key={song.id} />
                ))
            }
        </div>
    )
}

export default SongsList