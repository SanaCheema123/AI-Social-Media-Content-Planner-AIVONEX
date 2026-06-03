import React from 'react'

const NAV = [
  { id: 'dashboard', icon: '◈', label: 'Dashboard' },
  { id: 'caption',   icon: '✦', label: 'AI Caption Generator' },
  { id: 'hashtag',   icon: '#', label: 'Hashtag Generator' },
  { id: 'ideas',     icon: '◉', label: 'Post Ideas' },
  { id: 'calendar',  icon: '▦', label: 'Content Calendar' },
  { id: 'analytics', icon: '▲', label: 'Analytics' },
  { id: 'trends',    icon: '⟡', label: 'Trend Analyzer' },
  { id: 'scheduler', icon: '⊙', label: 'Scheduler' },
]

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo-icon">AI</div>
        <div>
          <div className="logo-name">ContentPlanner</div>
          <div className="logo-sub">by AIVONEX</div>
        </div>
      </div>

      <nav className="nav">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={'nav-btn' + (page === item.id ? ' active' : '')}
          >
            <span style={{ fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0 }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="user-wrap">
        <div className="avatar">S</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#eceeff' }}>Sana</div>
          <div style={{ fontSize: 11, color: 'rgba(236,238,255,.3)' }}>Pro · AIVONEX</div>
        </div>
      </div>
    </aside>
  )
}
