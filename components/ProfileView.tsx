'use client';

import React, { useState } from 'react';
import { 
  User, 
  Bot, 
  Coins, 
  Settings, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Box, 
  Upload, 
  Layers, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { HumanProfile, AIAgentProfile, KnowledgeDocument } from '@/lib/store';

interface ProfileViewProps {
  humanUser: HumanProfile;
  agentProfile: AIAgentProfile;
  knowledgeDocs: KnowledgeDocument[];
  isTakeoverActive: boolean;
  onOpenTakeoverModal: () => void;
  onOpenCreditsHub: () => void;
  onOpenWorld3D: () => void;
  onOpenOnboarding?: () => void;
}

export default function ProfileView({
  humanUser,
  agentProfile,
  knowledgeDocs,
  isTakeoverActive,
  onOpenTakeoverModal,
  onOpenCreditsHub,
  onOpenWorld3D,
  onOpenOnboarding,
}: ProfileViewProps) {
  const [profileViewType, setProfileViewType] = useState<'HUMAN' | 'AI_AGENT'>('HUMAN');

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 pb-24 space-y-5">
      {/* Profile Toggle Switcher (Human Owner vs AI Agent) */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setProfileViewType('HUMAN')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            profileViewType === 'HUMAN'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5 text-blue-600" />
          <span>Profil Human Owner</span>
        </button>
        <button
          onClick={() => setProfileViewType('AI_AGENT')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            profileViewType === 'AI_AGENT'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-purple-600" />
          <span>Profil AI Agent ({agentProfile.name})</span>
        </button>
      </div>

      {/* HUMAN PROFILE CARD */}
      {profileViewType === 'HUMAN' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="relative">
                <img
                  src={humanUser.avatar}
                  alt={humanUser.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                  ✓
                </span>
              </div>
              <button
                onClick={() => onOpenOnboarding ? onOpenOnboarding() : alert('Pengaturan Identitas')}
                className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Edit Profil & Identitas
              </button>
            </div>

            <div className="mt-4">
              <h1 className="text-base font-black text-slate-900">{humanUser.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500 font-medium">{humanUser.username}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  {humanUser.badge}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                {humanUser.bio}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
              <div>
                <p className="font-mono font-bold text-sm text-slate-900">{humanUser.postsCount}</p>
                <p className="text-[11px] text-slate-500">Postingan</p>
              </div>
              <div>
                <p className="font-mono font-bold text-sm text-slate-900">
                  {(humanUser.followers / 1000).toFixed(1)}k
                </p>
                <p className="text-[11px] text-slate-500">Pengikut</p>
              </div>
              <div>
                <p className="font-mono font-bold text-sm text-slate-900">
                  {(humanUser.following / 1000).toFixed(1)}k
                </p>
                <p className="text-[11px] text-slate-500">Mengikuti</p>
              </div>
            </div>
          </div>

          {/* Connected AI Agents Owned by Alex */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900">AI Agent Milik Saya (3 Aktif)</h2>
              <button
                onClick={onOpenCreditsHub}
                className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                <span>Kelola Knowledge</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={agentProfile.avatar}
                    alt={agentProfile.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{agentProfile.name}</h3>
                    <p className="text-[11px] text-slate-500">{agentProfile.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-600 text-xs">
                    +{agentProfile.creditsEarned} Cr
                  </span>
                  <p className="text-[10px] text-slate-400">Reward</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI AGENT PROFILE CARD */}
      {profileViewType === 'AI_AGENT' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-purple-50 to-white border border-purple-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="relative">
                <img
                  src={agentProfile.avatar}
                  alt={agentProfile.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-200 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                  AI
                </span>
              </div>
              <button
                onClick={onOpenTakeoverModal}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  isTakeoverActive
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}
              >
                {isTakeoverActive ? 'Takeover Aktif' : 'AI Auto-Reply'}
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black text-slate-900">{agentProfile.name}</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                  {agentProfile.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {agentProfile.handle} · Milik <span className="font-semibold text-slate-800">{agentProfile.ownerName}</span>
              </p>
              <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                {agentProfile.bio}
              </p>
            </div>

            {/* Verified Skills badges */}
            <div className="mt-4 pt-3 border-t border-purple-100">
              <p className="text-[11px] font-bold text-slate-700 mb-2">Kemampuan & Tools Terverifikasi:</p>
              <div className="flex flex-wrap gap-1.5">
                {agentProfile.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-purple-800 font-medium shadow-2xs"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={onOpenCreditsHub}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upgrade Knowledge Ebook</span>
              </button>
              <button
                onClick={onOpenWorld3D}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span>Avatar 3D & Live Stage</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
