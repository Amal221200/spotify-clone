import { LegacyRef, useContext, useRef } from "react"
import { PlayerContext, TPlayerContext } from "../context/PlayerProvider"
import { PlayIcon, SkipBackIcon, SkipForwardIcon, PauseIcon, EllipsisIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

const Player = () => {
  const { currentSong, play, onMuted, muted, onPlay, onPlaying, onFinished, handlePrev, handleNext, onSeek, currentSongIndex, playlist } = useContext(PlayerContext) as TPlayerContext;
  const audioRef = useRef<HTMLAudioElement>()
  const progressBarTimelineRef = useRef<HTMLDivElement>()
  const progressBarThumbRef = useRef<HTMLDivElement>()


  if (!currentSong) {
    return
  }

  return (
    <div className='mx-auto flex h-full max-w-80 items-center justify-center sm:w-full'>
      <audio onPlaying={() => onPlaying(audioRef, progressBarTimelineRef, progressBarThumbRef)} ref={audioRef as LegacyRef<HTMLAudioElement>} src={currentSong.url} autoPlay={play} onEnded={() => { onFinished(progressBarTimelineRef, progressBarThumbRef) }} />
      <div className="flex flex-col gap-y-4 sm:w-[350px] md:w-[350px] xl:w-[400px]">
        <div>
          <h2 className="text-3xl font-semibold text-gray-100">{currentSong.name}</h2>
          <h4 className="text-sm text-gray-100/70">{currentSong.artist}</h4>
        </div>

        <img src={`${import.meta.env.VITE_PUBLIC_ASSETS_API_URL}/${currentSong.cover}`} alt={currentSong.name} className="aspect-square w-full rounded object-cover object-center" />

        <div>

          <div id="progress-bar-container" onClick={(e) => onSeek(e, audioRef, progressBarTimelineRef, progressBarThumbRef)}
             className="group relative mb-4 h-[2px] w-full cursor-pointer rounded-lg bg-gray-50/30">
            <div id="progress-bar-timeline" ref={progressBarTimelineRef as LegacyRef<HTMLDivElement>} className="absolute left-0 top-0 h-[2px] rounded-lg bg-gray-50" style={{ width: '0' }} />
            <div id="progress-bar-thumb" ref={progressBarThumbRef as LegacyRef<HTMLDivElement>} className="absolute -top-[3px] h-2 w-2 translate-y-0 scale-0 transform rounded-full bg-gray-50 transition-all group-hover:scale-100" style={{ left: '0' }} />
          </div>

          <div className="flex w-full items-center justify-between">

            <button type="button" className="transform rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
              <EllipsisIcon />
            </button>

            <div className="flex items-center justify-center gap-x-2">
              <button type="button" disabled={currentSongIndex === 0} onClick={handlePrev} className="transition-opacity hover:opacity-60 disabled:opacity-60">
                <SkipBackIcon />
              </button>
              <button type="button" className="rounded-full bg-white p-2 transition-opacity hover:opacity-80" onClick={() => onPlay(audioRef)}>
                {
                  play ? (
                    <PauseIcon fill="black" />
                  ) : <PlayIcon fill="black" />
                }
              </button>
              <button type="button" onClick={handleNext} disabled={currentSongIndex === playlist.length - 1} className="transition-opacity hover:opacity-60 disabled:opacity-60">
                <SkipForwardIcon />
              </button>
            </div>

            <button type="button" onClick={() => onMuted(audioRef)} className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
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
        </div>
      </div>
    </div>
  )
}

export default Player