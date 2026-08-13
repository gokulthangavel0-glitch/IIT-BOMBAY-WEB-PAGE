import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      event: "Techfest IIT Bombay: Cyborg Edition 2026",
      systemVersion: "v4.0.2-CYBORG"
    });
  });

  // Payment Processing Simulation Endpoint
  app.post("/api/payment/create-order", (req, res) => {
    const { passType, amount, currency = "INR", participantEmail } = req.body;
    
    if (!passType || !amount) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const orderId = "ORD_TECH_" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const paymentToken = "PAY_TOKEN_" + Date.now() + "_" + Math.floor(Math.random() * 10000);

    res.json({
      success: true,
      orderId,
      amount,
      currency,
      passType,
      participantEmail,
      paymentToken,
      gateway: "Techfest CyberPay / Razorpay Gateway",
      createdAt: new Date().toISOString()
    });
  });

  // Automated Email Notification Route (Simulated Dispatch)
  app.post("/api/email/send-confirmation", (req, res) => {
    const { fullName, email, passType, transactionId, events } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ error: "Email and Name are required" });
    }

    // Return receipt preview and confirmation payload
    res.json({
      success: true,
      emailSent: true,
      recipient: email,
      subject: `⚡ Registration Confirmed: Techfest IIT Bombay 2026 [${passType}]`,
      message: `Greetings Cyber-Pioneer ${fullName}! Your pass [${passType}] is registered under TXN #${transactionId}. Get ready for Techfest IIT Bombay Cyborg Edition.`,
      digitalBadgeUrl: `https://techfest.org/badge/${transactionId}`,
      timestamp: new Date().toISOString()
    });
  });

  // Gemini AI Cyborg Assistant API Endpoint
  app.post("/api/ai/cyborg-assistant", async (req, res) => {
    try {
      const { prompt, language = "en", history = [] } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          reply: `[CYBORG SYSTEM ONLINE - DEMO MODE] Techfest IIT Bombay features 50+ robotic competitions, international keynotes, and futuristic exhibitions. Ask about workshops, schedule, or pass tiers! (Language: ${language})`
        });
      }

      const systemInstruction = `You are "CYBORG-X", the official autonomous AI assistant for Techfest IIT Bombay (Asia's largest science and technology festival). 
      Your tone is futuristic, precise, encouraging, and tech-focused with cyborg terminology.
      Answer queries about event schedules, registration pass tiers (Cyber Pass ₹499, VIP Mech Pass ₹1299, Hackathon Pass ₹799), competition rules, venue directions at IIT Bombay campus, accommodations, and speaker lineups.
      Respond concisely in the requested language: ${language}.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        reply: response.text || "CYBORG-X matrix re-calibrating. Please query again."
      });
    } catch (err: any) {
      console.error("Gemini Assistant Error:", err);
      res.status(500).json({
        error: "AI Matrix offline",
        reply: "CYBORG-X neural link temporarily disrupted. Please refer to the schedule timeline or contact techfest support."
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Techfest Cyborg Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
