import React, { useState } from 'react'
import { callAIJson } from '../api/ai.js'

const PLATFORMS = ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'TikTok']
const NICHES    = ['Tech & AI', 'E-commerce', 'Health & Wellness', 'Finance', 'Education', 'Marketing']
const PC        = { 'Very High': '#7c5cfc', High: '#06d6a0', Medium: '#fca449' }

const SYS = `You are a social media trend analyst. Return ONLY valid JSON with no markdown:
{"trends":[{"topic":"Trend Name","description":"One sentence why it is trending now.","potential":"Very High","growth":"+42%","contentIdea":"Specific actionable post idea.","hashtags":"#tag1 #tag2 #tag3"}],"summary":"1-2 sentence strategic insight."}`

export default function TrendAnalyzer() {
  const [platform, setPlatform] = useState('Instagram')
  const [niche, setNiche]       = useState('Tech & AI')
  const [loading, setLoading]   = useState(false)
  const [data, setData]         = useState(null)
  const [error, setError]       = useState('')

  const analyze = async () => {
    setLoading(true); setData(null); setError('')
    try {
      const result = await callAIJson(SYS,
        `Top 6 trending topics for ${platform} creators in the ${niche} niche in 2025. Be specific and actionable.`, 1400)
      setData(result)
    } catch (e) {
      setError('Analysis failed: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">⟡ Trend Analyzer</div>
          <div className="ph-sub">AI-powered trend detection to keep your content ahead of the curve</div>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ padding: 20, marginBottom: 20, display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <div className="flabel">Platform</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {PLATFORMS.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                style={{ padding: '8px 14px', background: platform === p ? 'rgba(124,92,252,.2)' : 'rgba(255,255,255,.04)', border: `1px solid ${platform === p ? 'rgba(124,92,252,.45)' : 'rgba(255,255,255,.08)'}`, color: platform === p ? '#7c5cfc' : 'rgba(236,238,255,.45)', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: platform === p ? 700 : 400 }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ minWidth: 180 }}>
          <div className="flabel">Niche</div>
          <select className="fselect" value={niche} onChange={e => setNiche(e.target.value)}>
            {NICHES.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <button className="btn btn-v" style={{ marginLeft: 'auto' }} onClick={analyze} disabled={loading}>
          ⟡ {loading ? 'Analyzing…' : 'Analyze Trends'}
        </button>
      </div>

      {error && <div className="ferror" style={{ marginBottom: 14 }}>{error}</div>}

      {!data && !loading && (
        <div className="card empty">
          <div className="empty-icon">⟡</div>
          <div className="empty-title">Select a platform and click Analyze Trends</div>
        </div>
      )}

      {loading && [0, 1, 2].map(i => <div key={i} className="skeleton" />)}

      {data && (
        <div className="fade-in">
          {data.summary && (
            <div style={{ background: 'rgba(124,92,252,.08)', border: '1px solid rgba(124,92,252,.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 18, fontSize: 13, color: 'rgba(236,238,255,.6)', display: 'flex', gap: 10 }}>
              <span style={{ color: '#7c5cfc', flexShrink: 0 }}>⟡</span>
              {data.summary}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
            {data.trends.map((trend, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#eceeff', flex: 1, marginRight: 10, lineHeight: 1.4 }}>{trend.topic}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                    <span className="badge" style={{ background: `${PC[trend.potential] || '#fca449'}20`, color: PC[trend.potential] || '#fca449', borderColor: `${PC[trend.potential] || '#fca449'}40` }}>{trend.potential}</span>
                    <span style={{ fontSize: 12, color: '#06d6a0', fontWeight: 700 }}>{trend.growth}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(236,238,255,.55)', lineHeight: 1.65, marginBottom: 12 }}>{trend.description}</p>
                <div style={{ background: 'rgba(6,214,160,.08)', border: '1px solid rgba(6,214,160,.18)', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#06d6a0', fontWeight: 700, marginBottom: 4 }}>Content Idea</div>
                  <div style={{ fontSize: 12, color: 'rgba(236,238,255,.6)' }}>{trend.contentIdea}</div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(236,238,255,.3)' }}>{trend.hashtags}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
