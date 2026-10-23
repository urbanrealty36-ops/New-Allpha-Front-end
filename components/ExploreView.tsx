'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bot, 
  Sparkles, 
  Box, 
  ShoppingBag, 
  HeartPulse, 
  Cpu, 
  TrendingUp, 
  Palette, 
  ArrowUpRight,
  UserCheck,
  Globe,
  Radio,
  Calendar,
  Layers,
  MapPin,
  Building2,
  Users
} from 'lucide-react';

interface ExploreViewProps {
  onOpenAskAi: (agentName: string, ownerName: string, specialty: string) => void;
  onOpenWorld3D: () => void;
}

export default function ExploreView({ onOpenAskAi, onOpenWorld3D }: ExploreViewProps) {
  const [exploreTab, setExploreTab] = useState<'CONTENT_AGENTS' | 'UNIVERSE_3D'>('CONTENT_AGENTS');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [universeFilter, setUniverseFilter] = useState<'Crystal City' | 'Galaxy' | 'World' | 'District'>('Crystal City');

  const categories = [
    { id: 'Semua', label: 'Semua', icon: Sparkles },
    { id: 'Kesehatan', label: 'Kesehatan', icon: HeartPulse },
    { id: 'IT & Teknologi', label: 'IT & Teknologi', icon: Cpu },
    { id: 'Marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'Kreator', label: 'Kreator & 3D', icon: Palette },
  ];

  const popularAgents = [
    {
      id: 'ag-1',
      name: 'MediAI',
      handle: '@mediai',
      owner: 'Dr. Andi Pratama',
      category: 'Kesehatan',
      specialty: 'Nutrisi Klinis & Pemulihan Kerja Hybrid',
      followers: '12.4k',
      avatar: 'https://picsum.photos/seed/mediai/150/150',
      credits: '15 Cr',
    },
    {
      id: 'ag-2',
      name: 'TechNova',
      handle: '@technova',
      owner: 'Mika Tanaka',
      category: 'IT & Teknologi',
      specialty: 'WebGL, Three.js & Fullstack Architect',
      followers: '28.1k',
      avatar: 'https://picsum.photos/seed/technova/150/150',
      credits: '15 Cr',
    },
    {
      id: 'ag-3',
      name: 'MarketNova',
      handle: '@marketnova',
      owner: 'Sari Dewi',
      category: 'Marketing',
      specialty: 'Strategi Konten & Social Growth 2026',
      followers: '19.8k',
      avatar: 'https://picsum.photos/seed/sari/150/150',
      credits: '15 Cr',
    },
    {
      id: 'ag-4',
      name: 'Luna AI',
      handle: '@luna.ai',
      owner: 'Alex Tamara',
      category: 'Kreator',
      specialty: 'Desain Spatial 3D & Brand Video Generator',
      followers: '85.6k',
      avatar: 'https://picsum.photos/seed/luna-cyber/150/150',
      credits: '15 Cr',
    },
  ];

  const popularContent = [
    { id: 'c1', title: 'Panduan Kesehatan Hybrid 2026', tag: 'Kesehatan', img: 'https://picsum.photos/seed/health-hybrid/250/150', likes: '1.2K' },
    { id: 'c2', title: 'Tutorial Shader Three.js Spatial', tag: 'Teknologi', img: 'https://picsum.photos/seed/three-shader/250/150', likes: '2.8K' },
    { id: 'c3', title: 'Tur Virtual Crystal City Central', tag: 'Travel 3D', img: 'https://picsum.photos/seed/cyber-city-1/250/150', likes: '3.4K' },
  ];

  const filteredAgents =
    selectedCategory === 'Semua'
      ? popularAgents
      : popularAgents.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 pb-24 space-y-5">
      {/* Search Input Bar (Screen 7 & 11 Reference) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari konten, AI Agent, atau topik spatial..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* View Switcher: Screen 7 (Konten & AI Agent) vs Screen 11 (Explore 3D Universe & Event) */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setExploreTab('CONTENT_AGENTS')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            exploreTab === 'CONTENT_AGENTS'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span>Konten & AI Agent</span>
        </button>
        <button
          onClick={() => setExploreTab('UNIVERSE_3D')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            exploreTab === 'UNIVERSE_3D'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Box className="w-3.5 h-3.5 text-cyan-600" />
          <span>3D Universe & Event</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: KONTEN & AI AGENT (SCREEN 7 PITCH DECK)           */}
      {/* ======================================================== */}
      {exploreTab === 'CONTENT_AGENTS' && (
        <div className="space-y-5 animate-fade-in">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Agent Populer Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">AI Agent Populer</h2>
              <button 
                onClick={() => setSelectedCategory('Semua')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAgents.map((ag) => (
                <div
                  key={ag.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={ag.avatar}
                      alt={ag.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-xs truncate">{ag.name}</h3>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-bold">
                          {ag.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{ag.handle} · Milik @{ag.owner.toLowerCase().replace(/\s+/g, '')}</p>
                      <p className="text-[11px] text-slate-700 font-medium mt-1 line-clamp-2">
                        {ag.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px] font-mono">{ag.followers} Pengikut</span>
                    <button
                      onClick={() => onOpenAskAi(ag.name, ag.owner, ag.specialty)}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
                    >
                      Tanya AI ({ag.credits})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Konten Populer Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Konten Populer</h2>
              <span className="text-xs text-slate-400">Trending di Allpha</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {popularContent.map((c) => (
                <div key={c.id} className="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-100 shadow-xs">
                  <img src={c.img} alt={c.title} className="w-full h-28 object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-600/80 font-bold self-start">
                      {c.tag}
                    </span>
                    <p className="text-[10px] font-bold truncate mt-1">{c.title}</p>
                    <span className="text-[9px] text-slate-300">♡ {c.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: EXPLORE 3D UNIVERSE & EVENT (SCREEN 11 PITCH DECK) */}
      {/* ======================================================== */}
      {exploreTab === 'UNIVERSE_3D' && (
        <div className="space-y-5 animate-fade-in">
          {/* Spatial Filter Pills (Screen 11 Reference) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(['Crystal City', 'Galaxy', 'World', 'District'] as const).map((uf) => (
              <button
                key={uf}
                onClick={() => setUniverseFilter(uf)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  universeFilter === uf
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {uf}
              </button>
            ))}
          </div>

          {/* Main Crystal City 3D Banner (Screen 11 Reference) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-950 text-white p-5 shadow-xl border border-cyan-500/30">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/30">
                  Pusat Ekosistem Allpha Universe
                </span>
                <h3 className="text-xl font-black mt-2 text-white">Crystal City 3D</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-sm">
                  Dunia spatial Three.js WebGL realistis tempat berkumpulnya avatar Human & AI, panggung live stage, dan booth 3D.
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    24,340 Online
                  </span>
                  <span>•</span>
                  <span>14 District Spatial</span>
                </div>
              </div>

              <button
                onClick={onOpenWorld3D}
                className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Masuk ke 3D</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* District Spatial Grid (Screen 11 Reference) */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-black text-slate-900">District Spatial Unggulan</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Business District', desc: 'Perkantoran virtual & Booth AI Enterprise', color: 'from-blue-900 to-slate-900' },
                { name: 'Education District', desc: 'Kelas interaktif AI & riset dokumen', color: 'from-indigo-900 to-slate-900' },
                { name: 'Creator Hub', desc: 'Studio kreator 3D & showcase reels video', color: 'from-purple-900 to-slate-900' },
                { name: 'Event Space', desc: 'Panggung live podcast & konser virtual', color: 'from-rose-900 to-slate-900' },
              ].map((d) => (
                <div
                  key={d.name}
                  onClick={onOpenWorld3D}
                  className={`p-3.5 rounded-2xl bg-gradient-to-tr ${d.color} text-white cursor-pointer hover:scale-[1.02] transition border border-slate-700/50 shadow-md flex flex-col justify-between`}
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-cyan-200">{d.name}</h4>
                    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{d.desc}</p>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold mt-2 inline-block">
                    Kunjungi District →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Terdekat Section (Screen 11 Reference) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">Event Terdekat di Stage</h3>
              <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">Lihat Semua</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div 
                onClick={onOpenWorld3D}
                className="p-3 rounded-2xl bg-slate-900 text-white cursor-pointer border border-rose-500/40 shadow-sm space-y-1.5"
              >
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold uppercase animate-pulse">
                  Sekarang Live
                </span>
                <h4 className="font-bold text-[11px] leading-tight">AI Talk Show</h4>
                <p className="text-[10px] text-slate-400">Live Stage Crystal City</p>
              </div>

              <div 
                onClick={onOpenWorld3D}
                className="p-3 rounded-2xl bg-slate-900 text-white cursor-pointer border border-slate-800 shadow-sm space-y-1.5"
              >
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-bold uppercase">
                  Mulai 20.00
                </span>
                <h4 className="font-bold text-[11px] leading-tight">Music Concert</h4>
                <p className="text-[10px] text-slate-400">Atrium Neo-Kyoto</p>
              </div>

              <div 
                onClick={onOpenWorld3D}
                className="p-3 rounded-2xl bg-slate-900 text-white cursor-pointer border border-slate-800 shadow-sm space-y-1.5"
              >
                <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-bold uppercase">
                  Besok 10.00
                </span>
                <h4 className="font-bold text-[11px] leading-tight">Product Launch</h4>
                <p className="text-[10px] text-slate-400">Auditorium Metaverse</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
