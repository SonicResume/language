import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Map as MapIcon, ArrowRight } from "lucide-react";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = "/world.geojson";

const languageNames: Record<string, string> = {
  af: "Afrikaans", sq: "Albanian", ar: "Arabic", bn: "Bengali", bg: "Bulgarian",
  zh: "Chinese", cs: "Czech", de: "German", da: "Danish", es: "Spanish",
  fi: "Finnish", fr: "French", el: "Greek", hu: "Hungarian", id: "Indonesian",
  ga: "Irish", he: "Hebrew", hi: "Hindi", fa: "Persian", is: "Icelandic",
  it: "Italian", ja: "Japanese", sw: "Swahili", ko: "Korean", lo: "Lao",
  si: "Sinhala", my: "Burmese", mt: "Maltese", ms: "Malay", nl: "Dutch",
  no: "Norwegian", ne: "Nepali", ur: "Urdu", tl: "Filipino", pl: "Polish",
  pt: "Portuguese", ro: "Romanian", ru: "Russian", sv: "Swedish", sk: "Slovak",
  th: "Thai", tr: "Turkish", uk: "Ukrainian", en: "English", vi: "Vietnamese"
};

const countryMap: Record<string, string> = {
  "South Africa": "af", "Albania": "sq", "Saudi Arabia": "ar", "Bangladesh": "bn",
  "Bulgaria": "bg", "China": "zh", "Czech Republic": "cs", "Germany": "de",
  "Denmark": "da", "Spain": "es", "Finland": "fi", "France": "fr", "Greece": "el",
  "Hungary": "hu", "Indonesia": "id", "Ireland": "ga", "Israel": "he", "India": "hi",
  "Iran": "fa", "Iceland": "is", "Italy": "it", "Japan": "ja", "Kenya": "sw",
  "South Korea": "ko", "Laos": "lo", "Sri Lanka": "si", "Myanmar": "my", "Malta": "mt",
  "Malaysia": "ms", "Netherlands": "nl", "Norway": "no", "Nepal": "ne", "Pakistan": "ur",
  "Philippines": "tl", "Poland": "pl", "Portugal": "pt", "Romania": "ro", "Russia": "ru",
  "Sweden": "sv", "Slovakia": "sk", "Thailand": "th", "Turkey": "tr", "Ukraine": "uk",
  "United States": "en", "United States of America": "en", "Vietnam": "vi"
};

const WorldMap = memo(({ onCountrySelect, currentSelection }: { 
  onCountrySelect: (name: string) => void; 
  currentSelection: string;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-emerald-50/30 border max-h-[300px] flex items-center justify-center">
      <ComposableMap className="w-full h-full object-contain max-h-[300px]">
        <Geographies geography={geoUrl}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
              const props = geo.properties || {};
              const name = props.ADMIN || props.admin || props.NAME || props.name || props.name_long;

              if (!name) return null;
              const isSelected = currentSelection === name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onCountrySelect(name)}
                  style={{
                    default: { 
                      fill: isSelected ? "#059669" : "#d1fae5", 
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "fill 150ms ease"
                    },
                    hover: { fill: "#10b981", outline: "none", cursor: "pointer" },
                    pressed: { fill: "#047857", outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
});
WorldMap.displayName = "WorldMap";

export default function KidsGlobalPage() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [displayLanguage, setDisplayLanguage] = useState("");

  // 🚀 INTERACTIVE EXPLORER LOCK: Clicking only highlights the map, shows details, and prevents jumping pages instantly
  const handleCountrySelect = useCallback((name: string) => {
    setSelectedCountry(name);
    const code = countryMap[name] || "en";
    setSelectedLanguage(code);
    setDisplayLanguage(languageNames[code] || "Unknown Language");
  }, []);

  const handleProceedToWorkspace = () => {
    const targetCountry = selectedCountry || "United States";
    navigate(`/workspace?lang=${selectedLanguage}&country=${encodeURIComponent(targetCountry)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 p-4 sm:p-6 text-slate-900 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-4">
        
        <div className="border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-700 flex items-center gap-2">
              <MapIcon size={24} /> Step 1: Explore World Geography
            </h1>
            <p className="text-xs text-slate-500 mt-1">Click any country boundary on the map layers to explore its parameters.</p>
          </div>
          <button
            type="button"
            onClick={handleProceedToWorkspace}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-md text-sm sm:text-base"
          >
            Open Workspace <ArrowRight size={16} />
          </button>
        </div>

        {/* GEOGRAPHY PROFILE DISPLAY BANNER */}
        <div className="bg-emerald-600 text-white rounded-xl shadow p-4 text-center border border-emerald-700">
          <h2 className="text-base sm:text-lg font-bold tracking-wide">
            📍 Country Name: {selectedCountry || "Click a country to reveal..."}
          </h2>
          {displayLanguage && (
            <p className="text-xs sm:text-sm font-medium mt-1 bg-emerald-700/50 inline-block px-3 py-1 rounded-full">
              🗣️ Primary Native Language: <strong>{displayLanguage}</strong>
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <WorldMap onCountrySelect={handleCountrySelect} currentSelection={selectedCountry} />
        </div>

      </div>
    </div>
  );
}
