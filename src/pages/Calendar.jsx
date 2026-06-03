import React from 'react'

const PC = { ig: '#e1306c', li: '#0077b5', tw: '#1da1f2', fb: '#1877f2' }
const PL = { ig: 'IG', li: 'LI', tw: 'X', fb: 'FB' }
const PN = { ig: 'Instagram', li: 'LinkedIn', tw: 'X (Twitter)', fb: 'Facebook' }

const POSTS = [
  { day: 0, time: '10:00 AM', p: 'ig', t: 'Carousel: Grow Your Brand' },
  { day: 0, time: '1:00 PM',  p: 'li', t: 'Monday Motivation' },
  { day: 0, time: '7:00 PM',  p: 'ig', t: 'Daily AI Tip Reel' },
  { day: 1, time: '10:30 AM', p: 'tw', t: 'Future of AI Thread' },
  { day: 1, time: '7:00 PM',  p: 'tw', t: 'Productivity Hack' },
  { day: 2, time: '11:00 AM', p: 'tw', t: 'AI Disruption Tweet' },
  { day: 2, time: '4:00 PM',  p: 'ig', t: 'Behind the Brand Reel' },
  { day: 3, time: '10:00 AM', p: 'ig', t: 'Workflow Tips Reel' },
  { day: 3, time: '7:00 PM',  p: 'fb', t: 'Behind the Scenes' },
  { day: 4, time: '7:00 PM',  p: 'fb', t: 'Feature Launch Post' },
  { day: 5, time: '7:00 PM',  p: 'ig', t: 'Client Success Carousel' },
  { day: 6, time: '11:00 AM', p: 'li', t: 'Weekly Roundup' },
]

const DAYS  = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18']
const HOURS = ['Morning (9–11 AM)', 'Afternoon (12–3 PM)', 'Evening (4–6 PM)', 'Night (7–9 PM)']

function getSlot(time) {
  const h = parseInt(time.split(':')[0])
  const pm = time.includes('PM')
  const hour = pm && h !== 12 ? h + 12 : h
  if (hour < 12) return 0
  if (hour < 15) return 1
  if (hour < 19) return 2
  return 3
}

export default function Calendar() {
  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">▦ Content Calendar</div>
          <div className="ph-sub">May 12–18, 2025 — Weekly View</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(7,1fr)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ padding: '12px 8px', borderRight: '1px solid rgba(255,255,255,.07)' }} />
          {DAYS.map((day, i) => (
            <div key={day} style={{ padding: '12px 10px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.07)', background: i === 0 ? 'rgba(124,92,252,.06)' : 'transparent' }}>
              <div style={{ fontSize: 11, color: 'rgba(236,238,255,.35)', fontWeight: 600, marginBottom: 4 }}>{day.split(' ')[0]}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: i === 0 ? '#7c5cfc' : '#eceeff' }}>{day.split(' ')[1]}</div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {HOURS.map((hour, hi) => (
          <div key={hour} style={{ display: 'grid', gridTemplateColumns: '90px repeat(7,1fr)', borderBottom: '1px solid rgba(255,255,255,.04)', minHeight: 80 }}>
            <div style={{ padding: '10px 8px 0', fontSize: 10, color: 'rgba(236,238,255,.3)', textAlign: 'right', borderRight: '1px solid rgba(255,255,255,.07)', lineHeight: 1.4 }}>{hour}</div>
            {[0, 1, 2, 3, 4, 5, 6].map(di => (
              <div key={di} style={{ padding: 6, borderRight: '1px solid rgba(255,255,255,.04)' }}>
                {POSTS.filter(p => p.day === di && getSlot(p.time) === hi).map((post, i) => (
                  <div key={i} style={{ background: `${PC[post.p]}18`, border: `1px solid ${PC[post.p]}40`, borderLeft: `3px solid ${PC[post.p]}`, borderRadius: 6, padding: '5px 7px', marginBottom: 4 }}>
                    <div style={{ fontSize: 9, color: PC[post.p], fontWeight: 700, marginBottom: 2 }}>{PL[post.p]} · {post.time}</div>
                    <div style={{ fontSize: 10, color: 'rgba(236,238,255,.7)', lineHeight: 1.3 }}>{post.t}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
        {Object.entries(PN).map(([k, n]) => (
          <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(236,238,255,.35)' }}>
            <span style={{ width: 8, height: 8, background: PC[k], borderRadius: '50%' }} />{n}
          </span>
        ))}
      </div>
    </div>
  )
}
