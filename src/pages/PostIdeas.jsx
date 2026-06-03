import React, { useState } from 'react'
import { callAIJson } from '../api/ai.js'

const PLATFORMS = ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'TikTok']
const NICHES    = ['Tech & AI', 'E-commerce', 'Health & Wellness', 'Finance', 'Education', 'Marketing']
const GOALS     = ['Brand Awareness', 'Lead Generation', 'Sales', 'Engagement', 'Education']

const TC = { Carousel: '#7c5cfc', Reel: '#e1306c', Image: '#06d6a0', Tweet: '#1da1f2', Story: '#fca449', Poll: '#f472b6' }
const EC = { 'Very High': '#7c5cfc', High: '#06d6a0', Medium: '#fca449' }

export default function PostIdeas() {
  const [form, setForm] = useState({ brand: '', niche: 'Tech & AI', goal: 'Brand Awareness', platform: 'Instagram', count: 6 })
  const [loading, setLoading] = useState(false)
  const [ideas, setIdeas]     = useState(null)
  const [error, setError]     = useState('')

  const up = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const generate = async () => {
    if (!form.brand) { setError('Please enter your brand name.'); return }
    setLoading(true); setError(''); setIdeas(null)
    try {
      const sys = `Generate exactly ${form.count} post ideas. Return ONLY valid JSON with no markdown:
{"ideas":[{"title":"Post title","description":"2 sentences about the post concept.","type":"Carousel","bestTime":"Tue 10 AM","engagement":"High","hashtags":"#tag1 #tag2 #tag3"}]}
Allowed types: Carousel, Reel, Image, Tweet, Story, Poll. Engagement: Very High, High, Medium.`
      const data = await callAIJson(sys,
        `Brand: ${form.brand}\nNiche: ${form.niche}\nGoal: ${form.goal}\nPlatform: ${form.platform}`, 1600)
      setIdeas(data.ideas)
    } catch (e) {
      setError('Generation failed: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">◉ Post Idea Generator</div>
          <div className="ph-sub">Generate data-driven content ideas tailored to your brand</div>
        </div>
      </div>

      {/* Config bar */}
      <div className="card" style={{ padding: 22, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          <div className="fgroup" style={{ marginBottom: 0 }}>
            <label className="flabel">Brand Name</label>
            <input className="finput" value={form.brand} onChange={up('brand')} placeholder="Your brand..." />
          </div>
          {[
            { k: 'niche',    l: 'Niche',    opts: NICHES },
            { k: 'goal',     l: 'Goal',     opts: GOALS },
            { k: 'platform', l: 'Platform', opts: PLATFORMS },
          ].map(({ k, l, opts }) => (
            <div key={k} className="fgroup" style={{ marginBottom: 0 }}>
              <label className="flabel">{l}</label>
              <select className="fselect" value={form[k]} onChange={up(k)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {[6, 9, 12].map(n => (
            <button key={n} onClick={() => setForm(p => ({ ...p, count: n }))}
              style={{ padding: '7px 14px', background: form.count === n ? 'rgba(124,92,252,.2)' : 'rgba(255,255,255,.04)', border: `1px solid ${form.count === n ? 'rgba(124,92,252,.45)' : 'rgba(255,255,255,.08)'}`, color: form.count === n ? '#7c5cfc' : 'rgba(236,238,255,.45)', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: form.count === n ? 700 : 400 }}>
              {n} Ideas
            </button>
          ))}
          {error && <span className="ferror" style={{ marginBottom: 0 }}>{error}</span>}
          <button className="btn btn-a" style={{ marginLeft: 'auto' }} onClick={generate} disabled={loading}>
            ◉ {loading ? 'Generating…' : 'Generate Ideas'}
          </button>
        </div>
      </div>

      {/* Results */}
      {!ideas && !loading && (
        <div className="card empty">
          <div className="empty-icon">◉</div>
          <div className="empty-title">Configure settings above and generate ideas</div>
        </div>
      )}

      {loading && [0, 1, 2].map(i => <div key={i} className="skeleton" />)}

      {ideas && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 14 }}>
          {ideas.map((idea, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span className="badge" style={{ background: `${TC[idea.type] || '#7c5cfc'}20`, color: TC[idea.type] || '#7c5cfc', borderColor: `${TC[idea.type] || '#7c5cfc'}40` }}>{idea.type}</span>
                <span className="badge" style={{ background: `${EC[idea.engagement] || '#fca449'}20`, color: EC[idea.engagement] || '#fca449', borderColor: `${EC[idea.engagement] || '#fca449'}40` }}>{idea.engagement}</span>
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#eceeff', marginBottom: 8, lineHeight: 1.4 }}>{idea.title}</h4>
              <p style={{ fontSize: 12, color: 'rgba(236,238,255,.55)', lineHeight: 1.65, marginBottom: 14 }}>{idea.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.07)' }}>
                <span style={{ fontSize: 11, color: '#06d6a0' }}>⏱ {idea.bestTime}</span>
                <span style={{ fontSize: 11, color: 'rgba(236,238,255,.3)' }}>{idea.hashtags}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
