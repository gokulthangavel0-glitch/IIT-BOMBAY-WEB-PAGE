import { Language } from "../types";

export interface TranslationDictionary {
  eventTitle: string;
  subtitle: string;
  tagline: string;
  navHome: string;
  navSchedule: string;
  navSpeakers: string;
  navRegister: string;
  navChat: string;
  navAnalytics: string;
  navPasses: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownSeconds: string;
  registerNow: string;
  explorePasses: string;
  passSelection: string;
  cyberPassTitle: string;
  vipMechPassTitle: string;
  hackathonPassTitle: string;
  studentPassTitle: string;
  checkoutButton: string;
  speakerSpotlightTitle: string;
  speakerSpotlightSub: string;
  analyticsTitle: string;
  analyticsSub: string;
  realtimeChatTitle: string;
  socialShareTitle: string;
  pushNotificationsTitle: string;
  languageSelect: string;
  liveStatus: string;
  totalRegistrations: string;
  revenueGenerated: string;
  activeAttendees: string;
  downloadTicket: string;
  paymentSuccess: string;
  fullNameLabel: string;
  emailLabel: string;
  collegeLabel: string;
  phoneLabel: string;
  selectEventsLabel: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    eventTitle: "TECHFEST IIT BOMBAY",
    subtitle: "CYBORG EDITION 2026",
    tagline: "Asia's Premier Science & Technology Festival · Human Augmentation & Autonomous Mechatronics",
    navHome: "Core",
    navSchedule: "Schedule",
    navSpeakers: "Speakers",
    navRegister: "Register",
    navChat: "Cyber Chat",
    navAnalytics: "Analytics",
    navPasses: "Passes",
    countdownDays: "DAYS",
    countdownHours: "HOURS",
    countdownMinutes: "MINS",
    countdownSeconds: "SECS",
    registerNow: "SECURE PASS",
    explorePasses: "VIEW TIERS",
    passSelection: "Select Your Access Level",
    cyberPassTitle: "Cyber Pass",
    vipMechPassTitle: "VIP Mech Pass",
    hackathonPassTitle: "Hackathon Pass",
    studentPassTitle: "Student Cyber Pass",
    checkoutButton: "PROCEED TO SECURE PAYMENT",
    speakerSpotlightTitle: "CYBORG KEYNOTE PIONEERS",
    speakerSpotlightSub: "World-leading neural engineers, roboticists, and cybernetic researchers",
    analyticsTitle: "ORGANIZER LIVE ANALYTICS",
    analyticsSub: "Real-time attendee engagement metrics and revenue tracking",
    realtimeChatTitle: "CYBORG NETWORK CHAT",
    socialShareTitle: "SPREAD THE CYBORG WAVE",
    pushNotificationsTitle: "LIVE SCHEDULE ALERTS",
    languageSelect: "Language",
    liveStatus: "CYBORG CORE ONLINE",
    totalRegistrations: "Total Registrations",
    revenueGenerated: "Revenue Generated",
    activeAttendees: "Active Cyber Attendees",
    downloadTicket: "Download Digital Badge",
    paymentSuccess: "Transaction Authorized Successfully",
    fullNameLabel: "Full Name",
    emailLabel: "Email Address",
    collegeLabel: "Institute / College",
    phoneLabel: "Phone Number",
    selectEventsLabel: "Select Flagship Events"
  },
  hi: {
    eventTitle: "टेकफेस्ट आईआईटी बॉम्बे",
    subtitle: "साइबॉर्ग संस्करण 2026",
    tagline: "एशिया का प्रमुख विज्ञान और प्रौद्योगिकी महोत्सव · मानव संवर्धन और रोबोटिक्स",
    navHome: "मुख्य",
    navSchedule: "कार्यक्रम",
    navSpeakers: "वक्ता",
    navRegister: "पंजीकरण",
    navChat: "लाइव चैट",
    navAnalytics: "विश्लेषण",
    navPasses: "पास",
    countdownDays: "दिन",
    countdownHours: "घंटे",
    countdownMinutes: "मिनट",
    countdownSeconds: "सेकंड",
    registerNow: "पास प्राप्त करें",
    explorePasses: "पास देखें",
    passSelection: "अपना एक्सेस स्तर चुनें",
    cyberPassTitle: "साइबर पास",
    vipMechPassTitle: "वीआईपी मेच पास",
    hackathonPassTitle: "हैकाथॉन पास",
    studentPassTitle: "छात्र पास",
    checkoutButton: "सुरक्षित भुगतान करें",
    speakerSpotlightTitle: "साइबॉर्ग प्रमुख वक्ता",
    speakerSpotlightSub: "विश्व प्रसिद्ध न्यूरल इंजीनियर और रोबोटिक्स विशेषज्ञ",
    analyticsTitle: "आयोजक लाइव विश्लेषण",
    analyticsSub: "वास्तविक समय प्रतिभागी आंकड़े और राजस्व ट्रैकिंग",
    realtimeChatTitle: "साइबॉर्ग नेटवर्क चैट",
    socialShareTitle: "इवेंट शेयर करें",
    pushNotificationsTitle: "लाइव अपडेट अलर्ट",
    languageSelect: "भाषा",
    liveStatus: "साइबॉर्ग कोर ऑनलाइन",
    totalRegistrations: "कुल पंजीकरण",
    revenueGenerated: "कुल आय",
    activeAttendees: "सक्रिय प्रतिभागी",
    downloadTicket: "डिजिटल बैज डाउनलोड करें",
    paymentSuccess: "भुगतान सफलतापूर्वक अधिकृत",
    fullNameLabel: "पूरा नाम",
    emailLabel: "ईमेल पता",
    collegeLabel: "कॉलेज / संस्थान",
    phoneLabel: "फ़ोन नंबर",
    selectEventsLabel: "प्रमुख कार्यक्रम चुनें"
  },
  mr: {
    eventTitle: "टेकफेस्ट आयआयटी बॉम्बे",
    subtitle: "सायबॉर्ग आवृत्ती २०२६",
    tagline: "आशियातील सर्वात मोठा विज्ञान आणि तंत्रज्ञान महोत्सव",
    navHome: "मुख्य",
    navSchedule: "वेळापत्रक",
    navSpeakers: "वक्ते",
    navRegister: "नोंदणी",
    navChat: "लाइव्ह चॅट",
    navAnalytics: "विश्लेषण",
    navPasses: "पास",
    countdownDays: "दिवस",
    countdownHours: "तास",
    countdownMinutes: "मिनिटे",
    countdownSeconds: "सेकंद",
    registerNow: "पास मिळवा",
    explorePasses: "पास पहा",
    passSelection: "तुमचा पास निवडा",
    cyberPassTitle: "सायबर पास",
    vipMechPassTitle: "व्हीआयपी मेक पास",
    hackathonPassTitle: "हॅकाथॉन पास",
    studentPassTitle: "विद्यार्थी पास",
    checkoutButton: "सुरक्षित पेमेंट करा",
    speakerSpotlightTitle: "सायबॉर्ग प्रमुख वक्ते",
    speakerSpotlightSub: "जगातील अग्रगण्य रोबोटिक्स तज्ञ",
    analyticsTitle: "लाइव्ह विश्लेषण डॅशबोर्ड",
    analyticsSub: "रिअल-टाइम आकडेवारी आणि ट्रॅकिंग",
    realtimeChatTitle: "सायबॉर्ग नेटवर्क चॅट",
    socialShareTitle: "इव्हेंट शेअर करा",
    pushNotificationsTitle: "वेळापत्रक अपडेट्स",
    languageSelect: "भाषा",
    liveStatus: "सायबॉर्ग कोर ऑनलाइन",
    totalRegistrations: "एकूण नोंदणी",
    revenueGenerated: "एकूण महसूल",
    activeAttendees: "सक्रिय उपस्थित",
    downloadTicket: "डिजिटल बॅज डाउनलोड करा",
    paymentSuccess: "पेमेंट यशस्वी झाले",
    fullNameLabel: "पूर्ण नाव",
    emailLabel: "ईमेल पत्ता",
    collegeLabel: "कॉलेज / संस्था",
    phoneLabel: "फोन नंबर",
    selectEventsLabel: "कार्यक्रम निवडा"
  },
  ja: {
    eventTitle: "テックフェスト IIT ボンベイ",
    subtitle: "サイボーグ・エディション 2026",
    tagline: "アジア最大の科学技術フェスティバル · 人体拡張と自律型メカトロニクス",
    navHome: "ホーム",
    navSchedule: "スケジュール",
    navSpeakers: "スピーカー",
    navRegister: "登録",
    navChat: "チャット",
    navAnalytics: "分析",
    navPasses: "チケット",
    countdownDays: "日",
    countdownHours: "時間",
    countdownMinutes: "分",
    countdownSeconds: "秒",
    registerNow: "今すぐ登録",
    explorePasses: "チケット一覧",
    passSelection: "パスタイプを選択",
    cyberPassTitle: "サイバーパス",
    vipMechPassTitle: "VIPメカパス",
    hackathonPassTitle: "ハッカソンパス",
    studentPassTitle: "学割パス",
    checkoutButton: "安全な決済に進む",
    speakerSpotlightTitle: "サイボーグ基調講演者",
    speakerSpotlightSub: "世界をリードする神経工学者とロボティクス研究者",
    analyticsTitle: "リアルタイム分析ダッシュボード",
    analyticsSub: "参加者データおよび収益メトリクス",
    realtimeChatTitle: "サイボーグネットワークチャット",
    socialShareTitle: "イベントをシェア",
    pushNotificationsTitle: "リアルタイム通知",
    languageSelect: "言語",
    liveStatus: "サイボーグコア オンライン",
    totalRegistrations: "総登録数",
    revenueGenerated: "総売上高",
    activeAttendees: "アクティブ参加者",
    downloadTicket: "デジタルバッジをダウンロード",
    paymentSuccess: "決済が承認されました",
    fullNameLabel: "氏名",
    emailLabel: "メールアドレス",
    collegeLabel: "所属大学・機関",
    phoneLabel: "電話番号",
    selectEventsLabel: "参加イベントを選択"
  },
  de: {
    eventTitle: "TECHFEST IIT BOMBAY",
    subtitle: "CYBORG EDITION 2026",
    tagline: "Asiens führendes Festival für Wissenschaft & Technologie · Menschliche Augmentation & Robotik",
    navHome: "Home",
    navSchedule: "Zeitplan",
    navSpeakers: "Sprecher",
    navRegister: "Registrieren",
    navChat: "Cyber Chat",
    navAnalytics: "Analysen",
    navPasses: "Tickets",
    countdownDays: "TAGE",
    countdownHours: "STUNDEN",
    countdownMinutes: "MIN",
    countdownSeconds: "SEK",
    registerNow: "TICKET SICHERN",
    explorePasses: "PREISE ANSEHEN",
    passSelection: "Wählen Sie Ihre Zugangsstufe",
    cyberPassTitle: "Cyber Pass",
    vipMechPassTitle: "VIP Mech Pass",
    hackathonPassTitle: "Hackathon Pass",
    studentPassTitle: "Student Pass",
    checkoutButton: "ZUR SICHEREN ZAHLUNG",
    speakerSpotlightTitle: "CYBORG KEYNOTE PIONIERE",
    speakerSpotlightSub: "Weltweit führende Neuroingenieure und Robotikforscher",
    analyticsTitle: "LIVE ORGANISATOR ANALYTICS",
    analyticsSub: "Echtzeit-Teilnehmerstatistiken und Umsatzverfolgung",
    realtimeChatTitle: "CYBORG NETZWERK CHAT",
    socialShareTitle: "EVENT TEILEN",
    pushNotificationsTitle: "ECHTZEIT UPDATES",
    languageSelect: "Sprache",
    liveStatus: "CYBORG CORE ONLINE",
    totalRegistrations: "Gesamte Registrierungen",
    revenueGenerated: "Generierter Umsatz",
    activeAttendees: "Aktive Teilnehmer",
    downloadTicket: "Digitales Ticket herunterladen",
    paymentSuccess: "Zahlung erfolgreich autorisiert",
    fullNameLabel: "Vollständiger Name",
    emailLabel: "E-Mail-Adresse",
    collegeLabel: "Hochschule / Hochschule",
    phoneLabel: "Telefonnummer",
    selectEventsLabel: "Events auswählen"
  },
  es: {
    eventTitle: "TECHFEST IIT BOMBAY",
    subtitle: "EDICIÓN CYBORG 2026",
    tagline: "El festival de ciencia y tecnología líder en Asia · Aumento Humano y Mecatrónica",
    navHome: "Inicio",
    navSchedule: "Programa",
    navSpeakers: "Oradores",
    navRegister: "Registro",
    navChat: "Cyber Chat",
    navAnalytics: "Análisis",
    navPasses: "Pases",
    countdownDays: "DÍAS",
    countdownHours: "HORAS",
    countdownMinutes: "MINS",
    countdownSeconds: "SEGS",
    registerNow: "OBTENER PASE",
    explorePasses: "VER PASES",
    passSelection: "Seleccione su nivel de acceso",
    cyberPassTitle: "Pase Cyborg",
    vipMechPassTitle: "Pase VIP Mech",
    hackathonPassTitle: "Pase Hackathon",
    studentPassTitle: "Pase Estudiante",
    checkoutButton: "PROCEDER AL PAGO SEGURO",
    speakerSpotlightTitle: "PIONEROS CYBORG",
    speakerSpotlightSub: "Líderes mundiales en neuroingeniería y robótica",
    analyticsTitle: "PANEL DE ANÁLISIS EN VIVO",
    analyticsSub: "Métricas de asistencia en tiempo real y seguimiento de ingresos",
    realtimeChatTitle: "CHAT DE RED CYBORG",
    socialShareTitle: "COMPARTIR EVENTO",
    pushNotificationsTitle: "ALERTAS DE HORARIO",
    languageSelect: "Idioma",
    liveStatus: "NÚCLEO CYBORG EN LÍNEA",
    totalRegistrations: "Registros Totales",
    revenueGenerated: "Ingresos Generados",
    activeAttendees: "Asistentes Activos",
    downloadTicket: "Descargar Insignia Digital",
    paymentSuccess: "Transacción autorizada con éxito",
    fullNameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    collegeLabel: "Universidad / Instituto",
    phoneLabel: "Teléfono",
    selectEventsLabel: "Seleccionar Eventos"
  }
};
