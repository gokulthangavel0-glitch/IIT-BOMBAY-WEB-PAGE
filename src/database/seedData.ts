import { Speaker, EventScheduleItem, PushNotification } from "../frontend/types";

export const INITIAL_SPEAKERS: Speaker[] = [
  {
    id: "spk-1",
    name: "Dr. Elena Vance",
    title: "Head of Bionic Neural Interfaces",
    organization: "CyberTech Cybernetics Institute",
    cyberEnhancement: "Ocular Cortex HUD & Quantum Neural Link",
    topic: "The Symbiosis of Mind and Cybernetic Exoskeletons",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    bio: "Pioneer in implantable prosthetic motor control and brain-computer interfaces for cybernetic locomotion.",
    keynoteTime: "Day 1 - 10:00 AM (Main Arena)",
    featured: true,
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  },
  {
    id: "spk-2",
    name: "Vikramaditya Sharma",
    title: "Chief Robotics Architect",
    organization: "IIT Bombay Autonomous Systems Lab",
    cyberEnhancement: "Haptic Micro-actuator Subsystem",
    topic: "Bipedal Combat & Search-and-Rescue Mechatronics",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    bio: "Leader of the Indian Humanoid Initiative, driving breakthrough motor density and military-grade balance algorithms.",
    keynoteTime: "Day 1 - 02:30 PM (Convocation Hall)",
    featured: true,
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
  },
  {
    id: "spk-3",
    name: "Kaito Takahashi",
    title: "Director of Synthetic Bio-Robotics",
    organization: "Neo-Tokyo Bionics Corp",
    cyberEnhancement: "Synthetic Bio-synthetic Dermal Matrix",
    topic: "Soft Bionics & Synthetic Muscle Actuators",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    bio: "Developer of electro-active polymer muscles powering the next generation of silent bio-prosthetics.",
    keynoteTime: "Day 2 - 11:15 AM (Auditorium A)",
    featured: true,
    socials: { twitter: "https://twitter.com" }
  },
  {
    id: "spk-4",
    name: "Dr. Anya Rostov",
    title: "Quantum AI Ethics Lead",
    organization: "Cyborg Horizon Foundation",
    cyberEnhancement: "Quantum Coprocessor Synapse Unit",
    topic: "Autonomous Neural Governance in Cybernetic Warfare",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    bio: "Renowned ethicist and roboticist addressing neural privacy and human-cyborg rights frameworks.",
    keynoteTime: "Day 3 - 04:00 PM (Main Arena)",
    featured: false,
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
  }
];

export const INITIAL_SCHEDULE: EventScheduleItem[] = [
  {
    id: "sch-1",
    title: "International Robowar: Cyber Deathmatch",
    category: "Competition",
    venue: "Gymkhana Open Arena",
    time: "09:00 AM - 01:00 PM",
    date: "Dec 26, 2026",
    description: "60kg combat robots engage in high-octane armor piercing combat inside the bulletproof cage.",
    seatsRemaining: 120,
    tag: "Prize Pool ₹10,000,000"
  },
  {
    id: "sch-2",
    title: "Bionic Exoskeleton & Myoelectric Hands Workshop",
    category: "Workshop",
    venue: "Lecture Hall Complex (LHC 101)",
    time: "02:00 PM - 05:00 PM",
    date: "Dec 26, 2026",
    speaker: "Dr. Elena Vance",
    description: "Hands-on assembly of EMG muscle sensor circuits and 3D printed robotic prosthetics.",
    seatsRemaining: 18,
    tag: "Certificate Provided"
  },
  {
    id: "sch-3",
    title: "Keynote: Mind-Machine Fusion in 2030",
    category: "Keynote",
    venue: "Convocation Hall",
    time: "05:30 PM - 07:00 PM",
    date: "Dec 26, 2026",
    speaker: "Vikramaditya Sharma",
    description: "Unveiling IIT Bombay's secret human-augmentation exoskeleton prototype live on stage.",
    seatsRemaining: 450,
    tag: "Live Streamed"
  },
  {
    id: "sch-4",
    title: "CyberHack 24-Hour Autonomous Drone Hackathon",
    category: "Competition",
    venue: "Computer Centre Hall 3",
    time: "10:00 AM (24 hrs)",
    date: "Dec 27, 2026",
    description: "Program autonomous AI quadcopters to navigate subterranean laser-obstacle mazes.",
    seatsRemaining: 8,
    tag: "Hardware Kits Provided"
  },
  {
    id: "sch-5",
    title: "Cyborg Laser Rave & Holographic Sound Show",
    category: "CyberNight",
    venue: "Gymkhana Grounds",
    time: "08:00 PM - 11:30 PM",
    date: "Dec 27, 2026",
    description: "Immersive 3D laser spectacle with synthwave artists, cyber-dancers, and volumetric holographic projections.",
    seatsRemaining: 3000,
    tag: "Open to All Pass Holders"
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: "notif-1",
    title: "⚡ Registration Alert",
    message: "VIP Mech Pass tier is 85% filled! Secure your fast-track queue access for Robowar Grand Arena.",
    category: "URGENT",
    timestamp: "10 mins ago",
    urgent: true
  },
  {
    id: "notif-2",
    title: "🤖 Keynote Speaker Update",
    message: "Dr. Elena Vance keynote start time shifted to 10:00 AM at Main Arena.",
    category: "SCHEDULE",
    timestamp: "1 hour ago",
    urgent: false
  },
  {
    id: "notif-3",
    title: "🏆 Robowar Rulebook Released",
    message: "Updated weight class tolerance (+/- 500g) published for international competitors.",
    category: "COMPETITION",
    timestamp: "3 hours ago",
    urgent: false
  }
];
