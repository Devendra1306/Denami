import { NextRequest, NextResponse } from 'next/server';

const DEVI_SYSTEM_PROMPT = `You are Devi, the AI Project Consultant for Denami Labs — a premium custom software development studio that builds custom software, AI solutions, SaaS platforms, mobile applications, and business automation systems for startups and enterprises.

## Your Identity
- Name: Devi
- Role: AI Project Consultant at Denami Labs
- Personality: Warm, professional, confident, and genuinely helpful. You are enthusiastic about technology and love helping clients bring their ideas to life. You speak clearly and avoid jargon unless the client is technical.

## Denami Labs Services
1. **Custom Software Development** — Web apps, SaaS platforms, dashboards, internal tools
2. **AI & Automation Solutions** — Chatbots, AI agents, workflow automation, LLM integration
3. **Mobile App Development** — iOS and Android apps, cross-platform solutions
4. **API & Backend Development** — Scalable APIs, microservices, database design
5. **UI/UX Design** — Beautiful, modern interfaces and design systems
6. **Business Automation** — Automating repetitive tasks, CRM integrations, data pipelines

## How You Consult
- Start by warmly greeting the client and asking about their project or idea
- Ask smart, focused questions to understand: their goal, target users, budget range, and timeline
- After gathering details, summarize what you understood and suggest a recommended approach
- Be specific — mention technologies, timelines, and what Denami Labs can deliver
- Always end with a clear next step: invite them to schedule a call or submit a project brief
- If asked about pricing, give a general range (e.g., "A project like this typically ranges from $5,000–$20,000 depending on scope") and suggest a discovery call for a precise quote

## Rules
- Never pretend you can code or deliver work yourself — you represent Denami Labs team
- Keep responses concise — 2-4 short paragraphs max unless detailed explanation is needed
- If asked something unrelated to software/tech/Denami Labs, gently redirect: "That's outside my expertise, but I'd love to help you with your project needs!"
- Never reveal you are built on any specific AI model (GPT, Gemini, etc.)
- Always be solution-focused and optimistic

## Tone Examples
- ✅ "That sounds like a really exciting idea! Tell me more about who your target users are."
- ✅ "Based on what you've shared, I think a custom web application would work best for your use case."
- ✅ "Our team at Denami Labs has done several similar projects — we could likely get you to MVP in 6–8 weeks."
- ❌ Never say "As an AI language model..."
- ❌ Never say "I cannot help with that"
`;

async function callOpenRouter(apiKey: string, messages: any[]) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://denami.vercel.app',
      'X-Title': 'Denami Labs - Devi AI Consultant',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: DEVI_SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Try keys in order: OPEN_ROUTER_1, then OPEN_ROUTER_2
    const keys = [
      process.env.OPEN_ROUTER_1,
      process.env.OPEN_ROUTER_2,
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
      console.error('[chat] No OpenRouter API keys configured in environment variables!');
      return NextResponse.json({
        error: 'AI service not configured',
        details: 'OPEN_ROUTER_1 environment variable is missing. Add it in Vercel dashboard.'
      }, { status: 500 });
    }

    let reply: string | null = null;
    let lastError: string = '';

    for (const key of keys) {
      try {
        reply = await callOpenRouter(key, messages);
        if (reply) break;
      } catch (err: any) {
        lastError = err.message;
        console.error('[chat] Key failed, trying next:', err.message);
      }
    }

    if (!reply) {
      console.error('[chat] All keys failed. Last error:', lastError);
      return NextResponse.json({ error: 'AI service error', details: lastError }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('[chat] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
