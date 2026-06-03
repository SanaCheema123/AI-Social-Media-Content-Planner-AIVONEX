import React, { useState } from 'react'
import { callAIJson } from '../api/ai.js'

const PLATFORMS = ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'TikTok']
const TONES     = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational']
const GOALS     = ['Brand Awareness', 'Lead Generation', 'Sales', 'Engagement', 'Education']

const SYS = `You are an expert social media copywriter. Generate exactly 3 caption variations.
Return ONLY valid JSON with no markdown, no extra text:
{"captions":[{"style":"Hook-Led","text":"caption text","emojis":"🚀✨"},{"style":"Story-Led","text":"caption text","emojis":"🎯💼"},{"style":"Question-Led","text":"caption text","emojis":"🤔💭"}]}
Each caption should be 150-200 characters.`

export default function CaptionGenerator() {
  const [form, setForm] = useState({ brand: '', platform: 'Instagram', topic: '', tone: 'Professional', audience: '', goal: 'Engagement' })
  const [loading, setLoading] = useState(false)
  const [captions, setCaptions] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  const up = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const generate = async () => {
    if (!form.brand || !form.topic) { setError('Please fill in Brand Name and Topic.'); return }
    setLoading(true); setError(''); setCaptions(null)
    try {
      const data = await callAIJson(SYS,
        `Brand: ${form.brand}\nPlatform: ${form.platform}\nTopic: ${form.topic}\nTone: ${form.tone}\nAudience: ${form.audience || 'General'}\nGoal: ${form.goal}`)
      setCaptions(data.captions)
    } catch (e) {
      setError('Generation failed: ' + e.message)
    }
    setLoading(false)
  }

  const copy = (text, emojis, i) => {
    navigator.clipboard.writeText(`${text} ${emojis}`)
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">✦ AI Caption Generator</div>
          <div className="ph-sub">Generate 3 platform-optimized caption variations using AI</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 20 }}>

        {/* Form */}
        <div className="card" style={{ padding: 24, height: 'fit-content' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#eceeff', marginBottom: 20 }}>Content Details</div>

          {[
            { k: 'brand',    l: 'Brand Name',      ph: 'e.g. AIVONEX' },
            { k: 'topic',    l: 'Topic / Keywords', ph: 'e.g. AI productivity tools' },
            { k: 'audience', l: 'Target Audience',  ph: 'e.g. Startup founders' },
          ].map(({ k, l, ph }) => (
            <div key={k} className="fgroup">
              <label className="flabel">{l}</label>
              <input className="finput" value={form[k]} onChange={up(k)} placeholder={ph} />
            </div>
          ))}

          {[
            { k: 'platform', l: 'Platform',   opts: PLATFORMS },
            { k: 'tone',     l: 'Tone',       opts: TONES },
            { k: 'goal',     l: 'Goal',        opts: GOALS },
          ].map(({ k, l, opts }) => (
            <div key={k} className="fgroup">
              <label className="flabel">{l}</label>
              <select className="fselect" value={form[k]} onChange={up(k)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {error && <div className="ferror">{error}</div>}
          <button className="btn btn-v btn-full" onClick={generate} disabled={loading}>
            ✦ {loading ? 'Generating…' : 'Generate Captions'}
          </button>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {!captions && !loading && (
            <div className="card empty">
              <div className="empty-icon">✦</div>
              <div className="empty-title">Fill in the form to generate captions</div>
              <div className="empty-sub">AI creates 3 unique styles: Hook-Led, Story-Led, and Question-Led</div>
            </div>
          )}

          {loading && [0, 1, 2].map(i => <div key={i} className="skeleton" />)}

          {captions && captions.map((cap, i) => (
            <div key={i} className="card fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="badge" style={{ background: 'rgba(124,92,252,.2)', color: '#7c5cfc', borderColor: 'rgba(124,92,252,.3)' }}>
                  {cap.style}
                </span>
                <button
                  onClick={() => copy(cap.text, cap.emojis, i)}
                  style={{ background: copied === i ? 'rgba(6,214,160,.15)' : 'rgba(255,255,255,.05)', border: `1px solid ${copied === i ? 'rgba(6,214,160,.3)' : 'rgba(255,255,255,.1)'}`, borderRadius: 6, padding: '5px 12px', color: copied === i ? '#06d6a0' : 'rgba(236,238,255,.5)', fontSize: 11, cursor: 'pointer' }}
                >
                  {copied === i ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <p style={{ fontSize: 14, color: '#eceeff', lineHeight: 1.8, marginBottom: 8 }}>{cap.text}</p>
              <p style={{ fontSize: 18 }}>{cap.emojis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
