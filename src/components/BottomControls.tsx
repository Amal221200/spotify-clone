import { EllipsisIcon, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon, VolumeXIcon } from "lucide-react"
import { LegacyRef, useContext, useRef } from "react";
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider";


const BottomControls = () => {
    const { currentSong, play, onMuted, muted, onPlay, onPlaying } = useContext(PlayerContext) as TPlayerContext;
    const audioRef = useRef<HTMLAudioElement>()
    const progressBarRef = useRef<HTMLDivElement>()
    const progressBarPointerRef = useRef<HTMLDivElement>()

    if (!currentSong) {
        return
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 block bg-slate-950 sm:hidden">
            <div className="mx-auto w-full max-w-96 px-3 py-2">
                <audio onPlaying={() => onPlaying(audioRef, progressBarRef, progressBarPointerRef)} ref={audioRef as LegacyRef<HTMLAudioElement>} src={currentSong.url} autoPlay={play} className="hidden" />
                <div className="mb-2 flex justify-between">
                    <button type="button" className="scale-[0.8] rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                        <EllipsisIcon />
                    </button>
                    <div className="flex items-center justify-center gap-x-2">
                        <button type="button" className="transition-opacity hover:opacity-60">
                            <SkipBackIcon />
                        </button>
                        <button type="button" className="rounded-full bg-white p-2 transition-opacity hover:opacity-80" onClick={() => onPlay(audioRef)}>
                            {
                                play ? (
                                    <PauseIcon fill="black" />
                                ) : <PlayIcon fill="black" />
                            }
                        </button>
                        <button type="button" className="transition-opacity hover:opacity-60">
                            <SkipForwardIcon />
                        </button>
                    </div>
                    <button type="button" onClick={() => onMuted(audioRef)} className="scale-[0.8] rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                        {
                            muted ? (
                                <VolumeXIcon />
                            ) :
                                (
                                    <Volume2Icon />
                                )
                        }
                    </button>
                </div>
                <div className="group relative mb-4 h-[2px] w-full cursor-pointer rounded-lg bg-gray-50/50">
                    <div className="absolute left-0 top-0 h-[2px] rounded-lg bg-gray-50" ref={progressBarRef as LegacyRef<HTMLDivElement>} style={{ width: "0" }} />
                    <div className="absolute -top-[3px] h-2 w-2 translate-y-0 scale-0 transform rounded-full bg-gray-50 transition-all group-hover:scale-100" ref={progressBarPointerRef as LegacyRef<HTMLDivElement>} style={{ left: "0" }} />
                </div>
            </div>
        </div>
    )
}

export default BottomControls