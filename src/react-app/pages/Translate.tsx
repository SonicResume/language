import { useState } from "react";

const languages = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "es", flag: "🇪🇸", name: "Spanish" },
  { code: "fr", flag: "🇫🇷", name: "French" },
  { code: "de", flag: "🇩🇪", name: "German" },
  { code: "it", flag: "🇮🇹", name: "Italian" },
  { code: "pt", flag: "🇵🇹", name: "Portuguese" },
  { code: "ja", flag: "🇯🇵", name: "Japanese" },
  { code: "zh", flag: "🇨🇳", name: "Chinese" },
  { code: "ko", flag: "🇰🇷", name: "Korean" },
];

export default function Translate() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("es");
  const [loading, setLoading] = useState(false);

const translate = async () => {
  if (!text.trim()) return;

  setLoading(true);

  try {
    const targetLanguage =
      languages.find((l) => l.code === lang)?.name || "English";

    const res = await fetch(
      "https://my-backend-1-qdhh.onrender.com/api/ai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          tool: "translate",
          language: targetLanguage,
          contentType: "translation",
          email: "guest",
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error code status: ${res.status}`);
    }

    const data = await res.json();

    console.log("Translation response:", data);

    setOutput(
      data.translation ||
      data.result ||
      data.translatedText ||
      data.text ||
      ""
    );
  } catch (err) {
    console.error("Translation error:", err);
    setOutput("Translation failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold text-green-700 mb-4">
          🌍 Translate
        </h1>

        {/* FLAGS */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`border rounded p-2 ${
                lang === l.code ? "bg-green-200" : ""
              }`}
            >
              <div className="text-xl">{l.flag}</div>
              <div className="text-xs">{l.name}</div>
            </button>
          ))}
        </div>

        {/* INPUT */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text..."
          className="w-full h-32 border p-3 rounded mb-3"
        />

        {/* BUTTON */}
        <button
          onClick={translate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {/* OUTPUT */}
        <div className="mt-4 p-3 border rounded min-h-[80px]">
          {output}
        </div>
      </div>
    </div>
  );
}