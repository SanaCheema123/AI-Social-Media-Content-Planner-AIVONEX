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

const STATS = [
  { label: 'Total Posts',          value: '124',   delta: '+18% vs last week', up: true },
  { label: 'Engagement',           value: '12.6K', delta: '+24% vs last week', up: true },
  { label: 'Reach',                value: '78.4K', delta: '+16% vs last week', up: true },
  { label: 'Impressions',          value: '132K',  delta: '+20% vs last week', up: true },
  { label: 'Avg. Engagement Rate', value: '6.48%', delta: '+10% vs last week', up: true },
  { label: 'Scheduled Posts',      value: '8',     delta: 'This week',         up: null },
]

const DAYS = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18']
const TAGS = ['#AI', '#FutureTech', '#Innovation', '#TechTrends', '#SmartWork']
const QA = [
  { l: 'Generate Caption', p: 'caption',   c: '#7c5cfc' },
  { l: 'Get Hashtags',     p: 'hashtag',   c: '#06d6a0' },
  { l: 'Post Ideas',       p: 'ideas',     c: '#fca449' },
  { l: 'Analytics',        p: 'analytics', c: '#f87171' },
]

export default function Dashboard({ setPage }) {
  return (
    <div className="page">
      {/* Header */}
      <div className="ph">
        <div>
          <div className="ph-title">Dashboard</div>
          <div className="ph-sub">May 12–18, 2025 · All Platforms</div>
        </div>
        <button className="btn btn-v" onClick={() => setPage('caption')}>+ Create New Post</button>
      </div>

      {/* Stats */}
      <div className="g6" style={{ marginBottom: 22 }}>
        {STATS.map(s => (
          <div key={s.label} className="stat">
            <div className="slabel">{s.label}</div>
            <div className="sval">{s.value}</div>
            <div className={s.up ? 'sup' : 'sneu'}>{s.up ? '↑ ' : ''}{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: 20 }}>

        {/* Calendar */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff' }}>Content Calendar — This Week</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {Object.entries(PN).map(([k, n]) => (
                <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(236,238,255,.35)' }}>
                  <span style={{ width: 7, height: 7, background: PC[k], borderRadius: '50%', display: 'inline-block' }} />
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
            {DAYS.map((day, di) => (
              <div key={day}>
                <div style={{ fontSize: 11, color: 'rgba(236,238,255,.35)', marginBottom: 6, textAlign: 'center', fontWeight: 600 }}>
                  {day}
                </div>
                <div style={{ minHeight: 110, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {POSTS.filter(p => p.day === di).map((post, i) => (
                    <div key={i} style={{ background: `${PC[post.p]}1a`, border: `1px solid ${PC[post.p]}40`, borderLeft: `3px solid ${PC[post.p]}`, borderRadius: 6, padding: '4px 6px' }}>
                      <div style={{ color: PC[post.p], fontWeight: 700, fontSize: 9, marginBottom: 2 }}>
                        {PL[post.p]} · {post.time}
                      </div>
                      <div style={{ color: 'rgba(236,238,255,.65)', fontSize: 10, lineHeight: 1.3 }}>{post.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#eceeff', marginBottom: 14 }}>AI Suggestions</div>

            <div style={{ marginBottom: 14 }}>
              <div className="flabel">Trending Topic</div>
              <div style={{ background: 'rgba(124,92,252,.08)', border: '1px solid rgba(124,92,252,.2)', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#eceeff', marginBottom: 4 }}>AI in Everyday Life</div>
                <div style={{ fontSize: 12, color: 'rgba(236,238,255,.5)', marginBottom: 10 }}>
                  How AI reshapes daily routines, productivity, and creativity.
                </div>
                <button className="btn btn-v" style={{ fontSize: 11, padding: '5px 12px' }} onClick={() => setPage('ideas')}>
                  Use Idea →
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div className="flabel">Suggested Hashtags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {TAGS.map(h => (
                  <span key={h} className="tag" style={{ background: 'rgba(6,214,160,.1)', color: '#06d6a0', borderColor: 'rgba(6,214,160,.25)' }}>{h}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div className="flabel">Best Time to Post</div>
              {['10:00 AM – 12:00 PM', '07:00 PM – 09:00 PM'].map(t => (
                <div key={t} style={{ fontSize: 12, color: 'rgba(236,238,255,.6)', marginBottom: 4 }}>⏱ {t}</div>
              ))}
            </div>

            <div>
              <div className="flabel">Engagement Prediction</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="tag" style={{ background: 'rgba(6,214,160,.1)', color: '#06d6a0', borderColor: 'rgba(6,214,160,.25)' }}>High</span>
                <span style={{ fontSize: 12, color: 'rgba(236,238,255,.35)' }}>85% potential</span>
              </div>
              <div className="ebar-track"><div className="ebar-fill" style={{ width: '85%' }} /></div>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#eceeff', marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {QA.map(a => (
                <button key={a.p} onClick={() => setPage(a.p)} style={{ background: `${a.c}14`, border: `1px solid ${a.c}30`, borderRadius: 8, padding: '9px 8px', color: a.c, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  {a.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
