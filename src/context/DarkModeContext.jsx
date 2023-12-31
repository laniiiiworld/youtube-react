import { createContext, useContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDarkMode =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && //
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode);
    updateDarkMode(isDarkMode);
  }, []);

  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

export const useDarkMode = () => useContext(DarkModeContext);

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}
