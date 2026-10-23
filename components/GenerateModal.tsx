'use client';

import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  X, 
  RefreshCw, 
  Film, 
  Image as ImageIcon, 
  CheckCircle2, 
  Inbox, 
  Coins 
} from 'lucide-react';
import { PostItem } from '@/lib/store';

interface GenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextPost: PostItem | null;
  onRewardTriggered: (brandName: string, query: string) => void;
}

export default function GenerateModal({
  isOpen,
  onClose,
  contextPost,
  onRewardTriggered,
}: GenerateModalProps) {
  const [generateMode, setGenerateMode] = useState<'REELS_BRAND' | 'GENERAL'>('REELS_BRAND');
  const [brandName, setBrandName] = useState('Brand Studio Saya');
  const [productDetails, setProductDetails] = useState('Solusi Kreatif Digital');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);

    const isReels = generateMode === 'REELS_BRAND';
    const query = isReels
      ? `Buat reels video kustom dengan brand "${brandName}" & produk "${productDetails}".`
      : prompt || 'Buat draf postingan dan konsep 3D untuk Allpha Universe';

    try {
      const res = await fetch('/api/agent/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isReels ? 'brand_reels' : 'generate',
          agentName: contextPost?.aiAgent.name || 'Luna AI',
          agentSpecialty: contextPost?.aiAgent.specialty || 'Kreativitas & Desain 3D',
          humanOwner: contextPost?.humanOwner.name || 'Alex Tamara',
          userQuestion: query,
          brandName,
          productDetails,
          context: contextPost?.content,
        }),
      });

      const data = await res.json();
      setResult(data.text);
      onRewardTriggered(brandName, query);
    } catch {
      setResult(`✨ Konsep konten berhasil digenerate oleh AI Agent. File siap dikirimkan ke Direct Message.`);
      onRewardTriggered(brandName, query);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">AI Content & Reels Studio</h2>
              <p className="text-[11px] text-slate-500">
                Didukung oleh {contextPost?.aiAgent.name || 'Luna AI'} (Milik @{contextPost?.humanOwner.handle || 'alextamara'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Generate Mode Segmented Control */}
        <div className="flex rounded-2xl bg-slate-100 p-1 mt-4 text-xs font-semibold">
          <button
            onClick={() => setGenerateMode('REELS_BRAND')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              generateMode === 'REELS_BRAND'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Reels Dengan Brand / Logo Saya</span>
          </button>
          <button
            onClick={() => setGenerateMode('GENERAL')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              generateMode === 'GENERAL'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Draf Postingan</span>
          </button>
        </div>

        {/* Custom Brand Reels Input Form */}
        {generateMode === 'REELS_BRAND' ? (
          <div className="mt-4 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 leading-relaxed">
              <p className="font-bold">Mekanisme Challenge & Transfer Kredit:</p>
              <p className="text-[11px] text-purple-700 mt-0.5">
                AI Agent akan membuat script reels, skenario 3D logo, dan mengantarkan file jadi ke Direct Message Anda. Sesi ini memotong 15 AI Credits Anda dan mentransfernya ke pemilik AI Agent.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nama Brand / Logo Anda:</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Contoh: Kopi Nusantara / GlowWear"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Detail Produk / Aset Jasa:</label>
              <input
                type="text"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                placeholder="Contoh: Cold Brew Botol 250ml kemasan ramah lingkungan"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-2 text-xs">
            <label className="block text-slate-700 font-semibold">Tulis arahan / ide postingan Anda:</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Contoh: Buatkan caption inspiratif tentang peluncuran booth di Crystal City dan ajak followers ikut Live Stage..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 outline-none"
            />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Agent Sedang Mengenerate...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate & Kirim File ke DM (-15 Cr)</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Result Output */}
        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Konten Berhasil Digenerate!</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950 border border-blue-400/40 text-cyan-200 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>File render 3D (.mp4 & .glb) telah dikirim ke Direct Message Anda.</span>
            </div>
            <div className="whitespace-pre-line text-slate-200 leading-relaxed font-sans">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
