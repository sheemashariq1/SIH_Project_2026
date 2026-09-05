import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputButtonProps {
  onResult: (transcript: string) => void;
  lang: 'hi-IN' | 'en-IN';
  title?: string;
}

// Lightweight wrapper around the browser's SpeechRecognition API so a farmer
// who can't read or type can still search by speaking a crop name. Chrome
// and most Android WebViews support this out of the box; on browsers
// without support the button simply doesn't render (graceful fallback).
export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onResult, lang, title }) => {
  const [isListening, setIsListening] = useState(false);
  const [notSupported, setNotSupported] = useState(false);

  const SpeechRecognitionCtor =
    (typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
    null;

  if (!SpeechRecognitionCtor || notSupported) {
    return null;
  }

  const handleClick = () => {
    try {
      const recognition = new SpeechRecognitionCtor();
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) onResult(transcript);
      };

      recognition.start();
    } catch {
      setNotSupported(true);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title || (lang === 'hi-IN' ? 'बोलकर खोजें' : 'Search by voice')}
      className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all flex-shrink-0 ${
        isListening
          ? 'bg-rose-100 border-rose-400 text-rose-600 animate-pulse'
          : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
      }`}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};
