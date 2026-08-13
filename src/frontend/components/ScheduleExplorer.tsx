import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { INITIAL_SCHEDULE } from "../../database/seedData";
import { EventScheduleItem } from "../types";
import { Calendar, Clock, MapPin, Search, Tag, CheckCircle2, Bookmark } from "lucide-react";

export const ScheduleExplorer: React.FC = () => {
  const { t } = useLanguage();
  const [scheduleList] = useState<EventScheduleItem[]>(INITIAL_SCHEDULE);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [reserved, setReserved] = useState<Record<string, boolean>>({});

  const categories = ["All", "Competition", "Workshop", "Keynote", "CyberNight"];

  const filteredSchedule = scheduleList.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleReserveSeat = (id: string) => {
    setReserved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAMPUS EVENT TIMELINE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-mono uppercase mt-2">
            EVENT SCHEDULE EXPLORER
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search events or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedCategory === cat
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Schedule Timeline List */}
      <div className="space-y-4">
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[10px]">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 font-sans">{item.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.date} | {item.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-white font-medium">{item.venue}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {item.seatsRemaining} Seats Remaining
              </span>
              <button
                onClick={() => handleReserveSeat(item.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  reserved[item.id]
                    ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                    : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>{reserved[item.id] ? "SEAT BOOKMARKED ✓" : "RESERVE SEAT"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
