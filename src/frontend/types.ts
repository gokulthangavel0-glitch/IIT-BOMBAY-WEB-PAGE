export type Language = 'en' | 'hi' | 'mr' | 'ja' | 'de' | 'es';

export interface ParticipantRegistration {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  passType: 'Cyber Pass' | 'VIP Mech Pass' | 'Hackathon Pass' | 'Student Pass';
  amountPaid: number;
  eventsSelected: string[];
  paymentStatus: 'COMPLETED' | 'PENDING' | 'FAILED';
  transactionId: string;
  createdAt: string;
  userId?: string;
  language?: Language;
  qrCodeToken?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  cyberEnhancement: string; // e.g. "Neural Interface v4.2 & Quantum Bionics"
  topic: string;
  image: string;
  bio: string;
  keynoteTime: string;
  featured: boolean;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface ChatMessage {
  id?: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  channel: 'general' | 'cyber-teams' | 'workshops' | 'announcements';
  timestamp: string;
  userRole?: 'ATTENDEE' | 'SPEAKER' | 'ORGANIZER' | 'CYBORG_BOT';
}

export interface EventScheduleItem {
  id: string;
  title: string;
  category: 'Competition' | 'Workshop' | 'Keynote' | 'Exhibition' | 'CyberNight';
  venue: string;
  time: string;
  date: string;
  speaker?: string;
  description: string;
  seatsRemaining: number;
  tag: string;
}

export interface PushNotification {
  id?: string;
  title: string;
  message: string;
  category: 'SCHEDULE' | 'URGENT' | 'COMPETITION' | 'KEYNOTE';
  timestamp: string;
  urgent?: boolean;
}

export interface AnalyticsStats {
  totalRegistrations: number;
  totalRevenue: number;
  activeAttendees: number;
  chatMessagesCount: number;
  passBreakdown: {
    cyberPass: number;
    vipMechPass: number;
    hackathonPass: number;
    studentPass: number;
  };
  languageStats: Record<Language, number>;
}
