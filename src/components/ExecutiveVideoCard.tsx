import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';

interface ExecutiveVideoCardProps {
  videoUrl: string;
  posterUrl?: string;
  language: Language;
  className?: string;
}

export const ExecutiveVideoCard: React.FC<ExecutiveVideoCardProps> = ({
  videoUrl,
  posterUrl,
  language,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle initial autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy fallback: keep muted and wait for user interaction
          video.muted = true;
          video.play().catch(() => setIsPlaying(false));
        });
    }
  }, [videoUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#121E2A] to-[#0A1118] border border-teal-500/30 shadow-2xl shadow-teal-950/40 group ${className}`}
    >
      {/* Ambient Top & Bottom Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Subtle Glowing Radial Aura */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        loop
        muted
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 group-hover:scale-[1.02]"
        aria-label={language === 'en' ? 'Executive video of Asif Iqbal' : 'আসিফ ইকবালের নির্বাহী ভিডিও'}
      />

      {/* Floating Status Badge (Top Left) */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] text-teal-300 font-medium flex items-center gap-2 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="font-semibold tracking-wide">
            {language === 'en' ? 'Executive Presence · Live' : 'নির্বাহী উপস্থিতি'}
          </span>
        </div>
      </div>

      {/* Fullscreen Trigger (Top Right) */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Big Play Button (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-teal-500/90 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 z-20 cursor-pointer"
          aria-label="Play video"
        >
          <Play className="w-7 h-7 fill-current translate-x-0.5" />
        </button>
      )}

      {/* Bottom Transport Controls Bar */}
      <div className={`absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/15 transition-opacity duration-200 ${
        isHovered || !isPlaying ? 'opacity-100' : 'opacity-85 sm:opacity-90'
      }`}>
        <div className="min-w-0 pr-2">
          <div className="font-display font-semibold tracking-wide text-white truncate text-xs sm:text-sm">
            {language === 'en' ? 'Asif Iqbal' : 'আসিফ ইকবাল'}
          </div>
          <div className="text-[10px] text-teal-300/90 truncate">
            {language === 'en' ? 'The Polymath Builder' : 'সংস্কৃতি ও রূপান্তরের সেতুবন্ধ'}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Replay */}
          <button
            onClick={restartVideo}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={language === 'en' ? 'Restart Video' : 'পুনরায় শুরু'}
            aria-label="Restart Video"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlay}
            className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="text-[11px]">{language === 'en' ? 'Pause' : 'থামান'}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span className="text-[11px]">{language === 'en' ? 'Play' : 'চালান'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
