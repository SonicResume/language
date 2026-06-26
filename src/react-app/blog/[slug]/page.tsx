// /mnt/d/productboost/noah-language/src/react-app/blog/[slug]/page.tsx
"use strict";

import { useState } from "react";
import { Sparkles, Terminal, Globe, ArrowRight, Play, Cpu, ShoppingBag } from "lucide-react";
import { MOCK_ARTICLE, ArticleData, ContentBlock } from "./data";

export default function BlogSlugPage() {
  // Pulls your updated Language & Braille structural content loop
  const post: ArticleData = MOCK_ARTICLE;
  
  // Interactive visualization tab state 
  const [pipelineMode, setPipelineMode] = useState<"async" | "sync">("async");

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-purple-100 selection:text-purple-900 antialiased font-sans">
      
      {/* 🚀 HIGH-ENERGY WHITE ARTICLE HEADER */}
      <header className="relative max-w-3xl mx-auto px-6 pt-16 pb-8 border-b border-slate-100">
        {/* Soft Energetic Glow Accents (Light Green, Purple, Blue) */}
        <div className="absolute top-12 left-1/4 -translate-x-1/2 w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> {post.category}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* Author, Date, and Read Time Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400 pt-1">
            <span>By <strong className="text-slate-600">{post.author}</strong></span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="text-purple-600 font-semibold">{post.readTime}</span>
          </div>
          
          <p className="text-base text-slate-500 leading-relaxed italic border-l-4 border-purple-500/40 pl-4 py-1">
            "{post.excerpt}"
          </p>

          {/* Local Feature Visual Asset File */}
          <div className="pt-6">
            <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-md">
              <img 
                src="/blog.png" 
                alt="Architecture design parsing cloud neural text strings versus client synchronous mapping cell grids" 
                className="rounded-xl w-full object-cover aspect-[2/1]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 📖 ARTICLE BODY CONTENT ACCELERATOR */}
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-8 bg-white">
        
        {post.content.map((block: ContentBlock, idx: number) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={idx} className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  {block.text}
                </p>
              );

            case "heading":
              return (
                <h2 key={idx} className="text-xl md:text-2xl font-black text-slate-900 tracking-tight pt-4 flex items-center gap-2">
                  {block.text}
                </h2>
              );

            case "spec_list":
              return (
                <ul key={idx} className="space-y-4 pl-1 py-2">
                  {block.items?.map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed border border-slate-100 p-4 rounded-xl shadow-sm hover:border-emerald-200 transition">
                      <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );

            case "marketplace_cta":
              return (
                <div key={idx} className="py-2">
                  <a 
                    href={block.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 transition duration-300 shadow-sm"
                  >
                    <span className="text-xs md:text-sm font-bold text-purple-700 group-hover:text-purple-900 transition">
                      {block.ctaText}
                    </span>
                    <ShoppingBag className="w-4 h-4 text-purple-500 group-hover:scale-110 group-hover:text-purple-600 transition shrink-0 ml-2" />
                  </a>
                </div>
              );

            default:
              return null;
          }
        })}

        {/* 🛠️ INLINE PIPELINE SIMULATOR ENGINE */}
        <section className="mt-12 pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-500" /> Live Pipeline Trace: Cloud Promises vs Local Maps
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the simulator tabs below to trace the execution cost difference between remote network translation requests and local deterministic transformations:
          </p>

          <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-md">
            {/* Mode Select Header tabs using light green and purple colors */}
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
              <button 
                onClick={() => setPipelineMode("async")}
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${pipelineMode === "async" ? "bg-purple-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
              >
                <Globe className="w-3.5 h-3.5" /> Remote AI Translation
              </button>
              <button 
                onClick={() => setPipelineMode("sync")}
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${pipelineMode === "sync" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
              >
                <Terminal className="w-3.5 h-3.5" /> Local Braille Machine
              </button>
            </div>

            {/* Performance Metric Container */}
            <div className="p-5 bg-white min-h-[115px] flex flex-col justify-between">
              {pipelineMode === "async" ? (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-purple-600 block mb-0.5">Asynchronous Network Pipeline:</strong>
                  Changing meaning across languages triggers active HTTP round-trips. Your app opens a network thread, pipes text strings to AI servers to manage semantic context, and updates the state vector upon resolution.
                </p>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-emerald-600 block mb-0.5">Synchronous Array Computation:</strong>
                  Alphanumeric braille encoding is an alternate notation map. The runtime processes characters directly inside browser application threads, outputting Unicode blocks like <span className="font-mono text-emerald-600 bg-slate-50 border border-emerald-200 px-2 py-0.5 rounded ml-1 text-xs">⠃⠗⠁⠊⠼⠑</span> instantly with zero server lag.
                </p>
              )}

              {/* Status Debug row */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  <Play className={`w-2.5 h-2.5 ${pipelineMode === "async" ? "text-purple-500" : "text-emerald-500"}`} />
                  {pipelineMode === "async" ? "Status: Awaiting Cloud Core Promise..." : "Status: Client Matrix Render Complete"}
                </span>
                <span className={pipelineMode === "async" ? "text-purple-600 font-bold" : "text-emerald-400 font-bold"}>
                  {pipelineMode === "async" ? "Latency: ~300ms" : "Latency: <1ms"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 🏁 STATIC BOTTOM STATUS METRICS */}
        <footer className="pt-6 border-t border-slate-100 text-slate-400 text-xs flex justify-between items-center font-mono">
          <span>Noah Dynamic Language Routing Context</span>
          <span>Zero External Dependencies</span>
        </footer>

      </main>
    </div>
  );
}
