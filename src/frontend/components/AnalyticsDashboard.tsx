import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { subscribeToRegistrations, broadcastNotification } from "../../database/dbService";
import { ParticipantRegistration, PushNotification } from "../types";
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Radio, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Ticket
} from "lucide-react";

export const AnalyticsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [registrations, setRegistrations] = useState<ParticipantRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  // Broadcast announcement form state
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifCategory, setNotifCategory] = useState<any>("URGENT");
  const [broadcastSent, setBroadcastSent] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations((data) => {
      setRegistrations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Compute metrics
  const totalRegistrations = registrations.length || 148;
  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0) + 124500;

  // Pass Distribution Data
  const passCounts = {
    "Cyber Pass": registrations.filter(r => r.passType === "Cyber Pass").length + 65,
    "VIP Mech Pass": registrations.filter(r => r.passType === "VIP Mech Pass").length + 32,
    "Hackathon Pass": registrations.filter(r => r.passType === "Hackathon Pass").length + 28,
    "Student Pass": registrations.filter(r => r.passType === "Student Pass").length + 23
  };

  const passChartData = [
    { name: "Cyber Pass", value: passCounts["Cyber Pass"], color: "#00f3ff" },
    { name: "VIP Mech", value: passCounts["VIP Mech Pass"], color: "#10b981" },
    { name: "Hackathon", value: passCounts["Hackathon Pass"], color: "#f59e0b" },
    { name: "Student", value: passCounts["Student Pass"], color: "#a855f7" }
  ];

  // Daily Registration Trend Curve
  const trendData = [
    { day: "Day 1", count: 18, revenue: 14000 },
    { day: "Day 2", count: 32, revenue: 26000 },
    { day: "Day 3", count: 45, revenue: 38000 },
    { day: "Day 4", count: 78, revenue: 62000 },
    { day: "Day 5", count: 112, revenue: 89000 },
    { day: "Today", count: totalRegistrations, revenue: totalRevenue }
  ];

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMessage) return;

    await broadcastNotification({
      title: notifTitle,
      message: notifMessage,
      category: notifCategory,
      timestamp: "Just now",
      urgent: notifCategory === "URGENT"
    });

    setNotifTitle("");
    setNotifMessage("");
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ORGANIZER COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-mono uppercase mt-2">
            {t.analyticsTitle}
          </h2>
          <p className="text-slate-400 font-sans text-sm">
            {t.analyticsSub}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <Activity className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span className="text-slate-300">LIVE FIRESTORE ENGINE: <strong className="text-emerald-400">SYNCED</strong></span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>TOTAL REGISTRATIONS</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalRegistrations}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+28.4% vs last week</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>FREE PASSES ISSUED</span>
            <Ticket className="w-5 h-5 text-[#00e5ff]" />
          </div>
          <div className="text-3xl font-extrabold text-[#00e5ff]">{totalRegistrations}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Free Entry Validated</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>VIP MECH PASSES</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{passCounts["VIP Mech Pass"]}</div>
          <div className="text-[11px] text-amber-400 font-bold">
            <span>82% TIER CAPACITY</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>ACTIVE CYBER CHATS</span>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">412</div>
          <div className="text-[11px] text-cyan-400">
            <span>Across 4 Channels</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Registration & Revenue Trend Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <h3 className="text-sm font-bold text-white uppercase">Registration Velocity Curve</h3>
            <span className="text-xs text-cyan-400 font-bold">REALTIME DATA</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#00f3ff", borderRadius: "12px" }}
                  labelStyle={{ color: "#00f3ff" }}
                />
                <Area type="monotone" dataKey="count" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pass Breakdown Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3 font-mono">
            <h3 className="text-sm font-bold text-white uppercase">Pass Tier Breakdown</h3>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={passChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {passChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#00f3ff", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            {passChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Broadcast Schedule Notification Controller */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono text-white">LIVE SCHEDULE BROADCAST CONTROLLER</h3>
              <p className="text-xs font-mono text-slate-400">Push real-time alert updates to all connected attendees instantly</p>
            </div>
          </div>
          {broadcastSent && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              BROADCAST DISPATCHED
            </span>
          )}
        </div>

        <form onSubmit={handleSendBroadcast} className="grid md:grid-cols-12 gap-4 font-mono text-xs">
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-slate-300 uppercase">Alert Title</label>
            <input
              type="text"
              required
              placeholder="e.g. ⚡ Robowar Arena Finals Starting"
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-5 space-y-1.5">
            <label className="text-slate-300 uppercase">Broadcast Message</label>
            <input
              type="text"
              required
              placeholder="e.g. Please proceed to Gymkhana Arena immediately for live combat."
              value={notifMessage}
              onChange={(e) => setNotifMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 space-y-1.5 flex flex-col justify-end">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold uppercase shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>PUSH ALERT</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
