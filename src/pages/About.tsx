import React from 'react';

const About: React.FC = () => {
  return (
    <main className="p-8 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">🌦️ About</h2>
      <p className="mb-4">The Weather Dashboard is a sleek, responsive web app that provides real-time weather updates and a detailed 5-day forecast for any city worldwide.
Built with React, TypeScript, Tailwind CSS, and Webpack, it delivers a fast and modern user experience.</p>
      <p className="text-sm text-white/80">Simply enter a city name to instantly view:

🌡️ Current temperature, humidity, and wind speed

🌤️ Weather conditions with dynamic icons

📅 A 5-day forecast showing upcoming trends

To use it, create a .env file in the project root and add your OpenWeatherMap
 API key:

API_KEY=your_key_here


Then start the development server to explore the app in action.</p>
    </main>
  );
};

export default About;
