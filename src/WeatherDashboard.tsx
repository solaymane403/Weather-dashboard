import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Cloud,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';

// API key (via dotenv-webpack or system env)
const API_KEY = (process.env as any).API_KEY || (process.env as any).REACT_APP_API_KEY || '';

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { main: string; description: string }[];
  main: { temp: number; humidity: number; pressure: number };
  wind: { speed: number };
  visibility: number;
}

interface ForecastItem {
  dt: number;
  weather: { main: string; description: string }[];
  main: { temp: number };
}

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [unit, setUnit] = useState<'metric' | 'imperial'>(() => {
    const saved = localStorage.getItem('weatherUnit');
    return (saved as 'metric' | 'imperial') || 'metric';
  });
  const { isDark, colorScheme } = useTheme();

  // Convert temperature based on unit
  const convertTemp = (celsius: number): number => {
    return unit === 'metric' ? celsius : (celsius * 9/5) + 32;
  };

  // Convert wind speed based on unit
  const convertWindSpeed = (mps: number): number => {
    return unit === 'metric' ? mps : mps * 2.237; // m/s to mph
  };

  // Save unit preference when it changes
  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('recentCities') || '[]') as string[];
    setRecentCities(savedCities.length ? savedCities : ['London', 'New York', 'Tokyo']);
    if (savedCities.length) fetchWeather(savedCities[0]);
  }, []);

  const fetchByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('Location not found');
      const data: WeatherData = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData: any = await forecastRes.json();
      const dailyForecast = forecastData.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5);
      setForecast(dailyForecast);
      updateRecentCities(data.name);
    } catch (e) {
      setError('Unable to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data: WeatherData = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData: any = await forecastRes.json();
      const dailyForecast = forecastData.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5);
      setForecast(dailyForecast);

      updateRecentCities(cityName);
    } catch {
      setError('Unable to fetch weather data. Check city name.');
    } finally {
      setLoading(false);
    }
  };

  const updateRecentCities = (cityName: string) => {
    const updated = [cityName, ...recentCities.filter(c => c.toLowerCase() !== cityName.toLowerCase())].slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem('recentCities', JSON.stringify(updated));
  };

  const getWeatherIcon = (condition: string) => {
    const main = condition.toLowerCase();
    if (main.includes('clear')) return <Sun className="w-16 h-16 text-yellow-300" />;
    if (main.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-300" />;
    if (main.includes('rain')) return <Droplets className="w-16 h-16 text-blue-300" />;
    if (main.includes('snow')) return <Cloud className="w-16 h-16 text-blue-200" />;
    return <Cloud className="w-16 h-16 text-gray-300" />;
  };

  const getWeatherBackground = () => {
    if (!weather) {
      return 'bg-opacity-50';
    }

    const condition = weather.weather[0].main.toLowerCase();
    const backgrounds = {
      clear: {
        light: 'bg-yellow-500/20',
        dark: 'bg-indigo-900/20'
      },
      clouds: {
        light: 'bg-gray-400/20',
        dark: 'bg-gray-700/20'
      },
      rain: {
        light: 'bg-blue-500/20',
        dark: 'bg-blue-900/20'
      },
      snow: {
        light: 'bg-blue-200/20',
        dark: 'bg-slate-700/20'
      },
      default: {
        light: 'bg-opacity-50',
        dark: 'bg-opacity-50'
      }
    };

    let bgKey: keyof typeof backgrounds = 'default';
    if (condition.includes('clear')) bgKey = 'clear';
    else if (condition.includes('cloud')) bgKey = 'clouds';
    else if (condition.includes('rain') || condition.includes('drizzle')) bgKey = 'rain';
    else if (condition.includes('snow')) bgKey = 'snow';

    return backgrounds[bgKey][isDark ? 'dark' : 'light'];
  };

  return (
    <div className={`min-h-screen ${getWeatherBackground()} transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white/90 flex items-center gap-3 backdrop-blur-sm py-2 px-4 rounded-2xl">
            <span className="animate-pulse transition-transform hover:scale-110">🌦️</span> 
            Weather
          </h1>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && fetchWeather(city)}
              placeholder="Search for a city..."
              className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all"
            />
            <Search className="absolute left-4 top-4 w-6 h-6 text-white/50 group-hover:text-white/70 transition-colors" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchWeather(city)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-medium text-white transition-all backdrop-blur-md border border-white/10 hover:border-white/20 flex-shrink-0"
            >
              Search
            </button>
            <button
              onClick={() => {
                if (!navigator.geolocation) {
                  setError('Geolocation not supported in this browser');
                  return;
                }
                navigator.geolocation.getCurrentPosition(
                  pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
                  () => setError('Unable to retrieve your location')
                );
              }}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-md border border-white/10 hover:border-white/20 flex-shrink-0"
              aria-label="Use current location"
            >
              <MapPin className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-medium text-white transition-all backdrop-blur-md border border-white/10 hover:border-white/20 flex-shrink-0"
              aria-label="Toggle temperature unit"
            >
              °{unit === 'metric' ? 'C' : 'F'}
            </button>
          </div>
        </div>

        {/* Recent Cities */}
        {recentCities.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {recentCities.map(cityName => (
              <button
                key={cityName}
                onClick={() => fetchWeather(cityName)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
              >
                {cityName}
              </button>
            ))}
          </div>
        )}

        {/* Weather Card */}
        {weather && (
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl text-white animate-fade-in hover:bg-white/10 transition-all">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="transform transition-all hover:scale-110 p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white/90 transition-colors">
                    {weather.name}, {weather.sys.country}
                  </h2>
                </div>
                <p className="text-xl capitalize text-white/70 mb-4">{weather.weather[0].description}</p>
                <p className="text-7xl font-bold tracking-tight text-white/90 transition-colors">
                  {Math.round(convertTemp(weather.main.temp))}°{unit === 'metric' ? 'C' : 'F'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center bg-white/5 hover:bg-white/10 rounded-2xl p-6 transition-all group">
                <Wind className="w-8 h-8 text-white/70 group-hover:text-white/90 transition-colors mb-2" />
                <p className="text-white/70 text-sm mb-1">Wind Speed</p>
                <p className="text-lg font-medium">{convertWindSpeed(weather.wind.speed).toFixed(1)} {unit==='metric'?'m/s':'mph'}</p>
              </div>
              <div className="flex flex-col items-center bg-white/5 hover:bg-white/10 rounded-2xl p-6 transition-all group">
                <Droplets className="w-8 h-8 text-white/70 group-hover:text-white/90 transition-colors mb-2" />
                <p className="text-white/70 text-sm mb-1">Humidity</p>
                <p className="text-lg font-medium">{weather.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center bg-white/5 hover:bg-white/10 rounded-2xl p-6 transition-all group">
                <Eye className="w-8 h-8 text-white/70 group-hover:text-white/90 transition-colors mb-2" />
                <p className="text-white/70 text-sm mb-1">Visibility</p>
                <p className="text-lg font-medium">{(weather.visibility/1000).toFixed(1)} km</p>
              </div>
              <div className="flex flex-col items-center bg-white/5 hover:bg-white/10 rounded-2xl p-6 transition-all group">
                <Gauge className="w-8 h-8 text-white/70 group-hover:text-white/90 transition-colors mb-2" />
                <p className="text-white/70 text-sm mb-1">Pressure</p>
                <p className="text-lg font-medium">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}

        {/* Forecast */}
        {forecast.length > 0 && (
          <div className="mt-8 animate-slide-up">
            <h3 className="text-2xl font-bold text-white/90 mb-6 backdrop-blur-sm py-2 px-4 rounded-xl inline-block">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((f, index) => (
                <div 
                  key={f.dt} 
                  className="flex flex-col items-center bg-white/5 hover:bg-white/10 p-6 rounded-2xl text-white transition-all hover:scale-105 backdrop-blur-md border border-white/10 hover:border-white/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="font-medium text-lg mb-3">
                    {new Date(f.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
                  </p>
                  <div className="my-3 transform transition-transform hover:scale-110 bg-white/5 p-4 rounded-xl">
                    {getWeatherIcon(f.weather[0].main)}
                  </div>
                  <p className="text-2xl font-semibold mt-2">
                    {Math.round(convertTemp(f.main.temp))}°{unit === 'metric' ? 'C' : 'F'}
                  </p>
                  <p className="text-sm text-white/70 mt-1 capitalize">{f.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-8 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 text-red-200 animate-fade-in flex items-center gap-3">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
