import React from 'react';

const About: React.FC = () => {
  return (
    <main className="p-8 max-w-3xl mx-auto text-white space-y-6">
      <h2 className="text-4xl font-bold mb-2 text-center">🌦️ About the Project</h2>

      <p className="text-lg text-white/90 leading-relaxed">
        The <strong>Weather Dashboard</strong> is a modern, responsive web application that delivers 
        real-time weather data and a detailed 5-day forecast for any city around the world. 
        Designed with a clean and intuitive interface, it offers users an effortless way to stay 
        updated on current conditions and upcoming trends.
      </p>

      <p className="text-white/80 leading-relaxed">
        Built with <strong>React</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, 
        and <strong>Webpack</strong>, this project demonstrates a seamless blend of performance and design. 
        It fetches live data from the <strong>OpenWeatherMap API</strong> to provide accurate and up-to-date results.
      </p>

      <section className="bg-white/10 rounded-2xl p-5 space-y-2">
        <h3 className="text-xl font-semibold mb-2">✨ Features</h3>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>🌡️ Current temperature, humidity, and wind speed</li>
          <li>🌤️ Dynamic weather icons and condition descriptions</li>
          <li>📅 Interactive 5-day forecast visualization</li>
          <li>📍 Display of geographical coordinates for the searched city</li>
          <li>💨 Smooth animations and responsive design for all devices</li>
        </ul>
      </section>

      <section className="bg-white/10 rounded-2xl p-5 space-y-2">
        <h3 className="text-xl font-semibold mb-2">⚙️ How to Use</h3>
        <p className="text-white/80">
          1️⃣ Create a <code>.env</code> file in the root directory of the project and add your OpenWeatherMap API key:
        </p>
        <pre className="bg-black/40 p-3 rounded-lg text-sm overflow-x-auto">
{`API_KEY=your_key_here`}
        </pre>
        <p className="text-white/80">
          2️⃣ Start the development server and explore live weather data in a clean, interactive interface.
        </p>
      </section>
    </main>
  );
};

export default About;
