const MODEL = 'gemini-2.0-flash'

export async function callAI(system, user, maxTokens = 1200) {
  const key = import.meta.env.VITE_GEMINI_KEY || ''
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [{ parts: [{ text: user }] }],
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
    }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.candidates[0].content.parts[0].text
}

export async function callAIJson(system, user, maxTokens = 1200) {
  const text = await callAI(system, user, maxTokens)
  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
  return JSON.parse(clean)
}
