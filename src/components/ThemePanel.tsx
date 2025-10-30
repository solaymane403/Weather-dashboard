import React from 'react';
import { Sun, Moon, Laptop, Palette, ZoomIn } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemePanel: React.FC = () => {
  const { 
    isDark, 
    mode, 
    colorScheme, 
    reducedMotion,
    setMode,
    setColorScheme,
    setReducedMotion
  } = useTheme();

  return (
    <div className="space-y-8">
      {/* Theme Mode Selection */}
      <div className="space-y-4">
        <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider">Theme Mode</h4>
        <div className="flex gap-3">
          <button
            onClick={() => setMode('light')}
            className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all border
              ${mode === 'light' 
                ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10 scale-105'
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
          >
            <Sun className="w-5 h-5" />
            <span className="font-medium">Light</span>
          </button>
          <button
            onClick={() => setMode('dark')}
            className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all border
              ${mode === 'dark'
                ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10 scale-105'
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
          >
            <Moon className="w-5 h-5" />
            <span className="font-medium">Dark</span>
          </button>
          <button
            onClick={() => setMode('system')}
            className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all border
              ${mode === 'system'
                ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10 scale-105'
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
          >
            <Laptop className="w-5 h-5" />
            <span className="font-medium">System</span>
          </button>
        </div>
      </div>

      {/* Color Scheme Selection */}
      <div className="space-y-4">
        <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Scheme
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { 
              name: 'blue' as const, 
              gradient: 'from-blue-400 via-cyan-400 to-sky-500',
              darkGradient: 'from-blue-950 via-slate-900 to-slate-950',
              icon: '🌊',
              label: 'Ocean Blue'
            },
            { 
              name: 'purple' as const, 
              gradient: 'from-purple-400 via-fuchsia-400 to-pink-500',
              darkGradient: 'from-purple-950 via-slate-900 to-slate-950',
              icon: '🌌',
              label: 'Cosmic Purple'
            },
            { 
              name: 'green' as const, 
              gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
              darkGradient: 'from-emerald-950 via-slate-900 to-slate-950',
              icon: '🌿',
              label: 'Forest Green'
            },
            { 
              name: 'orange' as const, 
              gradient: 'from-orange-400 via-amber-400 to-yellow-500',
              darkGradient: 'from-orange-950 via-slate-900 to-slate-950',
              icon: '🌅',
              label: 'Sunset Orange'
            }
          ] as const).map((scheme) => (
            <button
              key={scheme.name}
              onClick={() => setColorScheme(scheme.name)}
              className={`
                group relative px-4 py-4 rounded-xl capitalize transition-all border
                ${colorScheme === scheme.name
                  ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10 scale-105'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <div className={`absolute inset-0 opacity-20 rounded-xl bg-gradient-to-br ${isDark ? scheme.darkGradient : scheme.gradient}`} />
              <div className="relative flex flex-col items-center gap-2">
                <span className="text-2xl" role="img" aria-label={scheme.label}>{scheme.icon}</span>
                <span className="font-medium">{scheme.label}</span>
                {colorScheme === scheme.name && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reduced Motion Toggle */}
      <div className="space-y-4">
        <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
          <ZoomIn className="w-4 h-4" />
          Animation Preferences
        </h4>
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className={`
            group w-full px-6 py-4 rounded-xl transition-all border flex items-center justify-between
            ${reducedMotion
              ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
              : 'bg-white text-gray-900 border-white shadow-lg shadow-white/10'
            }
          `}
        >
          <span className="font-medium">{reducedMotion ? 'Reduced Motion' : 'Full Animations'}</span>
          <div className={`
            w-12 h-6 rounded-full p-1 transition-colors
            ${reducedMotion ? 'bg-white/20' : 'bg-gray-900'}
          `}>
            <div className={`
              w-4 h-4 rounded-full transition-all
              ${reducedMotion ? 'bg-white translate-x-0' : 'bg-white translate-x-6'}
            `}/>
          </div>
        </button>
      </div>

      {/* Current Theme Display */}
      <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-sm text-white/70">
        <div className="flex items-center justify-between">
          <span>Current Theme</span>
          <span className="font-medium text-white">{mode === 'system' ? `System (${isDark ? 'Dark' : 'Light'})` : mode}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Color Scheme</span>
          <span className="font-medium text-white capitalize">{colorScheme}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Animations</span>
          <span className="font-medium text-white">{reducedMotion ? 'Reduced' : 'Full'}</span>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;