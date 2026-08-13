import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Language } from "../types";
import { 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  Terminal, 
  User, 
  LogOut, 
  Sparkles,
  Zap
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, guestId, loginWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🌐" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
    { code: "mr", label: "मराठी", flag: "🇮🇳" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" }
  ];

  const navItems = [
    { id: "home", label: t.navHome },
    { id: "schedule", label: t.navSchedule },
    { id: "speakers", label: t.navSpeakers },
    { id: "passes", label: t.navPasses },
    { id: "register", label: t.navRegister },
    { id: "chat", label: t.navChat },
    { id: "analytics", label: t.navAnalytics }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Cyber Ticker Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950 px-4 py-1 text-[11px] font-mono text-cyan-300 border-b border-cyan-500/10 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3 animate-pulse">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-semibold uppercase tracking-widest">{t.liveStatus}</span>
          <span className="hidden sm:inline text-slate-400">| DEC 26-28, 2026 @ IIT BOMBAY CAMPUS</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline">SYSTEM STATUS: ALL SYSTEMS NOMINAL</span>
          <span className="text-cyan-400 font-bold">IIT BOMBAY OFFICIAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Crest */}
        <button 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-slate-900 p-[1.5px] shadow-[0_0_20px_rgba(0,243,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,243,255,0.7)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white font-mono uppercase">
                TECHFEST<span className="text-cyan-400">.IITB</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono font-bold">
                2026
              </span>
            </div>
            <p className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
              {t.subtitle}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === item.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                  : "text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Selector & Auth Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Multi-language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:border-cyan-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-2 z-50 font-mono text-xs">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      language === lang.code ? "bg-cyan-500/20 text-cyan-300 font-bold" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {language === lang.code && <span className="text-cyan-400">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 p-1.5 rounded-2xl">
              <img
                src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
                alt={user.displayName || "User"}
                className="w-7 h-7 rounded-full border border-cyan-400"
              />
              <span className="text-xs font-mono text-cyan-300 font-medium max-w-[100px] truncate">
                {user.displayName || "Cyborg User"}
              </span>
              <button
                onClick={logout}
                className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:scale-105 transition-transform"
            >
              <User className="w-3.5 h-3.5" />
              <span>CYBORG LOGIN</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 hover:border-cyan-400"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/20 p-4 space-y-3 font-mono text-sm animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded text-xs ${
                    language === l.code ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            {user ? (
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
