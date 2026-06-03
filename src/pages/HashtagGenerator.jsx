import React, { useState } from 'react'
import { callAIJson } from '../api/ai.js'

const PLATFORMS = ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'TikTok']
const NICHES    = ['Tech & AI', 'E-commerce', 'Health & Wellness', 'Finance', 'Education', 'Marketing']
const CTYPES    = ['Image Post', 'Carousel', 'Video/Reel', 'Story', 'Poll']

const SYS = `You are a social media hashtag expert. Return ONLY valid JSON with no markdown:
{"trending":["#tag1","#tag2","#tag3","#tag4","#tag5"],"niche":["#tag1","#tag2","#tag3","#tag4","#tag5"],"broad":["#tag1","#tag2","#tag3","#tag4","#tag5"],"community":["#tag1","#tag2","#tag3","#tag4","#tag5"],"all":"all 20 hashtags in one string","strategy":"one sentence strategy tip"}`

const GROUPS = [
  { key: 'trending',  label: 'Trending',      color: '#fca449' },
  { key: 'niche',     label: 'Niche Specific', color: '#7c5cfc' },
  { key: 'broad',     label: 'Broad Reach',    color: '#06d6a0' },
  { key: 'community', label: 'Community',      color: '#f472b6' },
]

export default function HashtagGenerator() {
  const [form, setForm] = useState({ topic: '', platform: 'Instagram', niche: 'Tech & AI', ctype: 'Image Post' })
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState('')
  const [copied, setCopied]   = useState(false)

  const up = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const generate = async () => {
    if (!form.topic) { setError('Please enter a topic.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await callAIJson(SYS,
        `Topic: ${form.topic}\nPlatform: ${form.platform}\nNiche: ${form.niche}\nContent: ${form.ctype}`)
      setResult(data)
    } catch (e) {
      setError('Generation failed: ' + e.message)
    }
    setLoading(false)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(result.all)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title"># Hashtag Generator</div>
          <div className="ph-sub">Generate strategic hashtag sets to maximize reach</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: 20 }}>

        {/* Form */}
        <div className="card" style={{ padding: 24, height: 'fit-content' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#eceeff', marginBottom: 20 }}>Hashtag Settings</div>

          <div className="fgroup">
            <label className="flabel">Topic / Keyword</label>
            <input className="finput" value={form.topic} onChange={up('topic')} placeholder="e.g. AI tools, productivity" />
          </div>

          {[
            { k: 'platform', l: 'Platform',    opts: PLATFORMS },
            { k: 'niche',    l: 'Your Niche',  opts: NICHES },
            { k: 'ctype',    l: 'Content Type', opts: CTYPES },
          ].map(({ k, l, opts }) => (
            <div key={k} className="fgroup">
              <label className="flabel">{l}</label>
              <select className="fselect" value={form[k]} onChange={up(k)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {error && <div className="ferror">{error}</div>}
          <button className="btn btn-c btn-full" onClick={generate} disabled={loading}>
            # {loading ? 'Generating…' : 'Generate Hashtags'}
          </button>
        </div>

        {/* Results */}
        <div>
          {!result && !loading && (
            <div className="card empty">
              <div className="empty-icon">#</div>
              <div className="empty-title">Your hashtag sets will appear here</div>
            </div>
          )}

          {loading && [0, 1, 2].map(i => <div key={i} className="skeleton" />)}

          {result && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="g2">
                {GROUPS.map(({ key, label, color }) => (
                  <div key={key} className="card">
                    <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.5px' }}>{label}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(result[key] || []).map(tag => (
                        <span key={tag} className="tag" style={{ background: `${color}15`, color, borderColor: `${color}35` }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#eceeff' }}>All Hashtags — Ready to Copy</span>
                  <button className={'btn btn-full ' + (copied ? 'btn-c' : 'btn-ghost')} style={{ width: 'auto', padding: '6px 14px', fontSize: 12 }} onClick={copyAll}>
                    {copied ? '✓ Copied!' : 'Copy All'}
                  </button>
                </div>
                <p style={{ fontSize: 13, color: '#06d6a0', lineHeight: 1.9 }}>{result.all}</p>
                {result.strategy && (
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(124,92,252,.08)', border: '1px solid rgba(124,92,252,.18)', borderRadius: 8, fontSize: 12, color: 'rgba(236,238,255,.6)' }}>
                    💡 <strong style={{ color: '#eceeff' }}>Strategy:</strong> {result.strategy}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
