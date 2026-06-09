// /mnt/d/productboost/noah-commerce/src/react-app/blog/[slug]/page.tsx
"use client";

import { useState } from "react";
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark, 
  Check, 
  ThumbsUp, 
  MessageSquare,
  Rocket,
  Flame,
  PartyPopper,
  ExternalLink
} from "lucide-react";
import { MOCK_ARTICLE } from "./data";

export default function BlogPostPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [likes, setLikes] = useState(2405);
  const [hasLiked, setHasLiked] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-pink-50 text-sky-950 font-sans antialiased selection:bg-pink-200/60 pb-24">
      
      {/* 📄 MAIN LAYOUT VESSEL */}
      <main className="max-w-3xl mx-auto px-4 py-16 relative">
        
        {/* Decorative Floating Glows */}
        <div className="absolute top-20 -left-32 w-72 h-72 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 -right-32 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />

        {/* ARTICLE HEADER CONTEXT */}
        <header className="space-y-6 mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-sky-100 to-pink-100 border border-sky-200/30 text-sky-700 font-black text-xs uppercase tracking-wider rounded-full shadow-sm">
            <Rocket size={12} className="text-pink-500" /> {MOCK_ARTICLE.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            {MOCK_ARTICLE.title}
          </h1>

          <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-sky-400 pl-4 bg-white/40 py-2 rounded-r-xl">
            "{MOCK_ARTICLE.excerpt}"
          </p>

          {/* METADATA METRICS ROW */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-sky-700/80 pt-2 border-b border-sky-100/50 pb-6 w-full">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-sky-400" />
              <span>{MOCK_ARTICLE.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-sky-400" />
              <span>{MOCK_ARTICLE.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-sky-400" />
              <span>{MOCK_ARTICLE.readTime}</span>
            </div>
          </div>
        </header>

        {/* 🖼️ HERO IMAGE SLOT */}
        <div className="w-full h-64 md:h-85 relative rounded-[2rem] overflow-hidden mb-10 border border-sky-100 shadow-xl shadow-sky-100/30 bg-gradient-to-br from-sky-400 via-sky-500 to-pink-500 flex flex-col items-center justify-center text-white p-6 text-center group">
          <img 
            src="/assets/og-image.png" 
            alt="Amazon listing optimization workstation setup illustration"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="relative z-0 flex flex-col items-center gap-3 animate-pulse">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
              <Flame size={32} className="text-pink-200" />
            </div>
            <h3 className="text-2xl font-black tracking-tight uppercase">Hardware Architecture Active ⚡</h3>
          </div>
        </div>

        {/* 📚 DYNAMIC CONTENT GENERATOR ROUTINE */}
        <article className="space-y-6 text-slate-800 text-[16px] md:text-[18px] leading-relaxed font-medium relative z-10">
          {MOCK_ARTICLE.content && MOCK_ARTICLE.content.map((block: any, index: number) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="text-xl md:text-2xl font-black text-slate-900 tracking-tight pt-4 mt-8 mb-2 flex items-center gap-2">
                  <PartyPopper size={20} className="text-pink-500" />
                  {block.text}
                </h2>
              );
            }
            if (block.type === "spec_list" && block.items) {
              return (
                <ul key={index} className="space-y-2 pl-2 border-l-2 border-sky-200">
                  {block.items.map((item: any, i: number) => (
                    <li key={i} className="text-sm font-semibold text-slate-700 bg-white/60 p-3 rounded-xl border border-slate-100">{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "marketplace_cta" && block.url) {
              return (
                <div key={index} className="my-6">
                  <a
                    href={block.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm rounded-2xl transition-all shadow-md shadow-orange-100 hover:shadow-lg group uppercase tracking-wider"
                  >
                    {block.ctaText}
                    <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              );
            }
            return (
              <p key={index} className="whitespace-pre-wrap">
                {block.text}
              </p>
            );
          })}
        </article>

        {/* 🎛️ ACTION FOOTER ELEMENT BUTTONS */}
        <footer className="mt-12 pt-6 border-t border-sky-100/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              type="button"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shadow-sm ${
                hasLiked 
                  ? "bg-gradient-to-r from-sky-600 to-pink-600 border-transparent text-white scale-105 shadow-md shadow-pink-100" 
                  : "bg-white border-sky-200/80 text-sky-800 hover:border-sky-400 hover:bg-sky-50/50"
              }`}
            >
              <ThumbsUp size={14} className={hasLiked ? "animate-bounce" : ""} />
              <span>{likes} Hype Units</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-sky-200/80 text-sky-800 hover:border-sky-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare size={14} className="text-sky-400" />
              <span>Drop Comment</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-sky-200/80 text-sky-800 hover:border-sky-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              {isCopied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} className="text-sky-500" />}
              <span>{isCopied ? "Link Teleported!" : "Share Secret"}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              type="button"
              className={`p-3 rounded-2xl border transition-all shadow-sm ${
                isBookmarked 
                  ? "bg-sky-100 border-sky-300 text-sky-700" 
                  : "bg-white border-sky-200/80 text-sky-400 hover:border-sky-400"
              }`}
              title={isBookmarked ? "Wipe Save" : "Lock Save"}
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>

        </footer>

      </main>
    </div>
  );
}
