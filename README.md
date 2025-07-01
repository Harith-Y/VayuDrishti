# VayuDrishti

VayuDrishti is a full-stack air quality and weather monitoring application. It provides real-time AQI, weather data, forecasts, and health alerts for multiple cities.

## Project Structure

- `aqi-backend/` — Node.js/Express backend for AQI, weather, and alert APIs
- `client/` — React + Vite + Tailwind frontend for the dashboard UI

---

## Backend Setup (`aqi-backend`)

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
cd aqi-backend
npm install
```

### Environment Variables
Create a `.env` file in `aqi-backend/` (see `.env.example` for required variables):

- Firebase Admin SDK credentials (as individual env vars)
- Supabase project URL and API key
- OpenWeatherMap API key

### Start the backend
```bash
node index.js
```
The server runs on [http://localhost:5000](http://localhost:5000)

---

## Frontend Setup (`client`)

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
cd client
npm install
```

### Start the frontend
```bash
npm run dev
```
The app runs on [http://localhost:5173](http://localhost:5173) by default.

---

## Environment Variables

- Backend: See `aqi-backend/.env.example` for required variables.
- Frontend: No environment variables required by default.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Radix UI, Lucide Icons, Framer Motion
- **Backend:** Node.js, Express, Supabase, Firebase Admin, OpenWeatherMap API, OpenAQ API

---

## Features
- Real-time AQI and weather data for multiple cities
- Interactive AQI map visualization
- Historical AQI and weather trends with charts
- Short-term AQI forecasting using machine learning
- Health advisories and personalized alerts based on AQI levels
- Push notifications for health alerts (via Firebase Cloud Messaging)
- Responsive, mobile-friendly dashboard UI
- City search and selection for personalized data
- Pollutant breakdown and detailed pollutant cards
- Customizable settings for notifications and user preferences

---

## Scripts

### Backend
- `node index.js` — Start the backend server

### Frontend
- `npm run dev` — Start the frontend dev server
- `npm run build` — Build the frontend for production
- `npm run preview` — Preview the production build

---

## License
MIT

---

## Author
VayuDrishti Team
