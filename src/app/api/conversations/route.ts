import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Conversation } from '@/models/Conversation';
import crypto from 'crypto';

// This is a webhook endpoint meant to be called by ElevenLabs or Omnidimension after a call finishes.
export async function POST(req: NextRequest) {
  try {
    // Basic API Key protection (You should configure your webhook providers to send this key)
    const apiKey = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('key');
    
    if (apiKey !== process.env.WEBHOOK_SECRET_KEY && process.env.NODE_ENV === 'production') {
       console.warn("Unauthorized webhook attempt");
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    // Standardize the incoming data. Different providers will have different payloads.
    // This expects a unified format, or you can map specific provider formats here.
    const payload = {
      callerId: data.callerId || data.user_id || 'Anonymous',
      agentName: data.agentName || data.agent_id || 'Unknown Agent',
      durationSeconds: data.durationSeconds || data.duration || 0,
      status: data.status || 'Completed',
      transcript: data.transcript || data.text || '',
      recordingUrl: data.recordingUrl || data.recording_url || '',
    };

    await connectToDatabase();
    
    const conversation = await Conversation.create(payload);

    return NextResponse.json({ success: true, id: conversation._id }, { status: 201 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
