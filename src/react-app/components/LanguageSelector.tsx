interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-sky-800/80 mb-3">Translate to</h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language}
            type="button"
            onClick={() => onSelect(language)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-semibold transition-all border
              ${selectedLanguage === language 
                ? "bg-sky-600 border-sky-600 text-white shadow-sm" 
                : "bg-white border-sky-200/60 text-sky-800 hover:border-sky-400 hover:text-sky-950"
              }
            `}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}
