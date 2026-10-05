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
  language,
  videoUrl = assetConfig.heroVideoUrl,
  posterUrl = assetConfig.heroVideoPosterUrl,
  fallbackUrl = assetConfig.heroVideoFallbackCdnUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Sync autoplay, pause when out of view, & handle reduced motion preference
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

    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.muted = true;

    // Viewport IntersectionObserver: Pause video when scrolled out of view to save battery, CPU & GPU
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;
            if (entry.isIntersecting) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.then(() => setIsLoaded(true)).catch(() => {});
              }
            } else {
              videoRef.current.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsLoaded(true)).catch(() => {});
      }
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden select-none">
      {/* 1. Underlying Base Poster / Fallback */}
      <div
        className="absolute inset-0 bg-cover transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundPosition: 'center 8%',
          opacity: isLoaded ? 0.2 : 0.85,
        }}
      />

      {/* 2. Google Flow Video Layer (Cinematic Clarity with Fluid Loop) */}
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
            if (videoRef.current) videoRef.current.loop = true;
          }}
          onCanPlay={() => setIsLoaded(true)}
          onPlay={() => setIsLoaded(true)}
          onEnded={handleEnded}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-[center_8%] sm:object-[center_5%] transition-opacity duration-1000 ease-out filter brightness-[0.94] contrast-[1.08] saturate-[1.12] scale-[1.02] pointer-events-none transform-gpu ${
            isLoaded ? 'opacity-90' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* 3. Refined Balanced Scrim System (Protects typography while letting cinematic video flourish) */}
      {/* Left Text Protector Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080E15]/90 via-[#080E15]/55 to-transparent pointer-events-none" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(13,148,136,0.1)_0%,_transparent_60%)] pointer-events-none mix-blend-screen" />

      {/* Top Navbar Blend */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080E15] via-[#080E15]/60 to-transparent pointer-events-none" />

      {/* Bottom Ticker Blend */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080E15] via-[#080E15]/75 to-transparent pointer-events-none" />

      {/* Subtle Polymath Brand Accents (Teal & Amber ambient light bleeding softly) */}
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/3 right-12 w-[340px] h-[340px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
    </div>
  );
};
