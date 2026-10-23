'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Music, 
  Bot, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Wand2,
  Box
} from 'lucide-react';

interface ReelsViewProps {
  onOpenBrandCustomizer: () => void;
  onOpenAskAi: (agentName: string, ownerName: string, specialty: string) => void;
}

export default function ReelsView({
  onOpenBrandCustomizer,
  onOpenAskAi,
}: ReelsViewProps) {
  const [likes, setLikes] = useState(24500);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full max-w-sm mx-auto h-[calc(100vh-140px)] min-h-[520px] bg-slate-950 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col justify-between my-2">
      {/* Background Animated Gradient & Cyber Video Sim */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
        {/* Procedural Visual Simulator for 3D Cyber Reels */}
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-32 h-32 rounded-full border-2 border-cyan-400/40 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
            <Box className="w-16 h-16 text-cyan-300 drop-shadow" />
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
            3D SPATIAL REEL • 60 FPS
          </span>
          <p className="text-white font-bold text-sm mt-3">
            Eksplorasi Crystal City Central Avenue di Malam Hari 🌌
          </p>
          <p className="text-slate-300 text-xs mt-1 max-w-xs">
            &ldquo;Al dan manusia bisa membangun dunia spatial yang lebih baik bersama.&rdquo;
          </p>
        </div>
      </div>

      {/* Top Header Overlays */}
      <div className="relative z-20 p-4 flex items-center justify-between text-white text-xs font-semibold">
        <div className="flex items-center gap-3">
          <span className="text-white border-b-2 border-white pb-0.5">Untuk Anda</span>
          <span className="text-white/60">Mengikuti</span>
          <span className="text-white/60">Trending</span>
        </div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Content & Creator Attribution */}
      <div className="relative z-20 p-4 space-y-3">
        {/* Human & AI Creator Lockup */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://picsum.photos/seed/alex-tamara/100/100"
            alt="Alex Tamara"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/60"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-xs">Alex Tamara</span>
              <span className="text-[10px] text-white/70">@alextamara · Human Owner</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-medium">
              <Bot className="w-3 h-3 text-cyan-400" />
              <span>Luna AI · AI Agent milik @alextamara</span>
            </div>
          </div>
        </div>

        {/* Music Sound attribution */}
        <div className="flex items-center gap-2 text-white/80 text-[11px]">
          <Music className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Luna AI & Alex Tamara · Original Audio</span>
        </div>

        {/* Action Button: "Buat dengan Brand Saya" as explicitly instructed by user */}
        <div className="pt-2">
          <button
            onClick={onOpenBrandCustomizer}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            <span>Bagaimana Cara Buat Seperti Ini Dengan Brand Saya?</span>
          </button>
          <p className="text-[10px] text-center text-cyan-200/80 mt-1">
            AI Agent akan mengenerate video & file dikirim ke Direct Message (+15 AI Credits Reward)
          </p>
        </div>
      </div>

      {/* Right Action Icons Column */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white text-xs">
        <button onClick={toggleLike} className="flex flex-col items-center gap-1">
          <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition">
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </div>
          <span className="text-[11px] font-semibold">{(likes / 1000).toFixed(1)}k</span>
        </button>

        <button 
          onClick={() => onOpenAskAi('Luna AI', 'Alex Tamara', 'Kreativitas & Desain 3D')}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition">
            <Bot className="w-6 h-6 text-cyan-300" />
          </div>
          <span className="text-[11px] font-semibold">Tanya AI</span>
        </button>

        <button 
          onClick={() => alert('Komentar reels: 320 balasan')}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] font-semibold">320</span>
        </button>

        <button 
          onClick={() => alert('Reels dibagikan!')}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] font-semibold">1.2k</span>
        </button>
      </div>
    </div>
  );
}
