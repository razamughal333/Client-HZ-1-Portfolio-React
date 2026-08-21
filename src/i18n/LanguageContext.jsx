import { useEffect, useState } from "react";
import LanguageContext from "./languageContextObject";
import { getTranslations } from "./translations";

const STORAGE_KEY = "hz-portfolio-lang";

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "ur" || saved === "en" ? saved : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const t = getTranslations(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, t.dir]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ur" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRtl: t.dir === "rtl" }}>
      {children}
    </LanguageContext.Provider>
  );
}
