
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg">
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="text-sm font-medium text-white">{currentLang.code.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
