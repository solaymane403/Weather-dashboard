# Weather Dashboard

A small React + TypeScript + Tailwind demo that shows current weather and a 5-day forecast using the OpenWeatherMap API.

Setup

1. Create a `.env` file in the project root with your OpenWeatherMap API key:

```
API_KEY=your_openweathermap_api_key_here
```

2. Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Notes

- The application expects an environment variable named `API_KEY`. The project uses `dotenv-webpack` to inject the variable at build time. You can also export the variable in your system environment before running the dev server.
- Routes: `/` (Home), `/dashboard` (Weather dashboard), `/about`, `/settings`.

Next steps / improvements

- Add persistent storage for saved locations.
- Add user preferences (units, theme) and persist them.
- Add error handling for rate limits and API failures.
