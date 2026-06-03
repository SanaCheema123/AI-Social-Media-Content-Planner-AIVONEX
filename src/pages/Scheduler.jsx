import React, { useState } from 'react'

const PLATFORMS = ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'TikTok']
const CTYPES    = ['Image Post', 'Carousel', 'Video/Reel', 'Story', 'Poll', 'Text Only']
const PMAP      = { Instagram: 'ig', LinkedIn: 'li', 'X (Twitter)': 'tw', Facebook: 'fb', TikTok: 'tk' }
const PC        = { ig: '#e1306c', li: '#0077b5', tw: '#1da1f2', fb: '#1877f2', tk: '#ee1d52' }
const PL        = { ig: 'IG', li: 'LI', tw: 'X', fb: 'FB', tk: 'TK' }

const INIT = [
  { id: 1, p: 'ig', type: 'Carousel',    date: 'May 20, 2025', time: '10:00 AM', caption: 'How to grow your brand using AI tools in 2025 — a complete step-by-step guide.', hashtags: '#AI #BrandGrowth' },
  { id: 2, p: 'li', type: 'Article',     date: 'May 21, 2025', time: '12:00 PM', caption: 'The future of work is being shaped by AI. Here is what leaders need to know.', hashtags: '#FutureOfWork #AI' },
  { id: 3, p: 'tw', type: 'Tweet',       date: 'May 22, 2025', time: '09:00 AM', caption: 'AI is not the future. It\'s the present. Are you keeping up? 🚀', hashtags: '#AI #Innovation' },
]

const DEF = { platform: 'Instagram', type: 'Image Post', date: '', time: '10:00', caption: '', hashtags: '' }

export default function Scheduler() {
  const [form, setForm]         = useState(DEF)
  const [scheduled, setScheduled] = useState(INIT)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const up = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const schedule = () => {
    if (!form.caption) { setError('Please write a caption.'); return }
    if (!form.date)    { setError('Please select a date.'); return }
    setError('')

    const [h, m] = form.time.split(':')
    const hNum = parseInt(h)
    const timeStr = `${hNum > 12 ? hNum - 12 : hNum}:${m} ${hNum >= 12 ? 'PM' : 'AM'}`
    const dateStr = new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    setScheduled(prev => [{ id: Date.now(), p: PMAP[form.platform] || 'ig', type: form.type, date: dateStr, time: timeStr, caption: form.caption, hashtags: form.hashtags }, ...prev])
    setSuccess(true)
    setForm(DEF)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="ph-title">⊙ Post Scheduler</div>
          <div className="ph-sub">Schedule and manage your upcoming content</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '370px 1fr', gap: 20 }}>

        {/* Form */}
        <div className="card" style={{ padding: 24, height: 'fit-content' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff', marginBottom: 20 }}>Schedule New Post</div>

          {[
            { k: 'platform', l: 'Platform',     opts: PLATFORMS },
            { k: 'type',     l: 'Content Type', opts: CTYPES },
          ].map(({ k, l, opts }) => (
            <div key={k} className="fgroup">
              <label className="flabel">{l}</label>
              <select className="fselect" value={form[k]} onChange={up(k)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="fgroup">
              <label className="flabel">Date</label>
              <input type="date" className="finput" value={form.date} onChange={up('date')} />
            </div>
            <div className="fgroup">
              <label className="flabel">Time</label>
              <input type="time" className="finput" value={form.time} onChange={up('time')} />
            </div>
          </div>

          <div className="fgroup">
            <label className="flabel">Caption</label>
            <textarea className="ftextarea" value={form.caption} onChange={up('caption')} placeholder="Write your caption here…" rows={4} />
          </div>

          <div className="fgroup">
            <label className="flabel">Hashtags</label>
            <input className="finput" value={form.hashtags} onChange={up('hashtags')} placeholder="#AI #Marketing" />
          </div>

          {error   && <div className="ferror">{error}</div>}
          {success && <div className="fsuccess">✓ Post scheduled successfully!</div>}

          <button className="btn btn-v btn-full" onClick={schedule}>⊙ Schedule Post</button>
        </div>

        {/* List */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#eceeff', marginBottom: 14 }}>
            Upcoming Posts ({scheduled.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scheduled.map(post => (
              <div key={post.id} className="card fade-in" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 20px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${PC[post.p]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: PC[post.p], flexShrink: 0 }}>
                  {PL[post.p]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#eceeff' }}>{post.type}</span>
                    <span className="tag" style={{ background: 'rgba(6,214,160,.1)', color: '#06d6a0', borderColor: 'rgba(6,214,160,.25)', fontSize: 11 }}>Scheduled</span>
                    {post.hashtags && <span style={{ fontSize: 11, color: 'rgba(236,238,255,.3)' }}>{post.hashtags}</span>}
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(236,238,255,.55)', lineHeight: 1.55, marginBottom: 8 }}>
                    {post.caption.length > 110 ? post.caption.slice(0, 110) + '…' : post.caption}
                  </p>
                  <div style={{ fontSize: 11, color: 'rgba(236,238,255,.3)', display: 'flex', gap: 16 }}>
                    <span>📅 {post.date}</span>
                    <span>⏰ {post.time}</span>
                  </div>
                </div>
                <button className="btn btn-del" style={{ fontSize: 11, padding: '4px 10px', flexShrink: 0 }} onClick={() => setScheduled(prev => prev.filter(x => x.id !== post.id))}>
                  Remove
                </button>
              </div>
            ))}

            {scheduled.length === 0 && (
              <div className="card empty">
                <div className="empty-title">No posts scheduled yet</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
