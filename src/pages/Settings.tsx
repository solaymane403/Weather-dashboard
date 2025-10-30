import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ThemePanel from '../components/ThemePanel';

const Settings: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/10 rounded-2xl">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white/90">Settings</h2>
          </div>

          <div className="space-y-12">
            {/* Theme Settings */}
            <section className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/5">
              <h3 className="text-2xl font-semibold text-white/90 mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-lg">🎨</span>
                Appearance
              </h3>
              <ThemePanel />
            </section>

            {/* General Settings */}
            <section className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/5">
              <h3 className="text-2xl font-semibold text-white/90 mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-lg">⚙️</span>
                General
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-medium text-white mb-1">Temperature Unit</h4>
                    <p className="text-sm text-white/60">Choose between Celsius and Fahrenheit</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all">°C</button>
                    <button className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium">°F</button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-medium text-white mb-1">Notifications</h4>
                    <p className="text-sm text-white/60">Get weather alerts and updates</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/5">
              <h3 className="text-2xl font-semibold text-white/90 mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/10 rounded-lg">ℹ️</span>
                About
              </h3>
              <div className="space-y-4 text-white/80">
                <p className="leading-relaxed">
                  Weather Dashboard v2.0.0 - A modern weather application crafted with React, TypeScript, and Tailwind CSS.
                  Experience real-time weather updates with a beautiful, responsive interface.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="https://github.com" className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                    GitHub
                  </a>
                  <a href="#" className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                    Documentation
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
