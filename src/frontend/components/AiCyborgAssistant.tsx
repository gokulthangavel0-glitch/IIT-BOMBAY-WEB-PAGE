import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { queryCyborgIntelligence } from "../../backend/geminiService";
import { Bot, X, Send, Sparkles, RefreshCw, Trash2, HelpCircle } from "lucide-react";

export const AiCyborgAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatLog, setChatLog] = useState<{ role: "user" | "cyborg"; text: string; time?: string }[]>([
    {
      role: "cyborg",
      text: "⚡ CYBORG-X ONLINE: Greetings Cyber-Pioneer! I am the AI Concierge for Techfest IIT Bombay 2026. Ask me anything about free passes, Robowar rules, schedule timeline, or campus maps!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const QUICK_PROMPTS = [
    "🎟️ How do I get free passes?",
    "🤖 What are the Robowar rules?",
    "📅 Show me the event schedule",
    "🗺️ How to reach IIT Bombay campus?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatLog, isOpen, loading]);

  const askQuestion = async (userPrompt: string) => {
    if (!userPrompt.trim() || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog(prev => [...prev, { role: "user", text: userPrompt, time: timeStr }]);
    setLoading(true);

    try {
      const reply = await queryCyborgIntelligence(userPrompt, language);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatLog(prev => [...prev, { role: "cyborg", text: reply, time: replyTime }]);
    } catch (err) {
      setChatLog(prev => [...prev, {
        role: "cyborg",
        text: "⚡ CYBORG-X: Direct neural link query processed. Techfest IIT Bombay 2026 features 50+ competitions, international keynotes, and free digital admission passes!",
        time: timeStr
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAskForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const promptText = query;
    setQuery("");
    askQuestion(promptText);
  };

  const clearChat = () => {
    setChatLog([
      {
        role: "cyborg",
        text: "⚡ CYBORG-X RE-CALIBRATED: Chat log cleared. How can I assist your Techfest experience?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 sm:p-4 rounded-full bg-black/80 border border-[#00e5ff] text-[#00e5ff] backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-105 transition-all flex items-center gap-2 font-bold text-xs"
        >
          <Bot className="w-5 h-5 text-[#00e5ff] animate-pulse" />
          <span className="hidden sm:inline uppercase tracking-tight">ASK CYBORG-X AI</span>
        </button>
      )}

      {/* Floating AI Drawer Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[400px] rounded-2xl bg-[#05070a]/95 border border-white/20 backdrop-blur-2xl p-4 sm:p-5 space-y-3 shadow-[0_10px_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <Bot className="w-5 h-5 text-[#00e5ff]" />
              <div>
                <span className="text-white font-bold text-xs block leading-none">CYBORG-X AI ASSISTANT</span>
                <span className="text-[9px] text-[#00e5ff]">Gemini Neural Engine</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear Chat Log"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Chip Prompts for Fast Efficiency */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] scrollbar-none">
            {QUICK_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => askQuestion(chip)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="space-y-3 h-64 overflow-y-auto text-xs pr-1 scrollbar-thin">
            {chatLog.map((log, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[90%] ${
                  log.role === "user"
                    ? "bg-[#00e5ff]/15 text-[#00e5ff] ml-auto border border-[#00e5ff]/30"
                    : "bg-white/5 text-slate-200 border border-white/10"
                }`}
              >
                <p className="font-sans leading-relaxed text-xs">{log.text}</p>
                {log.time && (
                  <span className="text-[9px] opacity-40 block text-right mt-1 font-mono">
                    {log.time}
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="p-3 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span className="text-[11px]">CYBORG NEURAL LINK COMPUTING...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleAskForm} className="flex gap-2 pt-1 border-t border-white/10">
            <input
              type="text"
              placeholder="Ask Cyborg-X about passes, schedule..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00e5ff] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-[#00e5ff] text-black font-bold hover:bg-[#00e5ff]/80 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
