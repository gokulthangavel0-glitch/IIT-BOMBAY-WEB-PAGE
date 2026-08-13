import React, { useEffect, useState } from "react";
import { subscribeToNotifications } from "../../database/dbService";
import { PushNotification } from "../types";
import { Bell, AlertTriangle, Calendar, Trophy, X, ChevronRight } from "lucide-react";

export const PushNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((data) => {
      setNotifications(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Bell Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setUnreadCount(0);
        }}
        className="relative p-4 rounded-2xl bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-110 transition-transform flex items-center justify-center font-bold"
      >
        <Bell className="w-6 h-6 fill-current" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-mono font-bold flex items-center justify-center border-2 border-slate-950 animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Drawer Modal */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-3xl bg-slate-900 border-2 border-cyan-400 p-5 space-y-4 shadow-2xl font-mono text-xs animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-bold uppercase">LIVE SCHEDULE ALERTS</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n, idx) => (
              <div
                key={n.id || idx}
                className={`p-3 rounded-2xl border space-y-1 ${
                  n.urgent
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-200"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">{n.title}</span>
                  <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-snug">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
