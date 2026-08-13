import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Interactive3DCyborg } from "./Interactive3DCyborg";
import { CountdownTimer } from "./CountdownTimer";
import { 
  ShieldCheck, 
  Cpu, 
  Trophy, 
  Users, 
  Calendar, 
  Sparkles, 
  ChevronRight,
  Zap,
  Globe
} from "lucide-react";

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Headline & 3D Split Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest">
                29th EDITION · IIT BOMBAY CAMPUS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono uppercase leading-none">
              {t.eventTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                {t.subtitle}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
              {t.tagline}
            </p>

            {/* Countdown Component */}
            <div className="pt-2">
              <CountdownTimer />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab("register")}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-mono font-extrabold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:scale-105 transition-all flex items-center gap-2 group"
              >
                <span>{t.registerNow}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("passes")}
                className="px-6 py-4 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-sm tracking-wider uppercase hover:bg-slate-800 hover:border-cyan-400 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{t.explorePasses}</span>
              </button>

              <button
                onClick={() => setActiveTab("schedule")}
                className="px-6 py-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-sm hover:text-white hover:border-slate-600 transition-all"
              >
                {t.navSchedule}
              </button>
            </div>
          </div>

          {/* Right 3D Interactive Canvas */}
          <div className="lg:col-span-5">
            <Interactive3DCyborg />
          </div>
        </div>

        {/* Live Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 p-3 border-r border-slate-800/80">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">50,000+</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Global Attendees</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 border-r border-slate-800/80">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-cyan-400">₹1,00,00,000+</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Prize Pool</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 border-r border-slate-800/80">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">75+</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Keynote Speakers</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">35+</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Countries Represented</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
