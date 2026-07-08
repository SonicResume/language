import { useState, useEffect, memo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// 🛠️ FIXED: Added missing Copy and Check icons to the imports list
import { Mic, Volume2, ArrowLeft, Copy, Check } from "lucide-react";
import { toBraille } from "@/utils/braille";

const languagesList = [
  { code: "sq", flag: "🇦🇱", name: "Albanian" }, { code: "bn", flag: "🇧🇩", name: "Bengali" },
  { code: "bg", flag: "🇧🇬", name: "Bulgarian" }, { code: "zh", flag: "🇨🇳", name: "Chinese" },
  { code: "cs", flag: "🇨🇿", name: "Czech" }, { code: "de", flag: "🇩🇪", name: "German" },
  { code: "da", flag: "🇩🇰", name: "Danish" }, { code: "es", flag: "🇪🇸", name: "Spanish" },
  { code: "fi", flag: "🇫🇮", name: "Finnish" }, { code: "fr", flag: "🇫🇷", name: "French" },
  { code: "el", flag: "🇬🇷", name: "Greek" }, { code: "hu", flag: "🇭🇺", name: "Hungarian" },
  { code: "id", flag: "🇮🇩", name: "Indonesian" }, { code: "ga", flag: "🇮🇪", name: "Irish" },
  { code: "he", flag: "🇮🇱", name: "Hebrew" }, { code: "hi", flag: "🇮🇳", name: "Hindi" },
  { code: "te", flag: "🇮🇳", name: "Telugu" }, { code: "fa", flag: "🇮🇷", name: "Persian" },
  { code: "is", flag: "🇮🇸", name: "Icelandic" }, { code: "it", flag: "🇮🇹", name: "Italian" },
  { code: "ja", flag: "🇯🇵", name: "Japanese" }, { code: "sw", flag: "🇰🇪", name: "Swahili" },
  { code: "ko", flag: "🇰🇷", name: "Korean" }, { code: "lo", flag: "🇱🇦", name: "Lao" },
  { code: "si", flag: "🇱🇰", name: "Sinhala" }, { code: "ta", flag: "🇱🇰", name: "Tamil" },
  { code: "my", flag: "🇲🇲", name: "Burmese" }, { code: "mt", flag: "🇲🇹", name: "Maltese" },
  { code: "ms", flag: "🇲🇾", name: "Malay" }, { code: "nl", flag: "🇳🇱", name: "Dutch" },
  { code: "no", flag: "🇳🇴", name: "Norwegian" }, { code: "ne", flag: "🇳🇵", name: "Nepali" },
  { code: "ur", flag: "🇵🇰", name: "Urdu" }, { code: "tl", flag: "🇵🇭", name: "Filipino" },
  { code: "pl", flag: "🇵🇱", name: "Polish" }, { code: "pt", flag: "🇵🇹", name: "Portuguese" },
  { code: "ro", flag: "🇷🇴", name: "Romanian" }, { code: "ru", flag: "🇷🇺", name: "Russian" },
  { code: "ar", flag: "🇸🇦", name: "Arabic" }, { code: "sv", flag: "🇸🇪", name: "Swedish" },
  { code: "sk", flag: "🇸🇰", name: "Slovak" }, { code: "th", flag: "🇹🇭", name: "Thai" },
  { code: "tr", flag: "🇹🇷", name: "Turkish" }, { code: "uk", flag: "🇺🇦", name: "Ukrainian" },
  { code: "en", flag: "🇺🇸", name: "English" }, { code: "vi", flag: "🇻🇳", name: "Vietnamese" },
  { code: "af", flag: "🇿🇦", name: "Afrikaans" }
];

const WorkspaceLanguageGrid = memo(({ selectedLanguage, onLanguageSelect }: { selectedLanguage: string; onLanguageSelect: (code: string) => void }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2 max-h-[180px] overflow-y-auto p-1 border rounded-xl bg-slate-50/50">
      {languagesList.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onLanguageSelect(l.code)}
          className={`border rounded-lg p-1.5 text-center transition truncate ${
            selectedLanguage === l.code
              ? "bg-emerald-600 text-white border-emerald-700 shadow-md"
              : "bg-white hover:bg-emerald-50 text-slate-700"
          }`}
        >
          <div className="text-lg sm:text-xl">{l.flag}</div>
          <div className="text-[9px] sm:text-[10px] truncate">{l.name}</div>
        </button>
      ))}
    </div>
  );
});
WorkspaceLanguageGrid.displayName = "WorkspaceLanguageGrid";

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const lang = searchParams.get("lang");
  const country = searchParams.get("country");

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"translate" | "braille">("translate");
  const [loading, setLoading] = useState(false);
  
  // 🛠️ FIXED: Re-added missing state fields for the copy confirmation indicator
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (lang) setSelectedLanguage(lang);
    if (country) setSelectedCountry(decodeURIComponent(country));
  }, [lang, country]);

  const handleLanguageSelect = useCallback((code: string) => {
    setSelectedLanguage(code);
  }, []);

  const translateText = async (value: string, targetLang: string) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch(
        "https://my-backend-1-qdhh.onrender.com/api/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            text: value,
             lang: targetLang, 
          }),
        }
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error code status: ${res.status}`);
      }

      const data = await res.json();
      return data.translation || data.result || data.translatedText || data.text || value;
    } catch (err: any) {
      console.error("Translation error:", err);
      if (err.name === 'AbortError') {
        alert("⏱️ Server Sleep Cycle: The free tier on Render takes roughly 1 minute to boot up on the first connection call. Please tap the translation button once more!");
      } else {
        alert("❌ Request Failed: Unable to link with translation node.");
      }
      return value;
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!text.trim()) return;
    if (mode === "braille") {
      setOutput(toBraille(text));
    } else {
      const result = await translateText(text, selectedLanguage);
      setOutput(result);
    }
    setCopied(false);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("🎤 Voice input is not supported in this browser. Try Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript;
      if (transcript) setText(transcript);
    };
    recognition.start();
  };

  const playVoiceOutput = (sourceText: string) => {
    if (!sourceText.trim()) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(sourceText);
    
    if (mode === "translate") {
      const localeMap: Record<string, string> = {
        sq: "sq-AL", bn: "bn-BD", bg: "bg-BG", zh: "zh-CN", cs: "cs-CZ", 
        de: "de-DE", da: "da-DK", es: "es-ES", fi: "fi-FI", fr: "fr-FR", 
        el: "el-GR", hu: "hu-HU", id: "id-ID", ga: "ga-IE", he: "he-IL", 
        hi: "hi-IN", te: "te-IN", fa: "fa-IR", is: "is-IS", it: "it-IT", 
        ja: "ja-JP", sw: "sw-KE", ko: "ko-KR", lo: "lo-LA", si: "si-LK", 
        ta: "ta-LK", my: "my-MM", mt: "mt-MT", ms: "ms-MY", nl: "nl-NL", 
        no: "no-NO", ne: "ne-NP", ur: "ur-PK", tl: "fil-PH", pl: "pl-PL", 
        pt: "pt-PT", ro: "ro-RO", ru: "ru-RU", ar: "ar-SA", sv: "sv-SE", 
        sk: "sk-SK", th: "th-TH", tr: "tr-TR", uk: "uk-UA", vi: "vi-VN", 
        af: "af-ZA", en: "en-US"
      };
      utterance.lang = localeMap[selectedLanguage] || selectedLanguage || "en-US";
    } else {
      utterance.lang = "en-US";
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // 🛠️ FIXED: Re-added missing clipboard functional method block 
  const handleCopyToClipboard = async () => {
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 p-4 sm:p-6 text-slate-900 overflow-x-hidden">
      <div className="max-w-3xl mx-auto space-y-4">
        
        {/* SCREEN SWITCH HEADERS */}
        <div className="flex items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            {/* RESET BUTTON */}
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="p-2 bg-white hover:bg-slate-100 rounded-xl border shadow-sm text-slate-600 transition flex items-center justify-center"
              aria-label="Return to map page"
              title="Reset configuration and return to map"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">Noah Workspace</h1>
              <p className="text-xs text-slate-500">
                Active Profile Reference: <span className="font-semibold text-emerald-800 uppercase">{selectedLanguage}</span> ({selectedCountry})
              </p>
            </div>
          </div>
        </div>

               {/* FLAG CHOICE GRID PANEL */}
        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select or Switch Language (47 Flags)</h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">Supports 250 Locales via token override</span>
          </div>
          <WorkspaceLanguageGrid selectedLanguage={selectedLanguage} onLanguageSelect={handleLanguageSelect} />
        </div>

        {/* TEXT PROCESSOR CONTAINER */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
          {/* SWITCH NORMAL OR BRAILLE TABS */}
          <div className="flex gap-4 border-b pb-2">
            <button 
              type="button"
              onClick={() => setMode("translate")}
              className={`pb-2 px-2 sm:px-4 font-semibold text-sm sm:text-base ${mode === 'translate' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500'}`}
            >
              Normal Content Mode
            </button>
            <button 
              type="button"
              onClick={() => setMode("braille")}
              className={`pb-2 px-2 sm:px-4 font-semibold text-sm sm:text-base ${mode === 'braille' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500'}`}
            >
              Braille Mode
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Input Raw Text</label>
              {/* INPUT SPEAKER BUTTON */}
              <button
                type="button"
                disabled={!text.trim()}
                onClick={() => playVoiceOutput(text)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 font-medium disabled:opacity-40"
              >
                <Volume2 size={14} /> Read Input Out Loud
              </button>
            </div>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type text for evaluation..."
                className="w-full h-24 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm sm:text-base resize-none"
              />
              {/* MIC VOICE INPUT BUTTON */}
              <button 
                type="button"
                onClick={startVoiceInput}
                className="absolute right-3 bottom-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 shadow-sm"
                title="Voice input"
              >
                <Mic size={14} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleConvert}
              disabled={loading}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow text-sm sm:text-base disabled:opacity-50"
            >
              {loading ? "Processing..." : mode === "braille" ? "Convert to Braille" : "Translate Output"}
            </button>

            {/* OUTPUT SPEAKER BUTTON */}
            <button 
              type="button"
              onClick={() => playVoiceOutput(output)}
              disabled={!output.trim()}
              className="p-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full transition shadow-sm disabled:opacity-40 flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4"
              title="Listen output audio out loud"
            >
              <Volume2 size={18} />
              <span>Listen Output</span>
            </button>
          </div>

          {/* OUTPUT RESULT SECTION WITH INTEGRATED COPY INTERFACE */}
          {output && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 max-w-full overflow-x-auto relative group">
              <div className="flex justify-between items-center border-b pb-1.5 mb-2">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Result Output</p>
                
                {/* COPY RESULT BUTTON */}
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition shadow-sm ${
                    copied 
                      ? "bg-green-50 border-green-200 text-green-700" 
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                  title="Copy result data to clipboard"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Result"}</span>
                </button>
              </div>
              <p className={`whitespace-pre-wrap break-words ${mode === 'braille' ? 'text-3xl tracking-widest font-mono text-emerald-800' : 'text-base sm:text-lg'}`}>
                {output}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

