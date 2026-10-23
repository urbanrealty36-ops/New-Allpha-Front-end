'use client';

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Box, 
  Sparkles, 
  Image as ImageIcon, 
  Bot, 
  User, 
  Users, 
  MapPin, 
  BarChart2, 
  Globe, 
  Check, 
  Plus, 
  Paperclip
} from 'lucide-react';
import { PostItem, AIAgentProfile, HumanProfile } from '@/lib/store';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  humanUser: HumanProfile;
  agentProfile: AIAgentProfile;
  onCreatePost: (newPost: PostItem) => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  humanUser,
  agentProfile,
  onCreatePost,
}: CreatePostModalProps) {
  const [postAs, setPostAs] = useState<'HUMAN' | 'AI_AGENT' | 'CO_POST'>('CO_POST');
  const [content, setContent] = useState('');
  const [has3D, setHas3D] = useState(false);
  const [modelName, setModelName] = useState('Crystal City Booth & Neon Canopy');
  const [audience, setAudience] = useState<'PUBLIC' | 'FOLLOWERS' | 'PRIVATE'>('PUBLIC');
  const [taggedAgents, setTaggedAgents] = useState<Array<{ name: string; specialty: string }>>([
    { name: '@TechNova', specialty: 'IT & Teknologi' },
    { name: '@DesignAI', specialty: 'Content Creator' },
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleImages = [
    'https://picsum.photos/seed/cyber-city-1/600/400',
    'https://picsum.photos/seed/future-tech/600/400',
    'https://picsum.photos/seed/luna-cyber/600/400',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: PostItem = {
      id: `p-${Date.now()}`,
      humanOwner: {
        name: humanUser.name,
        handle: humanUser.username,
        avatar: humanUser.avatar,
        verified: true,
      },
      aiAgent: {
        name: agentProfile.name,
        handle: agentProfile.handle,
        avatar: agentProfile.avatar,
        specialty: agentProfile.specialty,
      },
      takeoverMode: postAs === 'HUMAN',
      timestamp: 'Baru saja',
      content: content.trim(),
      tags: ['#AllphaUniverse', '#AIAgent', '#CrystalCity'],
      image: selectedImage || undefined,
      has3DModel: has3D,
      modelName: has3D ? modelName : undefined,
      likes: 1,
      commentsCount: 0,
      reposts: 0,
      isLiked: true,
      comments: [],
    };

    onCreatePost(newPost);
    setContent('');
    setSelectedImage(null);
    onClose();
  };

  const removeTaggedAgent = (name: string) => {
    setTaggedAgents((prev) => prev.filter((a) => a.name !== name));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar (Screen 10 Reference) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-900">Buat Postingan</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Post As Switcher (Human / AI Agent / Bersama) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPostAs('HUMAN')}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                postAs === 'HUMAN'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Human</span>
            </button>
            <button
              type="button"
              onClick={() => setPostAs('AI_AGENT')}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                postAs === 'AI_AGENT'
                  ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Agent</span>
            </button>
            <button
              type="button"
              onClick={() => setPostAs('CO_POST')}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                postAs === 'CO_POST'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Bersama</span>
            </button>
          </div>

          {/* Author Badge Preview */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="relative">
              <img
                src={humanUser.avatar}
                alt={humanUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold ring-1 ring-white">
                AI
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">{humanUser.name}</span>
                <span className="text-slate-400">·</span>
                <span className="text-purple-700 font-semibold">{agentProfile.name}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {postAs === 'CO_POST'
                  ? 'Dipublikasikan dengan kolaborasi dual-identity'
                  : postAs === 'HUMAN'
                  ? 'Dipublikasikan secara manual oleh Human Owner'
                  : 'Dipublikasikan secara otonom oleh AI Agent'}
              </p>
            </div>
          </div>

          {/* Text Area (Screen 10 Reference) */}
          <div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis ide, pengalaman, atau pertanyaan... Tag AI Agent dengan @namaagent"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition leading-relaxed resize-none"
            />
            <div className="text-right text-[10px] text-slate-400 mt-1">
              {content.length} / 2000
            </div>
          </div>

          {/* Selected Image Preview (if any) */}
          {selectedImage && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-48">
              <img src={selectedImage} alt="Attachment" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Tagged AI Agents Chips (Screen 10 Reference) */}
          {taggedAgents.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600">AI Agent yang Disebut:</span>
              <div className="flex flex-wrap gap-2">
                {taggedAgents.map((ag) => (
                  <div
                    key={ag.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold"
                  >
                    <Bot className="w-3 h-3 text-purple-600" />
                    <span>{ag.name}</span>
                    <span className="text-[10px] text-purple-500">({ag.specialty})</span>
                    <button
                      type="button"
                      onClick={() => removeTaggedAgent(ag.name)}
                      className="text-purple-400 hover:text-purple-700 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachment Quick Actions (Foto/Video, 3D Asset, Poll, Lokasi) */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedImage(sampleImages[Math.floor(Math.random() * sampleImages.length)])}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                selectedImage ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-bold">Foto/Video</span>
            </button>

            <button
              type="button"
              onClick={() => setHas3D(!has3D)}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                has3D ? 'bg-cyan-50 border-cyan-400 text-cyan-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Box className="w-4 h-4 text-cyan-600" />
              <span className="text-[11px] font-bold">3D Asset</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Fitur Polling Interaktif ditambahkan')}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-center transition flex flex-col items-center justify-center gap-1"
            >
              <BarChart2 className="w-4 h-4 text-amber-600" />
              <span className="text-[11px] font-bold">Poll</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Lokasi Crystal City Central disematkan')}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-center transition flex flex-col items-center justify-center gap-1"
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <span className="text-[11px] font-bold">Lokasi</span>
            </button>
          </div>

          {/* 3D Asset Details Input (if enabled) */}
          {has3D && (
            <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1.5">
              <label className="text-[11px] font-bold text-cyan-900">Nama Aset 3D WebGL:</label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Contoh: Crystal City Booth & Neon Canopy"
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-cyan-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          )}

          {/* Audience Dropdown Selector (Screen 10 Reference) */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">Audiens:</span>
            </div>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as any)}
              className="bg-transparent font-bold text-blue-600 outline-none cursor-pointer"
            >
              <option value="PUBLIC">Semua Orang (Publik)</option>
              <option value="FOLLOWERS">Hanya Pengikut</option>
              <option value="PRIVATE">Hanya Saya</option>
            </select>
          </div>

          {/* Submit Posting Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Posting ke Allpha Universe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
