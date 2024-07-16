import data from "../data.json"
import { createContext, MutableRefObject, useCallback, useMemo, useState } from 'react'
import { Song } from '../lib/types';

export interface TPlayerContext {
    songs: Song[],
    playlist: Song[],
    currentSong: Song | null,
    play: boolean,
    muted: boolean,
    currentSongIndex: number,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>,
    setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>,
    setPlay: React.Dispatch<React.SetStateAction<boolean>>,
    setMuted: React.Dispatch<React.SetStateAction<boolean>>,
    handleNext: () => void,
    handlePrev: () => void,
    onPlay: (audioRef: MutableRefObject<HTMLAudioElement | undefined>) => void,
    onMuted: (audioRef: MutableRefObject<HTMLAudioElement | undefined>) => void,
    onPlaying: (audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>, callback?: () => void) => void,
    onFinished: (progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>) => void,
    onSeek: (event: React.MouseEvent<HTMLDivElement>, audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>) => void,
}

export const PlayerContext = createContext<TPlayerContext | undefined>(undefined)

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs,] = useState<Song[]>(data.data);
    const [currentSong, setCurrentSong] = useState<Song | null>(data.data[0])
    const [playlist, setPlaylist] = useState<Song[]>([])
    const [play, setPlay] = useState(false)
    const [muted, setMuted] = useState(false)
    const currentSongIndex = useMemo(() => playlist.findIndex(song => song.id === currentSong?.id), [playlist, currentSong])

    const onPlay = useCallback((audioRef: MutableRefObject<HTMLAudioElement | undefined>) => {
        if (play) {
            audioRef.current?.pause()
        } else {
            audioRef.current?.play()
        }
        setPlay(current => !current)
    }, [play, setPlay])

    const onMuted = useCallback((audioRef: MutableRefObject<HTMLAudioElement | undefined>) => {
        if (!audioRef.current) {
            return
        }
        audioRef.current.volume = muted ? 1 : 0;
        setMuted(current => !current)
    }, [muted, setMuted])

    const onPlaying = useCallback((audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>, callback?: () => void) => {
        setInterval(() => {
            if (!audioRef.current || !progressBarTimelineRef.current || !progressBarThumbRef.current) {
                return
            }

            const perc = (audioRef.current.currentTime / audioRef.current.duration) * 100
            if (audioRef.current.ended) {
                progressBarTimelineRef.current.setAttribute('style', `width: 0;`)
                progressBarThumbRef.current.setAttribute('style', `left: 0;`)
            } else {
                progressBarTimelineRef.current.setAttribute('style', `width: ${perc}%;`)
                progressBarThumbRef.current.setAttribute('style', `left: ${perc}%;`)
            }

            if (callback) {
                callback()
            }
        }, 1000)
    }, [])


    const onSeek = useCallback((event: React.MouseEvent<HTMLDivElement>, audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>) => {
        if (!audioRef.current || !progressBarTimelineRef.current || !progressBarThumbRef.current || !progressBarTimelineRef.current.parentElement) {
            return
        }

        audioRef.current.currentTime = (event.nativeEvent.offsetX / progressBarTimelineRef.current.parentElement.offsetWidth) * audioRef.current.duration

    }, [])

    const handleNext = useCallback(() => {
        if (playlist[currentSongIndex + 1]) {
            setCurrentSong(playlist[currentSongIndex + 1])
        }

        if (!play) {
            setPlay(true)
        }
    }, [playlist, setCurrentSong, currentSongIndex, play])

    const handlePrev = useCallback(() => {
        if (playlist[currentSongIndex - 1]) {
            setCurrentSong(playlist[currentSongIndex - 1])
        }

        if (!play) {
            setPlay(true)
        }
    }, [playlist, currentSongIndex, setCurrentSong, play])

    const onFinished = useCallback((progressBarTimelineRef: MutableRefObject<HTMLDivElement | undefined>, progressBarThumbRef: MutableRefObject<HTMLDivElement | undefined>) => {
        if (!progressBarTimelineRef.current || !progressBarThumbRef.current) {
            return
        }
        progressBarTimelineRef.current.setAttribute('style', `width: 0;`)
        progressBarThumbRef.current.setAttribute('style', `left: 0;`)
        if (currentSongIndex === playlist.length - 1) {
            setPlay(false)
        } else {
            handleNext()
        }
    }, [handleNext, currentSongIndex, playlist])

    return (
        <PlayerContext.Provider value={{ songs, currentSong, playlist, setPlaylist, setCurrentSong, play, setPlay, muted, setMuted, onMuted, onPlay, onPlaying, onFinished, onSeek, handleNext, handlePrev, currentSongIndex }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider