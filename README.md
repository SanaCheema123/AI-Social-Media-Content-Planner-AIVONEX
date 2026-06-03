# AI Social Media Content Planner — AIVONEX
<img width="1369" height="644" alt="WhatsApp Image 2026-06-03 at 11 52 38 AM" src="https://github.com/user-attachments/assets/48c602d3-ba0f-4aa6-968a-3b1795905dd3" />

## Setup (3 steps)

### 1. Install dependencies
```
npm install
```

### 2. Add your FREE Gemini API key
- Go to https://aistudio.google.com/app/apikey
- Sign in with Google → Create API Key → Copy it
- Open the `.env` file and replace:
  VITE_GEMINI_KEY=paste_your_gemini_key_here

### 3. Run the app
```
npm run dev
```
Open http://localhost:5173

---

## Project Structure

```
ai-social-media-planner/
├── index.html
├── vite.config.js
├── package.json
├── .env                         ← Add your Gemini key here
└── src/
    ├── main.jsx                 ← Entry point
    ├── App.jsx                  ← Page router
    ├── api/
    │   └── ai.js               ← Gemini API calls
    ├── styles/
    │   └── global.css          ← All styles
    ├── components/
    │   └── Sidebar.jsx         ← Navigation
    └── pages/
        ├── Dashboard.jsx
        ├── CaptionGenerator.jsx
        ├── HashtagGenerator.jsx
        ├── PostIdeas.jsx
        ├── Calendar.jsx
        ├── Analytics.jsx
        ├── TrendAnalyzer.jsx
        └── Scheduler.jsx
```
