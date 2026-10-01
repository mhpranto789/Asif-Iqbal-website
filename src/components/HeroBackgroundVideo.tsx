import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { assetConfig } from '../data/assetConfig';

interface HeroBackgroundVideoProps {
  language: Language;
  videoUrl?: string;
  posterUrl?: string;
  fallbackUrl?: string;
  sourceUrl?: string;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  videoUrl = assetConfig.heroVideoUrl,
  posterUrl = assetConfig.heroVideoPosterUrl,
  fallbackUrl = assetConfig.heroVideoFallbackCdnUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Sync autoplay, continuous loop enforcement, & reduced motion preference
  useEffect(() => {
    let prefersReducedMotion = false;
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    } catch (e) {
      // Safe fallback
    }

    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      return;
    }

    if (videoRef.current) {
      // Ensure loop property and muted status are explicitly set on DOM element
      videoRef.current.loop = true;
      videoRef.current.muted = true;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser blocks unprompted autoplay
        });
      }
    }
  }, []);

  const handleEnded = () => {
    // Seamless continuous loop fallback
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    // Seamless loop restart slightly before end to prevent any freeze/hiccup on mobile browsers
    if (videoRef.current && videoRef.current.duration > 0) {
      if (videoRef.current.currentTime >= videoRef.current.duration - 0.15) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Underlying Base Poster / Fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${posterUrl})`,
          opacity: isLoaded ? 0.15 : 0.85,
        }}
      />

      {/* 2. Google Flow Video Layer (Dimmed & Seamlessly Looped) */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
          onLoadedData={() => {
            setIsLoaded(true);
            if (videoRef.current) {
              videoRef.current.loop = true;
            }
          }}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-[1.01] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
          {fallbackUrl && <source src={fallbackUrl} type="video/mp4" />}
        </video>
      )}

      {/* 3. Refined Scrim & Vignette System (Calibrated to 50% transparency) */}
      {/* Base Scrim Wash: Exactly 50% transparency */}
      <div className="absolute inset-0 bg-[#080E15]/50 transition-opacity duration-500" />

      {/* Directional Vignette & Text Protector (50% gentle gradient behind typography) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080E15]/50 via-[#080E15]/25 to-transparent pointer-events-none" />

      {/* Radial Vignette: 50% outer softness */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_transparent_40%,_rgba(8,14,21,0.5)_100%)] pointer-events-none" />

      {/* Top & Bottom Seamless Blends into site header & subsequent sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080E15] via-[#080E15]/75 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A121A] via-[#0A121A]/85 to-transparent pointer-events-none" />

      {/* Subtle Polymath Brand Accents (Teal & Amber ambient light bleeding softly into video) */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-teal-500/8 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/6 rounded-full blur-[110px] pointer-events-none mix-blend-screen" />
    </div>
  );
};
