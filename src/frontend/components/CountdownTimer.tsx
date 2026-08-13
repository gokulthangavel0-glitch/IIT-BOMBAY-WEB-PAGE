import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Clock, Zap } from "lucide-react";

export const CountdownTimer: React.FC = () => {
  const { t } = useLanguage();
  const targetDate = new Date("2026-12-26T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="inline-flex flex-col gap-2 p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.15)]">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
        <span>COUNTDOWN TO TECHFEST IITB LAUNCH</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center font-mono">
        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-cyan-400 font-bold uppercase mt-0.5">{t.countdownDays}</div>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-cyan-400 font-bold uppercase mt-0.5">{t.countdownHours}</div>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-cyan-400 font-bold uppercase mt-0.5">{t.countdownMinutes}</div>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-2.5 bg-gradient-to-b from-slate-900 to-cyan-950/40">
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-cyan-400 font-bold uppercase mt-0.5">{t.countdownSeconds}</div>
        </div>
      </div>
    </div>
  );
};
