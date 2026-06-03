import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CaptionGenerator from './pages/CaptionGenerator.jsx'
import HashtagGenerator from './pages/HashtagGenerator.jsx'
import PostIdeas from './pages/PostIdeas.jsx'
import Calendar from './pages/Calendar.jsx'
import Analytics from './pages/Analytics.jsx'
import TrendAnalyzer from './pages/TrendAnalyzer.jsx'
import Scheduler from './pages/Scheduler.jsx'

export default function App() {
  const [page, setPage] = useState('dashboard')

  const pages = {
    dashboard: <Dashboard setPage={setPage} />,
    caption:   <CaptionGenerator />,
    hashtag:   <HashtagGenerator />,
    ideas:     <PostIdeas />,
    calendar:  <Calendar />,
    analytics: <Analytics />,
    trends:    <TrendAnalyzer />,
    scheduler: <Scheduler />,
  }

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        {pages[page] || pages.dashboard}
      </main>
    </div>
  )
}
