import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { createRegistration } from "../../database/dbService";
import { sendConfirmationEmail } from "../../backend/api";
import { ParticipantRegistration } from "../types";
import { 
  Zap, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Sparkles,
  Ticket,
  ShieldCheck,
  Check
} from "lucide-react";

const PASS_TIERS = [
  {
    type: "Cyber Pass",
    badge: "FREE ENTRY",
    popular: true,
    features: ["All Keynotes & Exhibitions", "Robowar Arena General Seating", "Cyber-Night Music Fest Pass", "Digital Certificate & Badge"]
  },
  {
    type: "VIP Mech Pass",
    badge: "FREE ENTRY",
    popular: false,
    features: ["VIP Front Row Robowar Seating", "Speaker Meet & Greet Lounge", "Hands-on Workshop Kits", "Exclusive Techfest Swag Bag"]
  },
  {
    type: "Hackathon Pass",
    badge: "FREE ENTRY",
    popular: false,
    features: ["24-Hour Drone/AI Hackathon Entry", "Hardware Lab Access & Wi-Fi", "Free Overnight Meals & Energy Drinks", "Prize Eligibility (₹1 Crore)"]
  },
  {
    type: "Student Cyber Pass",
    badge: "FREE ENTRY",
    popular: false,
    features: ["Valid Student ID Required", "Entry to 50+ Tech Exhibitions", "Robowar Arena Access", "E-Certificate"]
  }
];

const FLAGSHIP_EVENTS = [
  "International Robowar (60kg Deathmatch)",
  "CyberHack Drone AI Challenge",
  "Bionic Hand Workshop",
  "Humanoid Autonomous Maze",
  "Cyborg Laser Rave Night"
];

export const RegistrationPortal: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, guestId } = useAuth();

  const [selectedPass, setSelectedPass] = useState(PASS_TIERS[0]);
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("IIT Bombay");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([FLAGSHIP_EVENTS[0]]);

  const [registeredRecord, setRegisteredRecord] = useState<ParticipantRegistration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEvent = (eventName: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventName) 
        ? prev.filter(e => e !== eventName) 
        : [...prev, eventName]
    );
  };

  const handleRegisterDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please provide your Name and Email address.");
      return;
    }

    setIsSubmitting(true);
    const txnId = "TF2026_REG_" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newReg: ParticipantRegistration = {
      fullName,
      email,
      phone,
      college,
      passType: selectedPass.type as any,
      amountPaid: 0,
      eventsSelected: selectedEvents,
      paymentStatus: "COMPLETED",
      transactionId: txnId,
      createdAt: new Date().toISOString(),
      userId: user?.uid || guestId,
      language,
      qrCodeToken: "QR_CYBER_" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    try {
      // Save to Firestore
      const id = await createRegistration(newReg);
      newReg.id = id;

      // Send confirmation email
      await sendConfirmationEmail(newReg);

      setRegisteredRecord(newReg);
    } catch (err) {
      console.error("Registration error:", err);
      // Fallback display
      setRegisteredRecord(newReg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration-portal" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-mono text-xs font-bold uppercase">
          <Zap className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>INSTANT TICKET REGISTRATION PORTAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono uppercase tracking-tight">
          {t.passSelection}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto font-sans text-sm">
          Select your pass tier, enter participant details, and instantly generate your official digital QR admission credentials.
        </p>
      </div>

      {registeredRecord ? (
        /* Instant Ticket Confirmation View */
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-xl shadow-[0_0_50px_rgba(0,229,255,0.2)] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 border border-[#00e5ff] flex items-center justify-center mx-auto text-[#00e5ff]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold uppercase">
              CONFIRMED & ISSUED
            </span>
            <h3 className="text-2xl font-bold font-mono text-white">REGISTRATION CONFIRMED!</h3>
            <p className="text-xs font-mono text-[#00e5ff]">REG ID #{registeredRecord.transactionId}</p>
          </div>

          {/* QR Ticket Badge */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 max-w-sm mx-auto text-left font-mono">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <p className="text-[10px] text-slate-500">PARTICIPANT</p>
                <p className="text-sm font-bold text-white">{registeredRecord.fullName}</p>
              </div>
              <Ticket className="w-6 h-6 text-[#00e5ff]" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[10px] text-slate-500">PASS TIER</p>
                <p className="text-[#00e5ff] font-bold">{registeredRecord.passType}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">COLLEGE</p>
                <p className="text-slate-300 truncate">{registeredRecord.college}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">VALIDATION TOKEN</p>
                <p className="text-[11px] text-emerald-400 font-bold">{registeredRecord.qrCodeToken}</p>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded">
                <div className="w-full h-full bg-black flex items-center justify-center text-[8px] text-white font-mono">
                  [QR]
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-full bg-[#00e5ff] text-black font-mono text-xs font-bold hover:scale-105 transition-transform"
            >
              {t.downloadTicket}
            </button>
            <button
              onClick={() => setRegisteredRecord(null)}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-slate-300 font-mono text-xs hover:bg-white/20"
            >
              Register Another
            </button>
          </div>
        </div>
      ) : (
        /* Main Registration Flow */
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Pass Selection Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {PASS_TIERS.map((tier) => (
              <div
                key={tier.type}
                onClick={() => setSelectedPass(tier)}
                className={`relative rounded-2xl p-6 transition-all cursor-pointer border flex flex-col justify-between backdrop-blur-xl ${
                  selectedPass.type === tier.type
                    ? "bg-white/10 border-2 border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.25)]"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#00e5ff] text-black font-mono text-[10px] font-extrabold uppercase">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-white">{tier.type}</h3>
                    <div className="text-2xl font-extrabold font-mono text-[#00e5ff] mt-2 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#00e5ff]/20 border border-[#00e5ff]/40 text-xs text-[#00e5ff]">
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs font-sans text-slate-300">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className={selectedPass.type === tier.type ? "text-[#00e5ff] font-bold" : "text-slate-400"}>
                    {selectedPass.type === tier.type ? "SELECTED TIER" : "CLICK TO SELECT"}
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedPass.type === tier.type ? "border-[#00e5ff] bg-[#00e5ff]" : "border-slate-600"
                  }`}>
                    {selectedPass.type === tier.type && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Participant Form */}
          <div className="lg:col-span-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-mono text-white">PARTICIPANT DETAILS</h3>
                <p className="text-xs font-mono text-[#00e5ff]">Instant Portal Registration</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#00e5ff]" />
            </div>

            <form onSubmit={handleRegisterDirect} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase">{t.fullNameLabel}</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase">{t.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@iitb.ac.in"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">{t.collegeLabel}</label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="IIT Bombay"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>
              </div>

              {/* Event Selection Checkboxes (Fixed Double Toggle Bug) */}
              <div className="space-y-2 pt-2">
                <label className="text-slate-300 font-bold uppercase">{t.selectEventsLabel}</label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {FLAGSHIP_EVENTS.map((ev) => (
                    <label
                      key={ev}
                      className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/10 text-[11px] text-slate-300 cursor-pointer hover:border-white/20 select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(ev)}
                        onChange={() => toggleEvent(ev)}
                        className="accent-[#00e5ff] cursor-pointer"
                      />
                      <span className="truncate">{ev}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pass Tier Confirmation */}
              <div className="p-4 rounded-xl bg-black/40 border border-[#00e5ff]/30 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Tier:</span>
                  <span className="text-white font-bold">{selectedPass.type}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>REGISTRATION FEE:</span>
                  <span className="text-[#00e5ff] uppercase">FREE ADMISSION</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#00e5ff] text-black font-extrabold text-xs uppercase tracking-tighter shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING REGISTRATION..." : "CONFIRM & GENERATE DIGITAL BADGE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
