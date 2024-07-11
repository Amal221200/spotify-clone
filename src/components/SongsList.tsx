import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useContext } from "react"
import { MusicMenuContext, TMusicMenuContext } from "../context/MusicMenuProvider"
import { Song } from "../lib/types"
import SongCard from "./SongCard"

const SongsList = ({ songs, handleClick }: { songs: Song[], handleClick: () => void }) => {
    const { open } = useContext(MusicMenuContext) as TMusicMenuContext

    useGSAP(() => {
        const matchMedia = gsap.matchMedia()
        matchMedia.add('(min-width: 640px)', () => {
            const tl = gsap.timeline()
            tl.fromTo(('.song-card'), {
                scale: 1.5,
                opacity: 0,
                translateY: '-10px',
            }, {
                stagger: 0.1,
                scale: 1,
                opacity: 1,
                translateY: '0',
            })

            if (songs) {
                tl.play()
            }
        })
    }, [songs])

    useGSAP(() => {
        const matchMedia = gsap.matchMedia()
        matchMedia.add('(max-width: 640px)', () => {
            const tl = gsap.timeline()

            tl.fromTo(('.song-card'), {
                stagger: 0.1,
                opacity: 0,
                translateX: '110%',
            }, {
                stagger: 0.1,
                opacity: 1,
                translateX: '0',
            })

            if (!open) {
                tl.reverse()
            } else {
                tl.play()
            }
        })
    }, [songs, open])

    return (
        <div className="scrollbar song-list space-y-1" onClick={handleClick}>
            {
                songs.map((song) => (
                    <div className="song-card overflow-hidden" key={song.id}>
                        <SongCard song={song} />
                    </div>
                ))
            }
        </div>
    )
}

export default SongsList