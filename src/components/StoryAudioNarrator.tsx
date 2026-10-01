import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  Loader2
} from 'lucide-react';

export interface StoryNarrationChapter {
  id: string;
  chapterNumber: string;
  chapterNumberBn: string;
  titleEn: string;
  titleBn: string;
  paragraphsEn: string[];
  paragraphsBn: string[];
}

interface StoryAudioNarratorProps {
  language: Language;
  chapters: StoryNarrationChapter[];
  activeChapterIndex?: number;
  onActiveChapterChange?: (index: number) => void;
  className?: string;
}

export type VoiceModelType = 'adam' | 'puck' | 'system';

export const StoryAudioNarrator: React.FC<StoryAudioNarratorProps> = ({
  language,
  chapters,
  activeChapterIndex: controlledIndex,
  onActiveChapterChange,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<VoiceModelType>('adam');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showVoiceSelect, setShowVoiceSelect] = useState(false);

  // Audio elements & synthesis refs
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Record<string, string>>({});
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Sync controlled chapter index
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex >= 0 && controlledIndex < chapters.length) {
      if (controlledIndex !== currentChapterIdx && !isPlaying) {
        setCurrentChapterIdx(controlledIndex);
        setCurrentParagraphIdx(0);
        setCurrentTime(0);
      }
    }
  }, [controlledIndex, chapters.length, currentChapterIdx, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const activeChapter = chapters[currentChapterIdx] || chapters[0];
  const activeParagraphs = language === 'en' ? activeChapter.paragraphsEn : activeChapter.paragraphsBn;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Web Speech Fallback
  const playWithWebSpeech = (chapIdx: number, paraIdx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const chapter = chapters[chapIdx];
    if (!chapter) return;

    const paragraphs = language === 'en' ? chapter.paragraphsEn : chapter.paragraphsBn;
    const textToSpeak = paragraphs[paraIdx];

    if (!textToSpeak) {
      if (chapIdx + 1 < chapters.length) {
        const nextChap = chapIdx + 1;
        setCurrentChapterIdx(nextChap);
        setCurrentParagraphIdx(0);
        onActiveChapterChange?.(nextChap);
        playWithWebSpeech(nextChap, 0);
      } else {
        handleStop();
      }
      return;
    }

    const titlePrefix =
      paraIdx === 0
        ? language === 'en'
          ? `${chapter.chapterNumber}: ${chapter.titleEn}. `
          : `${chapter.chapterNumberBn}: ${chapter.titleBn}। `
        : '';

    const utterance = new SpeechSynthesisUtterance(titlePrefix + textToSpeak);
    utteranceRef.current = utterance;
    utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

    utterance.onend = () => {
      const nextPara = paraIdx + 1;
      if (nextPara < paragraphs.length) {
        setCurrentParagraphIdx(nextPara);
        playWithWebSpeech(chapIdx, nextPara);
      } else if (chapIdx + 1 < chapters.length) {
        const nextChap = chapIdx + 1;
        setCurrentChapterIdx(nextChap);
        setCurrentParagraphIdx(0);
        onActiveChapterChange?.(nextChap);
        playWithWebSpeech(nextChap, 0);
      } else {
        handleStop();
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setIsLoadingAudio(false);
  };

  // AI Voice Model Playback
  const playWithAiVoiceModel = async (chapIdx: number, paraIdx: number) => {
    setIsLoadingAudio(true);

    const chapter = chapters[chapIdx];
    if (!chapter) {
      setIsLoadingAudio(false);
      return;
    }

    const paragraphs = language === 'en' ? chapter.paragraphsEn : chapter.paragraphsBn;
    const textToSpeak = paragraphs[paraIdx];

    if (!textToSpeak) {
      if (chapIdx + 1 < chapters.length) {
        const nextChap = chapIdx + 1;
        setCurrentChapterIdx(nextChap);
        setCurrentParagraphIdx(0);
        onActiveChapterChange?.(nextChap);
        playWithAiVoiceModel(nextChap, 0);
      } else {
        handleStop();
      }
      return;
    }

    const titlePrefix =
      paraIdx === 0
        ? language === 'en'
          ? `${chapter.chapterNumber}: ${chapter.titleEn}. `
          : `${chapter.chapterNumberBn}: ${chapter.titleBn}। `
        : '';
    const fullText = titlePrefix + textToSpeak;
    const cacheKey = `${selectedVoiceModel}-${language}-${chapIdx}-${paraIdx}`;

    try {
      let audioSrc = audioCacheRef.current[cacheKey];

      if (!audioSrc) {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: fullText,
            voiceModel: selectedVoiceModel,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error(`TTS server error ${response.status}`);
        }

        const data = await response.json();
        if (!data.audioBase64) {
          throw new Error('No audio returned');
        }

        audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        audioCacheRef.current[cacheKey] = audioSrc;
      }

      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }

      const audio = new Audio(audioSrc);
      audioPlayerRef.current = audio;
      audio.muted = isMuted;

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      audio.onended = () => {
        const nextPara = paraIdx + 1;
        if (nextPara < paragraphs.length) {
          setCurrentParagraphIdx(nextPara);
          playWithAiVoiceModel(chapIdx, nextPara);
        } else if (chapIdx + 1 < chapters.length) {
          const nextChap = chapIdx + 1;
          setCurrentChapterIdx(nextChap);
          setCurrentParagraphIdx(0);
          onActiveChapterChange?.(nextChap);
          playWithAiVoiceModel(nextChap, 0);
        } else {
          handleStop();
        }
      };

      audio.onerror = () => {
        playWithWebSpeech(chapIdx, paraIdx);
      };

      await audio.play();
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoadingAudio(false);
    } catch (err: any) {
      console.warn('AI Voice synthesis fallback to browser voice:', err);
      playWithWebSpeech(chapIdx, paraIdx);
    }
  };

  const handlePlay = () => {
    if (isPaused && audioPlayerRef.current && selectedVoiceModel !== 'system') {
      audioPlayerRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (isPaused && typeof window !== 'undefined' && 'speechSynthesis' in window && selectedVoiceModel === 'system') {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (selectedVoiceModel === 'system') {
      playWithWebSpeech(currentChapterIdx, currentParagraphIdx);
    } else {
      playWithAiVoiceModel(currentChapterIdx, currentParagraphIdx);
    }
  };

  const handlePause = () => {
    if (audioPlayerRef.current && selectedVoiceModel !== 'system') {
      audioPlayerRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoadingAudio(false);
    setCurrentParagraphIdx(0);
    setCurrentTime(0);
  };

  const handleNextChapter = () => {
    if (currentChapterIdx + 1 < chapters.length) {
      handleStop();
      const nextIdx = currentChapterIdx + 1;
      setCurrentChapterIdx(nextIdx);
      setCurrentParagraphIdx(0);
      onActiveChapterChange?.(nextIdx);
      if (selectedVoiceModel === 'system') {
        playWithWebSpeech(nextIdx, 0);
      } else {
        playWithAiVoiceModel(nextIdx, 0);
      }
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      handleStop();
      const prevIdx = currentChapterIdx - 1;
      setCurrentChapterIdx(prevIdx);
      setCurrentParagraphIdx(0);
      onActiveChapterChange?.(prevIdx);
      if (selectedVoiceModel === 'system') {
        playWithWebSpeech(prevIdx, 0);
      } else {
        playWithAiVoiceModel(prevIdx, 0);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    setCurrentTime(newTime);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = nextMuted;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      {/* Precision Editorial Audio Bar (Clean, uncluttered, professional) */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-4 sm:p-5">
        {/* Top: Chapter Header & Voice Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="font-semibold text-teal-700 uppercase tracking-wider">
                {language === 'en' ? activeChapter.chapterNumber : activeChapter.chapterNumberBn}
              </span>
              <span>·</span>
              <span>
                {language === 'en'
                  ? `Section ${currentParagraphIdx + 1} of ${activeParagraphs.length}`
                  : `অংশ ${currentParagraphIdx + 1} / ${activeParagraphs.length}`}
              </span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#0D161F] truncate">
              {language === 'en' ? activeChapter.titleEn : activeChapter.titleBn}
            </h3>
          </div>

          {/* Clean Voice & Chapter Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {/* Minimal Voice Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceSelect(!showVoiceSelect)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Select Narrator Voice"
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>
                  {selectedVoiceModel === 'adam'
                    ? 'Adam · Studio AI'
                    : selectedVoiceModel === 'puck'
                    ? 'Puck · Voice'
                    : 'System Voice'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showVoiceSelect && (
                <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-white border border-slate-200 p-1 shadow-lg z-50 text-xs space-y-0.5">
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('adam');
                      setShowVoiceSelect(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                      selectedVoiceModel === 'adam'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Adam (Studio AI)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('puck');
                      setShowVoiceSelect(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                      selectedVoiceModel === 'puck'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Puck (Storyteller)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('system');
                      setShowVoiceSelect(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                      selectedVoiceModel === 'system'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Browser Voice
                  </button>
                </div>
              )}
            </div>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Middle: Minimal Scrubber Timeline */}
        <div className="py-3 space-y-1.5">
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="w-full h-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer relative overflow-hidden transition-colors"
          >
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span className="text-slate-400 font-sans text-xs">
              {isLoadingAudio
                ? (language === 'en' ? 'Preparing Voice...' : 'কণ্ঠ প্রস্তুত হচ্ছে...')
                : isPlaying
                ? (language === 'en' ? 'Playing Chapter Narration' : 'অধ্যায় পাঠ চলছে')
                : isPaused
                ? (language === 'en' ? 'Narration Paused' : 'পাঠ বিরতিতে রয়েছে')
                : (language === 'en' ? 'Ready to play' : 'শুনতে প্রস্তুত')}
            </span>
            <span>{duration > 0 ? formatTime(duration) : '0:00'}</span>
          </div>
        </div>

        {/* Bottom: Balanced, Clean Side-by-Side Transport Controls */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Chapter Quick Selector */}
          <div className="hidden sm:block">
            <select
              value={currentChapterIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                handleStop();
                setCurrentChapterIdx(idx);
                setCurrentParagraphIdx(0);
                onActiveChapterChange?.(idx);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-teal-600 cursor-pointer max-w-[200px] truncate"
            >
              {chapters.map((ch, idx) => (
                <option key={ch.id} value={idx}>
                  {language === 'en' ? ch.chapterNumber : ch.chapterNumberBn}:{' '}
                  {language === 'en' ? ch.titleEn : ch.titleBn}
                </option>
              ))}
            </select>
          </div>

          {/* Central Side-by-Side Transport Buttons */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {/* Previous */}
            <button
              onClick={handlePrevChapter}
              disabled={currentChapterIdx === 0}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                currentChapterIdx === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Previous Chapter"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* PLAY BUTTON (Beside Pause) */}
            <button
              onClick={handlePlay}
              disabled={isLoadingAudio}
              className={`h-9 px-4 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-[#0D161F] hover:bg-slate-800 text-white shadow-xs'
              }`}
              title="Play Narration"
            >
              {isLoadingAudio ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current text-white" />
              )}
              <span>{language === 'en' ? 'Play' : 'চালান'}</span>
            </button>

            {/* PAUSE BUTTON (Directly Beside Play) */}
            <button
              onClick={handlePause}
              disabled={!isPlaying && !isPaused}
              className={`h-9 px-4 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 border transition-all cursor-pointer ${
                isPaused
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                  : isPlaying
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
              title="Pause Narration"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'en' ? 'Pause' : 'থামান'}</span>
            </button>

            {/* STOP BUTTON */}
            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isPlaying || isPaused
                  ? 'border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50'
                  : 'border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
              title="Stop Narration"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            {/* Next */}
            <button
              onClick={handleNextChapter}
              disabled={currentChapterIdx === chapters.length - 1}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                currentChapterIdx === chapters.length - 1
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Next Chapter"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Status Label on Right (Desktop) */}
          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-500 font-medium">
              {language === 'en' ? 'Voice · Studio AI' : 'কণ্ঠ · স্টুডিও এআই'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
