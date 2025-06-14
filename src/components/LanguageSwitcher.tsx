
import { useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg hover:bg-black/30 transition-all duration-200"
      >
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="text-sm font-medium text-white">{currentLang.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg overflow-hidden z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-yellow-500/20 transition-colors ${
                currentLanguage === language.code ? 'bg-yellow-500/10' : ''
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="text-sm font-medium text-white">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
