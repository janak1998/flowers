import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setShowToast(false);
            })
            .catch((error) => {
              console.log("Auto-play prevented:", error);
              setIsPlaying(false);

              // Fallback: Play on first interaction
              const handleInteraction = () => {
                if (audioRef.current) {
                  audioRef.current.play()
                    .then(() => {
                      setIsPlaying(true);
                      setShowToast(false);
                    })
                    .catch((e) => console.error("Interaction play failed:", e));
                }
                document.removeEventListener("click", handleInteraction);
                document.removeEventListener("keydown", handleInteraction);
              };

              document.addEventListener("click", handleInteraction);
              document.addEventListener("keydown", handleInteraction);
            });
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setShowToast(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 z-20 flex flex-row items-end gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 shadow-lg transition-all hover:bg-white/20">
        <button onClick={() => setVolume(volume === 0 ? 0.25 : 0)} className="hover:text-white">
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:bg-white/20 transition-all shadow-lg group"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
        <span className="text-sm font-medium hidden group-hover:inline-block transition-all duration-300">
          {isPlaying ? "Pause Lofi" : "Play Lofi"}
        </span>
        <Music className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
      </button>

      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        loop
      />

      {/* Toast Notification */}
      {showToast && !isPlaying && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl border border-white/10 animate-fade-in z-50 flex items-center gap-3">
          <Music className="w-4 h-4 animate-bounce" />
          <span className="text-sm font-medium">Click anywhere to start music</span>
        </div>
      )}
    </div>
  );
}
