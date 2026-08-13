import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { subscribeToChatChannel, sendChatMessage } from "../../database/dbService";
import { ChatMessage } from "../types";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Smile,
  Hash
} from "lucide-react";

export const RealtimeChat: React.FC = () => {
  const { t } = useLanguage();
  const { user, guestId } = useAuth();

  const [activeChannel, setActiveChannel] = useState<"general" | "cyber-teams" | "workshops" | "announcements">("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: "general", label: "#general-cyber", desc: "Main event discussion & networking" },
    { id: "cyber-teams", label: "#team-formation", desc: "Find teammates for Robowar & CyberHack" },
    { id: "workshops", label: "#bionics-workshop", desc: "Q&A with lab instructors" },
    { id: "announcements", label: "#official-updates", desc: "Broadcast announcements" }
  ] as const;

  useEffect(() => {
    const unsubscribe = subscribeToChatChannel(activeChannel, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderName = user?.displayName || "CyberGuest_" + guestId.substring(11, 15);
    const senderAvatar = user?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${senderName}`;

    const newMsg: Omit<ChatMessage, "id"> = {
      text: inputText,
      senderId: user?.uid || guestId,
      senderName,
      senderAvatar,
      channel: activeChannel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userRole: user ? "ATTENDEE" : "ATTENDEE"
    };

    setInputText("");
    await sendChatMessage(newMsg);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>REALTIME EVENT NETWORKING CHAT</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-mono uppercase mt-2">
            {t.realtimeChatTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CHANNEL: <strong className="text-cyan-300">#{activeChannel}</strong></span>
        </div>
      </div>

      {/* Main Chat Interface Grid */}
      <div className="grid lg:grid-cols-12 gap-6 h-[550px] rounded-3xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl">
        {/* Left Channel Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 border-r border-slate-800 p-4 space-y-4 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-3">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">CHANNELS</span>
            <div className="space-y-1">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex flex-col gap-1 border ${
                    activeChannel === ch.id
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">{ch.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans truncate">{ch.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[10px] text-cyan-400 font-bold">YOUR CYBORG IDENTITY</div>
            <div className="text-xs text-white truncate font-bold">
              {user?.displayName || "Guest User (" + guestId.substring(0, 10) + ")"}
            </div>
          </div>
        </div>

        {/* Right Messages Area */}
        <div className="lg:col-span-8 flex flex-col justify-between p-4 bg-slate-950/90 font-mono text-xs">
          {/* Message History Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                <Bot className="w-10 h-10 text-cyan-500/40 animate-pulse" />
                <p>Welcome to #{activeChannel}! Be the first to start the cyber conversation.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={msg.id || i} className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-900/60 transition-colors">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full border border-cyan-400/50 object-cover shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-xs">{msg.senderName}</span>
                      <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 text-[9px]">
                        {msg.userRole || "ATTENDEE"}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-auto">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 font-sans text-sm bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder={`Message #${activeChannel}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            >
              <Send className="w-4 h-4" />
              <span>SEND</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
