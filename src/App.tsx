import React, { useState } from "react";
import { LanguageProvider } from "./frontend/context/LanguageContext";
import { AuthProvider } from "./frontend/context/AuthContext";
import { Navbar } from "./frontend/components/Navbar";
import { HeroSection } from "./frontend/components/HeroSection";
import { SpeakerSpotlight } from "./frontend/components/SpeakerSpotlight";
import { RegistrationPortal } from "./frontend/components/RegistrationPortal";
import { ScheduleExplorer } from "./frontend/components/ScheduleExplorer";
import { RealtimeChat } from "./frontend/components/RealtimeChat";
import { AnalyticsDashboard } from "./frontend/components/AnalyticsDashboard";
import { PushNotifications } from "./frontend/components/PushNotifications";
import { AiCyborgAssistant } from "./frontend/components/AiCyborgAssistant";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[#05070a] text-[#e0e7ff] font-sans selection:bg-[#00e5ff] selection:text-black relative overflow-x-hidden">
          {/* Ambient Frosted Background Orbs */}
          <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#00e5ff] blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7000ff] blur-[170px]" />
          </div>

          {/* Navigation Bar */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Dynamic Tab Views */}
          <main className="space-y-12 pb-24 relative z-10">
            {activeTab === "home" && (
              <>
                <HeroSection setActiveTab={setActiveTab} />
                <SpeakerSpotlight />
                <RegistrationPortal />
                <ScheduleExplorer />
                <RealtimeChat />
              </>
            )}

            {activeTab === "schedule" && <ScheduleExplorer />}
            {activeTab === "speakers" && <SpeakerSpotlight />}
            {activeTab === "register" && <RegistrationPortal />}
            {activeTab === "passes" && <RegistrationPortal />}
            {activeTab === "chat" && <RealtimeChat />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
          </main>

          {/* Floating Assistive Tools */}
          <PushNotifications />
          <AiCyborgAssistant />

          {/* Futuristic Frosted Footer */}
          <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="font-extrabold text-white text-base">TECHFEST IIT BOMBAY</span>
                  <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 font-bold">2026</span>
                </div>
                <p className="text-slate-500">Official Cyborg-Themed Science & Technology Portal · IIT Bombay Powai Campus, Mumbai 400076</p>
              </div>

              <div className="flex items-center gap-6 text-slate-400">
                <button onClick={() => setActiveTab("home")} className="hover:text-[#00e5ff] transition-colors">Core</button>
                <button onClick={() => setActiveTab("schedule")} className="hover:text-[#00e5ff] transition-colors">Schedule</button>
                <button onClick={() => setActiveTab("register")} className="hover:text-[#00e5ff] transition-colors">Register</button>
                <button onClick={() => setActiveTab("analytics")} className="hover:text-[#00e5ff] transition-colors">Analytics</button>
              </div>

              {/* Official Social Links including LinkedIn */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/techfest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#00e5ff] hover:bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center transition-all"
                  title="Official Techfest LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/techfest_iitb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#00e5ff] hover:bg-[#00e5ff]/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                  title="Official Techfest X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/techfest_iitbombay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#00e5ff] hover:bg-[#00e5ff]/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                  title="Official Techfest Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/user/techfestiitbombay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#00e5ff] hover:bg-[#00e5ff]/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                  title="Official Techfest YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="text-slate-500 text-center md:text-right">
                <p>© 2026 Techfest IIT Bombay. All Rights Reserved.</p>
                <p className="text-[#00e5ff] font-bold mt-1">POWERED BY FIREBASE & GEMINI AI</p>
              </div>
            </div>
          </footer>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
