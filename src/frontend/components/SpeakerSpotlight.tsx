import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { INITIAL_SPEAKERS } from "../../database/seedData";
import { Speaker } from "../types";
import { Cpu, Calendar, Twitter, Linkedin, Github, Sparkles, ChevronRight, Bookmark } from "lucide-react";

export const SpeakerSpotlight: React.FC = () => {
  const { t } = useLanguage();
  const [speakers] = useState<Speaker[]>(INITIAL_SPEAKERS);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL KEYNOTE VISIONARIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono uppercase tracking-tight">
            {t.speakerSpotlightTitle}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-sans text-sm sm:text-base">
            {t.speakerSpotlightSub}
          </p>
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-5 transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Background HUD Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />

              <div className="space-y-4 relative z-10">
                {/* Speaker Photo & Cyber Badge */}
                <div className="relative overflow-hidden rounded-2xl aspect-square border border-slate-700/60">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Bookmark CTA */}
                  <button
                    onClick={(e) => toggleBookmark(speaker.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-colors ${
                      bookmarked[speaker.id]
                        ? "bg-cyan-500 border-cyan-400 text-slate-950"
                        : "bg-slate-950/60 border-slate-700 text-slate-300 hover:border-cyan-400"
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase truncate max-w-full">
                      {speaker.keynoteTime}
                    </span>
                  </div>
                </div>

                {/* Speaker Info */}
                <div>
                  <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 font-medium">
                    {speaker.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {speaker.organization}
                  </p>
                </div>

                {/* Cyber Enhancement Spec */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{speaker.cyberEnhancement}</span>
                </div>
              </div>

              {/* Topic Preview */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="truncate max-w-[200px]">"{speaker.topic}"</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={selectedSpeaker.image}
                alt={selectedSpeaker.name}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-400"
              />
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-bold font-mono text-white">{selectedSpeaker.name}</h3>
                <p className="text-sm font-mono text-cyan-400 font-bold">{selectedSpeaker.title}</p>
                <p className="text-xs text-slate-300">{selectedSpeaker.organization}</p>
                <div className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
                  {selectedSpeaker.keynoteTime}
                </div>
              </div>
            </div>

            <div className="space-y-3 font-sans text-sm text-slate-300">
              <h4 className="text-xs font-mono font-bold uppercase text-cyan-400">RESEARCH BIO & ABSTRACT</h4>
              <p className="leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {selectedSpeaker.bio}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>SPEC: {selectedSpeaker.cyberEnhancement}</span>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
