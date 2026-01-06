import React, { useEffect, useRef } from 'react';
import { RiVolume2Line, RiVolumeMuteLine } from "@remixicon/react";

export default function WeatherSoundscape({ weather, isEnabled, onToggle }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isEnabled && weather) {
      const condition = weather.main?.description?.toLowerCase() || '';
      
      // Create different audio contexts based on weather
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Simple browser-based sound generation
      const play = () => {
        if (condition.includes('rain')) {
          playRainSound(audioContext);
        } else if (condition.includes('wind') || condition.includes('storm')) {
          playWindSound(audioContext);
        } else if (condition.includes('clear') || condition.includes('sunny')) {
          playBirdSound(audioContext);
        }
      };

      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // Fallback: just use play function
          play();
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isEnabled, weather]);

  const playRainSound = (ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.value = Math.random() * 100 + 50;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.5);
  };

  const playWindSound = (ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 1);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.02, now + 1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 1);
  };

  const playBirdSound = (ctx) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(2000 + Math.random() * 1000, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎵</span>
          <div>
            <p className="text-white font-medium">Weather Soundscape</p>
            <p className="text-gray-400 text-sm">
              {weather?.main?.description ? `${weather.main.description} ambience` : 'Ambient sounds'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`p-3 rounded-full transition-all duration-300 ${
            isEnabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          {isEnabled ? <RiVolume2Line size={20} /> : <RiVolumeMuteLine size={20} />}
        </button>
      </div>

      <audio ref={audioRef} loop />

      <p className="text-gray-400 text-xs text-center">
        {isEnabled ? '🔊 Soundscape active' : '🔇 Soundscape muted'}
      </p>
    </div>
  );
}
