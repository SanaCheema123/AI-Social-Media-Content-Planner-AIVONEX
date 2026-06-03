import React from 'react'

const PC = { ig: '#e1306c', li: '#0077b5', tw: '#1da1f2', fb: '#1877f2' }
const PL = { ig: 'IG', li: 'LI', tw: 'X', fb: 'FB' }

const STATS = [
  { label: 'Total Reach',          value: '78.4K', delta: '+16% vs last month' },
  { label: 'Total Engagement',     value: '12.6K', delta: '+24% vs last month' },
  { label: 'Avg. Engagement Rate', value: '6.48%', delta: '+10% vs last month' },
  { label: 'Total Impressions',    value: '132K',  delta: '+20% vs last month' },
]

const TOP_POSTS = [
  { t: 'AI Tools Carousel 2025',         p: 'ig', reach: '18.4K', eng: '9.2%' },
  { t: 'Future of Work LinkedIn Article', p: 'li', reach: '14.2K', eng: '8.1%' },
  { t: 'AI Productivity Reel',            p: 'ig', reach: '12.8K', eng: '7.8%' },
  { t: 'Tech Trends 2025 Thread',         p: 'tw', reach: '9.4K',  eng: '6.3%' },
  { t: 'Client Success Story',            p: 'fb', reach: '7.2K',  eng: '5.9%' },
]

const ENG_DATA  = [4200, 5800, 5100, 7300, 6800, 9200, 11000, 12600]
const REACH_DATA = [28000, 35000, 42000, 38000, 51000, 62000, 71000, 78400]
const WEEKS     = ['W1','W2','W3','W4','W5','W6','W7','W8']

const PLATFORM_BARS = [
  { label: 'Instagram', val: 45, color: '#e1306c' },
  { label: 'LinkedIn',  val: 32, color: '#0077b5' },
  { label: 'Twitter',   val: 28, color: '#1da1f2' },
  { label: 'Facebook',  val: 19, color: '#1877f2' },
]

const DONUT_DATA = [
  { label: 'Carousel', val: 30, color: '#7c5cfc' },
  { label: 'Reel',     val: 25, color: '#e1306c' },
  { label: 'Image',    val: 20, color: '#06d6a0' },
  { label: 'Tweet',    val: 15, color: '#1da1f2' },
  { label: 'Story',    val: 10, color: '#fca449' },
]

function LineChart({ data1, data2, labels, c1, c2 }) {
  const w = 520, h = 160, pad = 30
  const maxVal = Math.max(...data1, ...data2)
  const pts = (data) => data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / maxVal) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  const area = (data, col) => {
    const p = data.map((v, i) => ({ x: pad + (i / (data.length - 1)) * (w - pad * 2), y: h - pad - (v / maxVal) * (h - pad * 2) }))
    const d = p.map((pt, i) => (i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`)).join(' ')
    return `${d} L${p[p.length - 1].x},${h - pad} L${p[0].x},${h - pad} Z`
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '100%' }}>
      {[0.25,0.5,0.75,1].map(f => (
        <line key={f} x1={pad} y1={h - pad - f*(h-pad*2)} x2={w-pad} y2={h - pad - f*(h-pad*2)} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
      ))}
      <path d={area(data1, c1)} fill={`${c1}15`} />
      <path d={area(data2, c2)} fill={`${c2}08`} />
      <polyline points={pts(data1)} fill="none" stroke={c1} strokeWidth="2" strokeLinejoin="round" />
      <polyline points={pts(data2)} fill="none" stroke={c2} strokeWidth="2" strokeLinejoin="round" />
      {labels.map((l, i) => (
        <text key={l} x={pad + (i / (labels.length - 1)) * (w - pad * 2)} y={h - 6} textAnchor="middle" fill="rgba(236,238,255,.35)" fontSize="10">{l}</text>
      ))}
    </svg>
  )
}

function BarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.val))
  const w = 280, h = 160, pad = 20, barW = 36
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '100%' }}>
      {data.map((item, i) => {
        const x = pad + i * ((w - pad * 2) / data.length) + 8
        const barH = (item.val / maxVal) * (h - pad * 2 - 20)
        const y = h - pad - barH - 16
        return (
          <g key={item.label}>
            <rect x={x} y={y} width={barW} height={barH} fill={item.color} rx="4" opacity=".8" />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fill="rgba(236,238,255,.35)" fontSize="9">{item.label.slice(0,4)}</text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fill="rgba(236,238,255,.6)" fontSize="9">{item.val}</text>
          </g>
        )
      })}
    </svg>
  )
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.val, 0)
  let cumulative = 0
  const r = 60, cx = 80, cy = 80
  const slices = data.map(item => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    cumulative += item.val
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const large = item.val / total > 0.5 ? 1 : 0
    return { ...item, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` }
  })
  return (
    <svg viewBox="0 0 160 160" style={{ width: 140, height: 140, flexShrink: 0 }}>
      {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="#141728" strokeWidth="2" />)}
      <circle cx={cx} cy={cy} r="38" fill="#141728" />
    </svg>
  )
}

export default function Analytics() {
  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">▲ Analytics Dashboard</div>
          <div className="ph-sub">Track performance metrics and optimize your strategy</div>
        </div>
      </div>

      {/* Stats */}
      <div className="g4" style={{ marginBottom: 20 }}>
        {STATS.map(s => (
          <div key={s.label} className="stat">
            <div className="slabel">{s.label}</div>
            <div className="sval">{s.value}</div>
            <div className="sup">↑ {s.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff' }}>Engagement & Reach Over Time</div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[{ c: '#7c5cfc', l: 'Engagement' }, { c: '#06d6a0', l: 'Reach' }].map(({ c, l }) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(236,238,255,.5)' }}>
                  <span style={{ width: 10, height: 10, background: c, borderRadius: 2 }} />{l}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 160 }}>
            <LineChart data1={ENG_DATA} data2={REACH_DATA} labels={WEEKS} c1="#7c5cfc" c2="#06d6a0" />
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff', marginBottom: 14 }}>Posts by Platform</div>
          <div style={{ height: 160 }}>
            <BarChart data={PLATFORM_BARS} />
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff', marginBottom: 16 }}>Top Performing Posts</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                {['Post', 'Platform', 'Reach', 'Eng. Rate'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: 'rgba(236,238,255,.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_POSTS.map((post, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <td style={{ padding: '10px 0', fontSize: 12, color: '#eceeff' }}>{post.t}</td>
                  <td style={{ padding: '10px 0' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: PC[post.p], background: `${PC[post.p]}20`, padding: '2px 8px', borderRadius: 4 }}>{PL[post.p]}</span>
                  </td>
                  <td style={{ padding: '10px 0', fontSize: 12, color: 'rgba(236,238,255,.55)' }}>{post.reach}</td>
                  <td style={{ padding: '10px 0', fontSize: 12, color: '#06d6a0', fontWeight: 700 }}>{post.eng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff', marginBottom: 16 }}>Content Type Breakdown</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <DonutChart data={DONUT_DATA} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DONUT_DATA.map(({ label, val, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, background: color, borderRadius: 2, flexShrink: 0 }} />
                  <span style={{ color: 'rgba(236,238,255,.55)' }}>{label}</span>
                  <span style={{ color, fontWeight: 700, marginLeft: 'auto' }}>{val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
