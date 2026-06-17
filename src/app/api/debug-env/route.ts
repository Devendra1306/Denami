import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  return NextResponse.json({
    has_project_id: !!projectId,
    project_id_value: projectId || 'MISSING',
    has_client_email: !!clientEmail,
    client_email_value: clientEmail || 'MISSING',
    has_private_key: !!privateKey,
    private_key_starts: privateKey ? privateKey.substring(0, 50) : 'MISSING',
    private_key_has_newlines: privateKey ? privateKey.includes('\n') : false,
    private_key_has_escaped_newlines: privateKey ? privateKey.includes('\\n') : false,
    node_env: process.env.NODE_ENV,
  });
}
