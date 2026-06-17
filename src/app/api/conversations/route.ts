import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';

// This is a webhook endpoint meant to be called by ElevenLabs or Omnidimension after a call finishes.
export async function POST(req: NextRequest) {
  try {
    // Basic API Key protection
    const apiKey = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('key');
    
    if (apiKey !== process.env.WEBHOOK_SECRET_KEY && process.env.NODE_ENV === 'production') {
       console.warn("Unauthorized webhook attempt");
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    const payload = {
      callerId: data.callerId || data.user_id || 'Anonymous',
      agentName: data.agentName || data.agent_id || 'Unknown Agent',
      durationSeconds: data.durationSeconds || data.duration || 0,
      status: data.status || 'Completed',
      transcript: data.transcript || data.text || '',
      recordingUrl: data.recordingUrl || data.recording_url || '',
      createdAt: new Date().toISOString()
    };

    const db = getAdminFirestore();
    const docRef = await db.collection('conversations').add(payload);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
