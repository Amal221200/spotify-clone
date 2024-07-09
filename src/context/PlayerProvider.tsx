import axios from 'axios';
import React, { createContext, MutableRefObject, useCallback, useEffect, useState } from 'react'
import { Song } from '../lib/types';

export interface TPlayerContext {
    songs: Song[],
    currentSong: Song | null,
    play: boolean,
    muted: boolean,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>,
    setPlay: React.Dispatch<React.SetStateAction<boolean>>,
    setMuted: React.Dispatch<React.SetStateAction<boolean>>,
    onPlay: (audioRef: MutableRefObject<HTMLAudioElement | undefined>) => void,
    onMuted: (audioRef: MutableRefObject<HTMLAudioElement | undefined>) => void,
    onPlaying: (audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarRef: MutableRefObject<HTMLDivElement | undefined>, progressBarPointerRef: MutableRefObject<HTMLDivElement | undefined>) => void,
    onFinished: (progressBarRef: MutableRefObject<HTMLDivElement | undefined>, progressBarPointerRef: MutableRefObject<HTMLDivElement | undefined>) => void,
}

export const PlayerContext = createContext<TPlayerContext | undefined>(undefined)

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [play, setPlay] = useState(false)
    const [muted, setMuted] = useState(false)

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
        if (muted) {
            audioRef.current.volume = 1
        } else {
            audioRef.current.volume = 0
        }
        setMuted(current => !current)
    }, [muted, setMuted])

    const onPlaying = useCallback((audioRef: MutableRefObject<HTMLAudioElement | undefined>, progressBarRef: MutableRefObject<HTMLDivElement | undefined>, progressBarPointerRef: MutableRefObject<HTMLDivElement | undefined>) => {
        setInterval(() => {
            if (!audioRef.current || !progressBarRef.current || !progressBarPointerRef.current) {
                return
            }
            const perc = (audioRef.current.currentTime / audioRef.current.duration) * 100
            if (audioRef.current.ended) {
                progressBarRef.current.setAttribute('style', `width: 0;`)
                progressBarPointerRef.current.setAttribute('style', `left: 0;`)
            } else {
                progressBarRef.current.setAttribute('style', `width: ${perc}%;`)
                progressBarPointerRef.current.setAttribute('style', `left: ${perc}%;`)
            }
        }, 500)
    }, [])

    const onFinished = useCallback((progressBarRef: MutableRefObject<HTMLDivElement | undefined>, progressBarPointerRef: MutableRefObject<HTMLDivElement | undefined>) => {
        if (!progressBarRef.current || !progressBarPointerRef.current) {
            return
        }
        progressBarRef.current.setAttribute('style', `width: 0;`)
        progressBarPointerRef.current.setAttribute('style', `left: 0;`)
        setPlay(false)
    }, [])

    useEffect(() => {
        async function fetchSongs() {
            const response = await axios.get<{ data: Song[] }>(import.meta.env.VITE_PUBLIC_SONGS_API_URL);
            const songs = response.data.data;
            setSongs(songs)
            setCurrentSong(response.data.data[0])
        }
        fetchSongs()
    }, [])

    return (
        <PlayerContext.Provider value={{ songs, currentSong, setCurrentSong, play, setPlay, muted, setMuted, onMuted, onPlay, onPlaying, onFinished }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider