import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange';

interface ThemeSettings {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  reducedMotion: boolean;
}

interface ThemeContextType {
  isDark: boolean;
  mode: ThemeMode;
  colorScheme: ColorScheme;
  reducedMotion: boolean;
  setMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setReducedMotion: (reduced: boolean) => void;
}

const defaultSettings: ThemeSettings = {
  mode: 'system',
  colorScheme: 'blue',
  reducedMotion: false
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const COLOR_SCHEMES: Record<ColorScheme, { light: string; dark: string }> = {
  blue: {
    light: 'from-blue-400 via-cyan-400 to-sky-500',
    dark: 'from-blue-950 via-slate-900 to-slate-950'
  },
  purple: {
    light: 'from-purple-400 via-fuchsia-400 to-pink-500',
    dark: 'from-purple-950 via-slate-900 to-slate-950'
  },
  green: {
    light: 'from-emerald-400 via-teal-400 to-cyan-500',
    dark: 'from-emerald-950 via-slate-900 to-slate-950'
  },
  orange: {
    light: 'from-orange-400 via-amber-400 to-yellow-500',
    dark: 'from-orange-950 via-slate-900 to-slate-950'
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved settings or use defaults
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('themeSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Track system dark mode preference
  const [systemDarkMode, setSystemDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Calculate if dark mode should be active
  const isDark = settings.mode === 'system' ? systemDarkMode : settings.mode === 'dark';

  // Update settings in localStorage and apply classes
  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    
    const root = document.documentElement;
    const body = document.body;
    
    // Apply dark mode class
    root.classList.toggle('dark', isDark);
    
    // Get current gradient classes
    const currentClasses = root.className.split(' ').filter(cls => 
      cls.startsWith('from-') || cls.startsWith('via-') || cls.startsWith('to-')
    );
    
    // Remove current gradient classes
    currentClasses.forEach(cls => {
      root.classList.remove(cls);
      body.classList.remove(cls);
    });
    
    // Add new color scheme classes
    const newClasses = (isDark 
      ? COLOR_SCHEMES[settings.colorScheme].dark 
      : COLOR_SCHEMES[settings.colorScheme].light
    ).split(' ');
    
    // Apply to both root and body for better coverage
    newClasses.forEach(cls => {
      root.classList.add(cls);
      body.classList.add(cls);
    });
    
    // Apply reduced motion preference
    root.classList.toggle('motion-reduce', settings.reducedMotion);
    
    // Update CSS custom properties for the theme
    root.style.setProperty('--theme-gradient', isDark 
      ? COLOR_SCHEMES[settings.colorScheme].dark
      : COLOR_SCHEMES[settings.colorScheme].light
    );
  }, [settings, isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Settings updater functions
  const setMode = (mode: ThemeMode) => 
    setSettings(prev => ({ ...prev, mode }));
    
  const setColorScheme = (colorScheme: ColorScheme) => 
    setSettings(prev => ({ ...prev, colorScheme }));
    
  const setReducedMotion = (reducedMotion: boolean) => 
    setSettings(prev => ({ ...prev, reducedMotion }));

  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme immediately to prevent flash
  useEffect(() => {
    try {
      // Apply initial theme
      document.documentElement.classList.toggle('dark', isDark);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize theme:', error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{
      isDark,
      mode: settings.mode,
      colorScheme: settings.colorScheme,
      reducedMotion: settings.reducedMotion,
      setMode,
      setColorScheme,
      setReducedMotion
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};