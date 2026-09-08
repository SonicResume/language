import express from "express";
import cors from "cors";
import multer from "multer";
import PQueue from "p-queue";
import path from "path";
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
import rateLimit from "express-rate-limit";

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

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

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

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

const cache = new Map();

/* ---------------- CÉLINE API ---------------- */

const CELINE_API =
  process.env.CELINE_API_URL ||
  "https://api.justiceoncall.ca";

const CELINE_TRANSLATE_ENDPOINT =
  `${CELINE_API}/api/generate`;

/* ---------------- NORMALIZERS ---------------- */

function normalizeTool(tool) {
  const t = String(tool || "").toLowerCase();

  if (t.includes("translate")) return "translate";
  if (t.includes("rewrite")) return "rewrite";
  if (t.includes("expand")) return "expand";
  if (t.includes("summarize")) return "summarize";
  if (t.includes("grammar")) return "grammar";
  if (t.includes("tone")) return "tone";

  return "translate";
}

function normalizeContentType(type) {
  const map = {
    "product description (sales)": "high-converting product description",
    "ad copy (fb & tiktok)": "viral ad copy for facebook and tiktok",
    "instagram caption": "engaging instagram caption",
    "seo product text": "seo-optimized product content",
    "brand story (about us)": "brand story for about page"
  };

  return (
    map[String(type || "").toLowerCase()] ||
    "marketing content"
  );
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
    korean: "Korean",
    english: "English",
    dutch: "Dutch",
    arabic: "Arabic",
    russian: "Russian",
    ukrainian: "Ukrainian",
    polish: "Polish",
    swedish: "Swedish",
    norwegian: "Norwegian",
    danish: "Danish",
    finnish: "Finnish",
    greek: "Greek",
    hebrew: "Hebrew",
    hindi: "Hindi",
    bengali: "Bengali",
    urdu: "Urdu",
    tamil: "Tamil",
    telugu: "Telugu",
    vietnamese: "Vietnamese",
    thai: "Thai",
    turkish: "Turkish",
    indonesian: "Indonesian",
    malay: "Malay",
    filipino: "Filipino",
    swahili: "Swahili",
    romanian: "Romanian",
    czech: "Czech",
    slovak: "Slovak",
    hungarian: "Hungarian",
    bulgarian: "Bulgarian",
    icelandic: "Icelandic",
    irish: "Irish",
    maltese: "Maltese",
    persian: "Persian",
    nepali: "Nepali",
    sinhala: "Sinhala",
    lao: "Lao",
    burmese: "Burmese",
    afrikaans: "Afrikaans",
    albanian: "Albanian"
  };

  return (
    map[String(language || "").toLowerCase()] ||
    language ||
    "Spanish"
  );
}

/* ---------------- CÉLINE ---------------- */

async function runCeline(text, language) {
  try {
    const response = await axios.post(
      CELINE_TRANSLATE_ENDPOINT,
      {
        model: process.env.CELINE_MODEL,
        prompt: `Translate the following text into ${language}. Return only the translation, with no explanation:\n\n${text}`,
        stream: false
      },
      {
        timeout: 120000,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data?.response;

    if (
      typeof result !== "string" ||
      !result.trim()
    ) {
      throw new Error(
        "Céline returned an empty translation."
      );
    }

    return result.trim();
  } catch (error) {
    const details =
      error.response
        ? JSON.stringify(error.response.data)
        : error.message;

    throw new Error(
      `Céline API error: ${details}`
    );
  }
}
/* ---------------- FILE READER ---------------- */

async function readFile(file) {
  const ext =
    path.extname(file.originalname).toLowerCase();

  if (
    [".txt", ".md", ".csv", ".json"].includes(ext)
  ) {
    const text =
      await fs.promises.readFile(
        file.path,
        "utf8"
      );

    await fs.promises.unlink(file.path);

    return text;
  }

  if (ext === ".pdf") {
    const dataBuffer =
      fs.readFileSync(file.path);

    const data =
      await pdf(dataBuffer);

    await fs.promises.unlink(file.path);

    return data.text;
  }

  if (ext === ".docx") {
    const data =
      await mammoth.extractRawText({
        path: file.path
      });

    await fs.promises.unlink(file.path);

    return data.value;
  }

  throw new Error("Unsupported file type");
}

/* ---------------- PROCESS TEXT ---------------- */

async function processText(
  text,
  tool,
  contentType,
  language,
  tone
) {
  const normalizedTool =
    normalizeTool(tool);

  const normalizedLanguage =
    normalizeLanguage(language);

  if (normalizedTool === "translate") {
    const cacheKey =
      `celine:${normalizedLanguage}:${text}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result =
      await queue.add(() =>
        runCeline(
          text,
          normalizedLanguage
        )
      );

    cache.set(cacheKey, result);

    return result;
  }

  throw new Error(
    "Only translation through Céline is enabled."
  );
}

/* ---------------- HEALTH ---------------- */

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      engine: "Céline",
      status: "Synchronized",
      celine: CELINE_API
    });
  }
);

/* ---------------- TRANSLATE ---------------- */

app.post(
  "/api/translate",
  limiter,
  async (req, res) => {
    try {
      const {
        text,
        lang,
        language
      } = req.body;

      if (
        typeof text !== "string" ||
        !text.trim()
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Missing required text input."
        });
      }

      const targetLanguage =
        normalizeLanguage(
          language || lang
        );

      const output =
        await runCeline(
          text,
          targetLanguage
        );

      res.json({
        success: true,
        result: output,
        translatedText: output,
        text: output,
        language: targetLanguage,
        engine: "Céline",
        api: CELINE_API
      });
    } catch (error) {
      console.error(
        "Céline translation error:",
        error
      );

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/* ---------------- GENERAL PROCESS ---------------- */

app.post(
  "/api/process",
  limiter,
  async (req, res) => {
    try {
      const {
        text,
        tool,
        contentType,
        language,
        tone
      } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          error:
            "Missing required text input variable."
        });
      }

      const output =
        await processText(
          text,
          tool,
          contentType,
          language,
          tone
        );

      res.json({
        success: true,
        result: output
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/* ---------------- FILE UPLOAD ---------------- */

app.post(
  "/api/upload",
  limiter,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded."
        });
      }

      const {
        tool,
        contentType,
        language,
        tone
      } = req.body;

      const extractedText =
        await readFile(req.file);

      const output =
        await processText(
          extractedText,
          tool,
          contentType,
          language,
          tone
        );

      res.json({
        success: true,
        result: output
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

/* ---------------- SERVER ---------------- */

const PORT =
  process.env.PORT || 3003;

app.listen(
  PORT,
  () => {
    console.log(
      `[CIE NODE INITIALIZED] API running on port ${PORT}`
    );

    console.log(
      `[CÉLINE] API: ${CELINE_API}`
    );

    console.log(
      `[CÉLINE] Translation endpoint: ${CELINE_TRANSLATE_ENDPOINT}`
    );
  }
);