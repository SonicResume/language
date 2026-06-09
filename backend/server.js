import express from "express";
import cors from "cors";
import multer from "multer";
import PQueue from "p-queue";
import path from "path";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Stripe from "stripe";
import axios from "axios";
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import mammoth from "mammoth";
import { createRequire } from "module";

const OUTPUT_LOCK = `
IMPORTANT OUTPUT RULES:
- Output plain text only
- Never use asterisks (*)
- Never use markdown formatting
- Never use bullets or symbols for structure
- No explanations, no headings, no commentary
`;

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const USERS_FILE = "./users.json";
let USERS = [];

if (fs.existsSync(USERS_FILE)) {
  USERS = JSON.parse(fs.readFileSync(USERS_FILE));
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const RESET = {};
const userCredits = {};

const queue = new PQueue({ concurrency: 2 });
const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 999
});

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Secure File Ingestion Configuration
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 }
});

const cache = new Map();

/* ---------------- OPERATIONAL INPUT NORMALIZERS ---------------- */

function normalizeTool(tool) {
  const t = String(tool || "").toLowerCase();
  if (t.includes("rewrite")) return "rewrite";
  if (t.includes("expand")) return "expand";
  if (t.includes("summarize")) return "summarize";
  if (t.includes("grammar")) return "grammar";
  if (t.includes("tone")) return "tone";
  if (t.includes("translate")) return "translate";
  return "rewrite";
}

function normalizeContentType(type) {
  const map = {
    "product description (sales)": "high-converting product description",
    "ad copy (fb & tiktok)": "viral ad copy for facebook and tiktok",
    "instagram caption": "engaging instagram caption",
    "seo product text": "seo-optimized product content",
    "brand story (about us)": "brand story for about page"
  };
  return map[String(type || "").toLowerCase()] || "marketing content";
}

function normalizeLanguage(language) {
  const map = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese",
    japanese: "Japanese",
    chinese: "Chinese",
    korean: "Korean"
  };
  return map[String(language || "").toLowerCase()] || "Spanish";
}

/* ---------------- MISTRAL CLOUD MODEL ROUTER ---------------- */
function pickModel(tool) {
  // 🧠 HEAVY CONTEXT / CREATIVE WRITING / ADVANCED REASONING -> MISTRAL LARGE
  if (tool === "rewrite" || tool === "expand" || tool === "tone" || tool === "translate") {
    return "mistral-large-latest";
  }
  // ✂️ SPEED / HIGH PRECISION TASKS -> MISTRAL SMALL
  if (tool === "grammar" || tool === "summarize") {
    return "mistral-small-latest";
  }
  // ⚡ FALLBACK
  return "mistral-small-latest";
}

/* ---------------- SYSTEM PROMPT CONSTRUCTORS ---------------- */
function buildPrompt(text, tool, contentType, language, tone) {
  if (tool === "translate") {
    return `You are a strict translator. Translate the following text into ${language || "Spanish"}.\n\nRules:\n- ONLY output the translated text\n- NO explanations\n- NO rewriting\n\nText:\n${text}`;
  }
  if (contentType.includes("product description")) {
    return `Rewrite this into a HIGH-CONVERTING product description.\n\nRules:\n- Focus on benefits over features\n- Make it persuasive and emotional\n- Use short punchy sentences\n- Increase desire and urgency\n\nText:\n${text}\n\nReturn only the final text.`;
  }
  if (contentType.includes("ad copy")) {
    return `Rewrite this into viral ad copy for Facebook and TikTok.\n\nRules:\n- Strong hook in first line\n- Short and punchy\n- High emotion\n- Include call to action\n\nText:\n${text}\n\nReturn only the ad copy.`;
  }
  if (contentType.includes("instagram")) {
    return `Rewrite this into an engaging Instagram caption.\n\nRules:\n- Conversational tone\n- Add storytelling\n- Include subtle CTA\n- Make it scroll-stopping\n\nText:\n${text}`;
  }
  if (contentType.includes("seo")) {
    return `Rewrite this into SEO-optimized product content.\n\nRules:\n- Include keywords naturally\n- Improve readability\n- Structure clearly\n- Still conversion-focused\n\nText:\n${text}`;
  }
  if (contentType.includes("brand story")) {
    return `Rewrite this into a compelling brand story.\n\nRules:\n- Emotional connection\n- Clear mission and values\n- Authentic tone\n- Inspire trust\n\nText:\n${text}`;
  }
  return `Rewrite this clearly and professionally:\n${text}`;
}

/* ---------------- MULTI-FORMAT FILE READER ---------------- */
async function readFile(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".txt", ".md", ".csv", ".json"].includes(ext)) {
    const text = await fs.promises.readFile(file.path, "utf8");
    await fs.unlink(file.path);
    return text;
  }
  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdf(dataBuffer);
    await fs.unlink(file.path);
    return data.text;
  }
  if (ext === ".docx") {
    const data = await mammoth.extractRawText({ path: file.path });
    await fs.unlink(file.path);
    return data.value;
  }
  throw new Error("Unsupported file type");
}
/* ---------------- MISTRAL CLOUD RUNTIME ENGINES ---------------- */

async function runMistralCloud(model, prompt) {
  if (!process.env.MISTRAL_API_KEY) {
    throw new Error("Missing MISTRAL_API_KEY environment variable assignment.");
  }

  try {
    // Dispatching secure requests straight to the Mistral Chat Completions Cloud endpoint
   const response = await axios.post(
  "https://api.mistral.ai/v1/chat/completions",
  {
    model: model,
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1500
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

    return response.data.choices?.[0]?.message?.content || "";
  } catch (error) {
    const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
    throw new Error(`Mistral Cloud Execution Exception: ${errorDetails}`);
  }
}

async function runModel(model, prompt) {
  try {
    // 🟢 Try Production Level Mistral AI Cloud Channels
    return await runMistralCloud(model, prompt);
  } catch (err) {
    console.log("❌ Mistral Cloud Request Fault:", err.message);
    return "AI cloud sub-services temporarily unavailable. Please verify API gateway authorizations and try again.";
  }
}

/* ---------------- DATA PIPELINE EXECUTION ---------------- */

async function processText(text, tool, contentType, language, tone) {
  const normalizedTool = normalizeTool(tool);
  const normalizedType = normalizeContentType(contentType);
  const normalizedLanguage = normalizeLanguage(language);

  const model = pickModel(normalizedTool);
  const prompt = buildPrompt(text, normalizedTool, normalizedType, normalizedLanguage, tone);

  const cacheKey = normalizedTool + normalizedType + text;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const result = await queue.add(() => runModel(model, prompt));
  cache.set(cacheKey, result);
  return result;
}

/* ---------------- API NETWORK ROUTING ---------------- */

/* DIAGNOSTIC HEALTH CHECK */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    engine: "Mistral AI Cloud Production Node",
    status: "Synchronized"
  });
});

/* ANALYTICAL DISCOVERY INTERFACE ENDPOINT */
app.post("/api/process", limiter, async (req, res) => {
  try {
    const { text, tool, contentType, language, tone } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Missing required text input variable." });
    }

    const output = await processText(text, tool, contentType, language, tone);
    res.json({ success: true, result: output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* INGESTION FILE STREAM INTERFACE ENDPOINT */
app.post("/api/upload", limiter, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No uncorrupted binary data asset discovered in multipart stream." });
    }

    const { tool, contentType, language, tone } = req.body;
    const extractedText = await readFile(req.file);
    const output = await processText(extractedText, tool, contentType, language, tone);

    res.json({ success: true, result: output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`[CIE NODE INITIALIZED]: Infrastructure routing active across gateway port ${PORT}`);
});


