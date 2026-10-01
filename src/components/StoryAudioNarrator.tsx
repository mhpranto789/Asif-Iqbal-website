import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Loader2,
  Gauge,
  RotateCcw
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
  playTrigger?: number;
}

export type VoiceModelType = 'adam' | 'puck' | 'system';

export const StoryAudioNarrator: React.FC<StoryAudioNarratorProps> = ({
  language,
  chapters,
  activeChapterIndex: controlledIndex,
  onActiveChapterChange,
  className = '',
  playTrigger,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<VoiceModelType>('adam');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showVoiceSelect, setShowVoiceSelect] = useState(false);

  // Audio references & state
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Record<string, string>>({});
  const activeEngineRef = useRef<'audio' | 'speech' | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const speechHeartbeatRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const previousPlayTriggerRef = useRef<number | undefined>(playTrigger);

  const activeChapter = chapters[currentChapterIdx] || chapters[0];
  const activeParagraphs = language === 'en' ? activeChapter.paragraphsEn : activeChapter.paragraphsBn;

  // Format MM:SS helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Cancel any ongoing fetch/synthesis operations
  const cancelOperations = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speechHeartbeatRef.current) {
      clearInterval(speechHeartbeatRef.current);
      speechHeartbeatRef.current = null;
    }
  }, []);

  // Full Stop Action
  const handleStop = useCallback(() => {
    cancelOperations();
    activeEngineRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoadingAudio(false);
    setCurrentParagraphIdx(0);
    setCurrentTime(0);
    setStatusMessage('');
  }, [cancelOperations]);

  // Clean Web Speech Synthesis Playback
  const playWithWebSpeech = useCallback((chapIdx: number, paraIdx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatusMessage(language === 'en' ? 'Speech not supported in this browser' : 'এই ব্রাউজারে অডিও সাপোর্ট নেই');
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoadingAudio(false);
      return;
    }

    cancelOperations();
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

    activeEngineRef.current = 'speech';
    setIsLoadingAudio(false);
    setIsPlaying(true);
    setIsPaused(false);
    setStatusMessage(
      language === 'en'
        ? `Reading ${chapter.chapterNumber} (Part ${paraIdx + 1}/${paragraphs.length})`
        : `পাঠ চলছে ${chapter.chapterNumberBn} (অংশ ${paraIdx + 1}/${paragraphs.length})`
    );

    const titlePrefix =
      paraIdx === 0
        ? language === 'en'
          ? `${chapter.chapterNumber}: ${chapter.titleEn}. `
          : `${chapter.chapterNumberBn}: ${chapter.titleBn}। `
        : '';

    const utterance = new SpeechSynthesisUtterance(titlePrefix + textToSpeak);
    utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = playbackSpeed * 0.95;
    utterance.pitch = 0.98;

    // Approximate progress timer for SpeechSynthesis
    const estimatedDurationSecs = Math.max(3, Math.ceil(textToSpeak.split(' ').length / (2.5 * playbackSpeed)));
    setDuration(estimatedDurationSecs);
    setCurrentTime(0);

    const startTime = Date.now();
    const speechProgressInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed <= estimatedDurationSecs) {
        setCurrentTime(elapsed);
      }
    }, 250);

    // Chromium speech synthesis heartbeat to prevent 15s freeze bug
    if (speechHeartbeatRef.current) clearInterval(speechHeartbeatRef.current);
    speechHeartbeatRef.current = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);

    utterance.onend = () => {
      clearInterval(speechProgressInterval);
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

    utterance.onerror = (e) => {
      clearInterval(speechProgressInterval);
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return; // Expected on user stop / skip
      }
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoadingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [chapters, language, playbackSpeed, cancelOperations, onActiveChapterChange, handleStop]);

  // AI Voice Model Playback with automatic caching & seamless fallback
  const playWithAiVoiceModel = useCallback(async (chapIdx: number, paraIdx: number) => {
    cancelOperations();

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

    setIsLoadingAudio(true);
    setStatusMessage(
      language === 'en'
        ? `Preparing AI Voice narration...`
        : `স্টুডিও এআই কণ্ঠ প্রস্তুত হচ্ছে...`
    );

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      let audioSrc = audioCacheRef.current[cacheKey];

      if (!audioSrc) {
        // Set a 9s timeout for TTS fetch before seamlessly falling back
        const timeoutId = setTimeout(() => controller.abort(), 9000);

        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: fullText,
            voiceModel: selectedVoiceModel,
            language,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`TTS server response ${response.status}`);
        }

        const data = await response.json();
        if (!data.audioBase64) {
          throw new Error('No audio payload received');
        }

        audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        audioCacheRef.current[cacheKey] = audioSrc;
      }

      // Check if user cancelled while loading
      if (controller.signal.aborted) return;

      const audio = new Audio(audioSrc);
      audioPlayerRef.current = audio;
      activeEngineRef.current = 'audio';
      audio.muted = isMuted;
      audio.playbackRate = playbackSpeed;

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
        console.warn('Audio playback error, falling back to speech synthesis');
        playWithWebSpeech(chapIdx, paraIdx);
      };

      await audio.play();
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoadingAudio(false);
      setStatusMessage(
        language === 'en'
          ? `Playing ${chapter.chapterNumber} (Part ${paraIdx + 1}/${paragraphs.length})`
          : `পাঠ চলছে ${chapter.chapterNumberBn} (অংশ ${paraIdx + 1}/${paragraphs.length})`
      );
    } catch (err: any) {
      if (controller.signal.aborted) {
        // User aborted intentionally
        setIsLoadingAudio(false);
        return;
      }
      console.warn('AI TTS fallback activated:', err);
      // Seamlessly fallback to browser speech synthesis
      playWithWebSpeech(chapIdx, paraIdx);
    }
  }, [chapters, language, selectedVoiceModel, isMuted, playbackSpeed, cancelOperations, onActiveChapterChange, handleStop, playWithWebSpeech]);

  // Master Play Trigger
  const startPlaying = useCallback((chapIdx: number, paraIdx: number) => {
    if (selectedVoiceModel === 'system') {
      playWithWebSpeech(chapIdx, paraIdx);
    } else {
      playWithAiVoiceModel(chapIdx, paraIdx);
    }
  }, [selectedVoiceModel, playWithWebSpeech, playWithAiVoiceModel]);

  // Handle Play/Pause toggle
  const handlePlayToggle = useCallback(() => {
    // If loading audio, clicking allows cancel
    if (isLoadingAudio) {
      handleStop();
      return;
    }

    // If currently paused, resume accurately based on active engine
    if (isPaused) {
      if (activeEngineRef.current === 'audio' && audioPlayerRef.current) {
        audioPlayerRef.current.play().then(() => {
          setIsPlaying(true);
          setIsPaused(false);
          setStatusMessage(
            language === 'en'
              ? `Playing Chapter ${currentChapterIdx + 1}`
              : `পাঠ চলছে অধ্যায় ${currentChapterIdx + 1}`
          );
        }).catch((e) => {
          console.warn('Resume error:', e);
          startPlaying(currentChapterIdx, currentParagraphIdx);
        });
        return;
      }

      if (activeEngineRef.current === 'speech' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
        setStatusMessage(
          language === 'en'
            ? `Playing Chapter ${currentChapterIdx + 1}`
            : `পাঠ চলছে অধ্যায় ${currentChapterIdx + 1}`
        );
        return;
      }

      // Default restart if engine reference was lost
      startPlaying(currentChapterIdx, currentParagraphIdx);
      return;
    }

    // If currently playing, pause smoothly
    if (isPlaying) {
      if (activeEngineRef.current === 'audio' && audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (activeEngineRef.current === 'speech' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPaused(true);
      setIsPlaying(false);
      setStatusMessage(language === 'en' ? 'Narration Paused' : 'পাঠ বিরতিতে রয়েছে');
      return;
    }

    // Start playback
    startPlaying(currentChapterIdx, currentParagraphIdx);
  }, [isLoadingAudio, isPaused, isPlaying, currentChapterIdx, currentParagraphIdx, language, handleStop, startPlaying]);

  // Pause Action
  const handlePause = useCallback(() => {
    if (isLoadingAudio) {
      handleStop();
      return;
    }
    if (activeEngineRef.current === 'audio' && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    if (activeEngineRef.current === 'speech' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
    setStatusMessage(language === 'en' ? 'Narration Paused' : 'পাঠ বিরতিতে রয়েছে');
  }, [isLoadingAudio, handleStop, language]);

  // External trigger handler (e.g. user clicked "Listen to chapter" in chapter list)
  useEffect(() => {
    if (playTrigger && playTrigger !== previousPlayTriggerRef.current) {
      previousPlayTriggerRef.current = playTrigger;
      const targetChap = controlledIndex !== undefined ? controlledIndex : currentChapterIdx;
      setCurrentChapterIdx(targetChap);
      setCurrentParagraphIdx(0);
      startPlaying(targetChap, 0);
    }
  }, [playTrigger, controlledIndex, currentChapterIdx, startPlaying]);

  // Sync controlled index from parent
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex >= 0 && controlledIndex < chapters.length) {
      if (controlledIndex !== currentChapterIdx) {
        setCurrentChapterIdx(controlledIndex);
        setCurrentParagraphIdx(0);
        setCurrentTime(0);
        if (isPlaying) {
          startPlaying(controlledIndex, 0);
        }
      }
    }
  }, [controlledIndex, chapters.length, currentChapterIdx, isPlaying, startPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelOperations();
    };
  }, [cancelOperations]);

  // Skip to next chapter
  const handleNextChapter = () => {
    if (currentChapterIdx + 1 < chapters.length) {
      const nextIdx = currentChapterIdx + 1;
      const shouldContinuePlaying = isPlaying || isLoadingAudio;
      handleStop();
      setCurrentChapterIdx(nextIdx);
      setCurrentParagraphIdx(0);
      onActiveChapterChange?.(nextIdx);
      if (shouldContinuePlaying) {
        startPlaying(nextIdx, 0);
      }
    }
  };

  // Skip to previous chapter
  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      const prevIdx = currentChapterIdx - 1;
      const shouldContinuePlaying = isPlaying || isLoadingAudio;
      handleStop();
      setCurrentChapterIdx(prevIdx);
      setCurrentParagraphIdx(0);
      onActiveChapterChange?.(prevIdx);
      if (shouldContinuePlaying) {
        startPlaying(prevIdx, 0);
      }
    }
  };

  // Jump to specific paragraph/section within current chapter
  const handleSelectParagraph = (paraIdx: number) => {
    if (paraIdx === currentParagraphIdx && (isPlaying || isLoadingAudio)) return;
    const shouldPlay = isPlaying || isPaused || isLoadingAudio || true;
    handleStop();
    setCurrentParagraphIdx(paraIdx);
    if (shouldPlay) {
      startPlaying(currentChapterIdx, paraIdx);
    }
  };

  // Scrubber seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    setCurrentTime(newTime);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = newTime;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = nextMuted;
    }
  };

  // Toggle Playback Speed
  const cyclePlaybackSpeed = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
    setPlaybackSpeed(nextSpeed);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = nextSpeed;
    }
    if (isPlaying && activeEngineRef.current === 'speech') {
      // Re-trigger current paragraph with new speed
      playWithWebSpeech(currentChapterIdx, currentParagraphIdx);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      {/* Precision Editorial Audio Bar with Luxury Border Highlight */}
      <div className={`rounded-2xl bg-white border transition-all duration-300 p-5 sm:p-6 shadow-sm hover:shadow-md ${
        isPlaying
          ? 'border-teal-500/80 ring-2 ring-teal-500/15'
          : isPaused
          ? 'border-amber-400/80 ring-2 ring-amber-400/15'
          : 'border-slate-200'
      }`}>
        {/* Top Bar: Chapter Title & Voice Engine Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="font-semibold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                {language === 'en' ? activeChapter.chapterNumber : activeChapter.chapterNumberBn}
              </span>
              <span>·</span>
              <span className="font-medium text-slate-600">
                {language === 'en'
                  ? `Part ${currentParagraphIdx + 1} of ${activeParagraphs.length}`
                  : `অংশ ${currentParagraphIdx + 1} / ${activeParagraphs.length}`}
              </span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#0D161F] truncate">
              {language === 'en' ? activeChapter.titleEn : activeChapter.titleBn}
            </h3>
          </div>

          {/* Top Right: Voice Selector & Settings */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            {/* Speed Toggle */}
            <button
              onClick={cyclePlaybackSpeed}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Change Speed (1x, 1.25x, 1.5x)"
            >
              <Gauge className="w-3.5 h-3.5 text-teal-600" />
              <span>{playbackSpeed}x</span>
            </button>

            {/* Voice Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceSelect(!showVoiceSelect)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Select Narrator Voice"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-medium">
                  {selectedVoiceModel === 'adam'
                    ? 'Adam · Studio AI'
                    : selectedVoiceModel === 'puck'
                    ? 'Puck · Voice'
                    : 'System Voice'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showVoiceSelect && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-white border border-slate-200 p-1.5 shadow-xl z-50 text-xs space-y-1">
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('adam');
                      setShowVoiceSelect(false);
                      if (isPlaying) {
                        handleStop();
                        setTimeout(() => playWithAiVoiceModel(currentChapterIdx, currentParagraphIdx), 50);
                      }
                    }}
                    className={`w-full px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                      selectedVoiceModel === 'adam'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Adam (Studio AI)</span>
                    <span className="text-[10px] text-teal-600 font-mono">Deep</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('puck');
                      setShowVoiceSelect(false);
                      if (isPlaying) {
                        handleStop();
                        setTimeout(() => playWithAiVoiceModel(currentChapterIdx, currentParagraphIdx), 50);
                      }
                    }}
                    className={`w-full px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                      selectedVoiceModel === 'puck'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Puck (Storyteller)</span>
                    <span className="text-[10px] text-amber-600 font-mono">Warm</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVoiceModel('system');
                      setShowVoiceSelect(false);
                      if (isPlaying) {
                        handleStop();
                        setTimeout(() => playWithWebSpeech(currentChapterIdx, currentParagraphIdx), 50);
                      }
                    }}
                    className={`w-full px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                      selectedVoiceModel === 'system'
                        ? 'bg-teal-50 text-teal-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Browser Voice</span>
                    <span className="text-[10px] text-slate-500 font-mono">Native</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isMuted
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-slate-50'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Section / Paragraph Indicator Tabs */}
        <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {language === 'en' ? 'Sections:' : 'অধ্যায়ের অংশ:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {activeParagraphs.map((_, idx) => {
              const isCurrent = currentParagraphIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectParagraph(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent && isPlaying
                      ? 'bg-teal-600 text-white shadow-xs'
                      : isCurrent && isPaused
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                      : isCurrent
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={`${language === 'en' ? 'Jump to Section' : 'অংশে যান'} ${idx + 1}`}
                >
                  {isCurrent && isPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                  <span>
                    {language === 'en' ? `Part ${idx + 1}` : `অংশ ${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="py-2.5 space-y-1.5">
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="w-full h-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer relative overflow-hidden transition-colors"
          >
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                isPaused ? 'bg-amber-500' : 'bg-teal-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-semibold text-slate-700">{formatTime(currentTime)}</span>
            <span className="text-slate-600 font-sans text-xs flex items-center gap-1.5 truncate max-w-[280px] sm:max-w-none">
              {isLoadingAudio ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-teal-600 shrink-0" />
                  <span className="text-teal-700 font-medium">
                    {language === 'en' ? 'Synthesizing voice...' : 'কণ্ঠ প্রস্তুত হচ্ছে...'}
                  </span>
                </>
              ) : isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                  <span className="text-teal-900 font-medium truncate">
                    {statusMessage || (language === 'en' ? 'Playing narration' : 'পাঠ চলছে')}
                  </span>
                </>
              ) : isPaused ? (
                <span className="text-amber-800 font-semibold">
                  {language === 'en' ? 'Narration Paused' : 'পাঠ বিরতিতে রয়েছে'}
                </span>
              ) : (
                <span className="text-slate-500">
                  {language === 'en' ? 'Ready to listen' : 'শুনতে প্লে চাপুন'}
                </span>
              )}
            </span>
            <span className="font-medium text-slate-500">
              {duration > 0 ? formatTime(duration) : '0:00'}
            </span>
          </div>
        </div>

        {/* Transport Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Chapter Quick Selector Dropdown */}
          <div className="hidden sm:block">
            <select
              value={currentChapterIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                const shouldContinue = isPlaying || isLoadingAudio;
                handleStop();
                setCurrentChapterIdx(idx);
                setCurrentParagraphIdx(0);
                onActiveChapterChange?.(idx);
                if (shouldContinue) {
                  startPlaying(idx, 0);
                }
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-teal-600 cursor-pointer max-w-[220px] truncate shadow-2xs"
            >
              {chapters.map((ch, idx) => (
                <option key={ch.id} value={idx}>
                  {language === 'en' ? ch.chapterNumber : ch.chapterNumberBn}:{' '}
                  {language === 'en' ? ch.titleEn : ch.titleBn}
                </option>
              ))}
            </select>
          </div>

          {/* Central Transport Controls */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {/* Previous Chapter */}
            <button
              onClick={handlePrevChapter}
              disabled={currentChapterIdx === 0}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                currentChapterIdx === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white'
              }`}
              title="Previous Chapter"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play Button (Toggles Play/Pause with tactile feedback) */}
            <button
              onClick={handlePlayToggle}
              className={`h-10 px-5 rounded-xl font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoadingAudio
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : isPlaying
                  ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20'
                  : isPaused
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                  : 'bg-[#0D161F] hover:bg-slate-800 text-white shadow-md'
              }`}
              title={isPlaying ? 'Pause Narration' : isPaused ? 'Resume Narration' : 'Play Narration'}
            >
              {isLoadingAudio ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{language === 'en' ? 'Cancel' : 'বাতিল'}</span>
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{language === 'en' ? 'Pause' : 'থামান'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPaused ? (language === 'en' ? 'Resume' : 'পুনরায় চালান') : (language === 'en' ? 'Play' : 'চালান')}</span>
                </>
              )}
            </button>

            {/* Dedicated Pause Button */}
            <button
              onClick={handlePause}
              disabled={!isPlaying && !isPaused && !isLoadingAudio}
              className={`h-10 px-3.5 rounded-xl font-semibold text-xs inline-flex items-center gap-1.5 border transition-all cursor-pointer ${
                isPaused
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-xs'
                  : isPlaying
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
              }`}
              title="Pause Narration"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{language === 'en' ? 'Pause' : 'বিরতি'}</span>
            </button>

            {/* Dedicated Stop Button */}
            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused && !isLoadingAudio}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isPlaying || isPaused || isLoadingAudio
                  ? 'border-slate-300 text-slate-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 bg-white'
                  : 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
              }`}
              title="Stop Narration"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>

            {/* Next Chapter */}
            <button
              onClick={handleNextChapter}
              disabled={currentChapterIdx === chapters.length - 1}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                currentChapterIdx === chapters.length - 1
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white'
              }`}
              title="Next Chapter"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Right Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-right">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs text-slate-500 font-mono font-medium">
              {selectedVoiceModel === 'system'
                ? 'Web Speech'
                : 'Studio AI 3.8'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
