import React from 'react';

const About: React.FC = () => {
  return (
    <main className="p-8 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="mb-4">This demo Weather Dashboard shows current weather and a simple 5-day forecast using OpenWeatherMap.</p>
      <p className="text-sm text-white/80">Built with React, TypeScript, Tailwind and Webpack. Add your OpenWeatherMap API key in a .env file as <code>API_KEY=your_key_here</code> or set an environment variable before starting the dev server.</p>
    </main>
  );
};

export default About;
