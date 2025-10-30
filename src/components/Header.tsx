import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md font-medium transition-colors ${
    isActive 
      ? 'bg-white/20 text-white' 
      : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`;

const Header: React.FC = () => {
  const { isDark, mode, setMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`
      sticky top-0 z-50 backdrop-blur-md
      ${isDark ? 'bg-gray-900/90' : 'bg-white/10'}
      transition-colors duration-300
    `}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <NavLink 
            to="/dashboard" 
            className="text-xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2"
            onClick={closeMenu}
          >
            <span className="animate-pulse">☀️</span>
            <span className="hidden xs:inline">Weather</span>
          </NavLink>
          
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
            </nav>
            
            <button
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
              className={`
                p-2 rounded-full 
                ${isDark 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white/20 hover:bg-white/30'
                }
                transition-all duration-300 ease-in-out
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/20
              `}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden px-4 pb-4 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 flex flex-col gap-1">
              <NavLink 
                to="/" 
                className={linkClass} 
                end
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={linkClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/about" 
                className={linkClass}
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink 
                to="/settings" 
                className={linkClass}
                onClick={closeMenu}
              >
                Settings
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
