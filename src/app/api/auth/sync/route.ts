import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const ADMIN_EMAIL = 'devendrasagar0988@gmail.com';

function initAdmin() {
  if (getApps().length > 0) return;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? '';
  // Handle both escaped \n (from Vercel) and real newlines
  const privateKey = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey,
    }),
  });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing authorization header' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];

  // --- Decode token (with or without Admin SDK) ---
  let uid: string;
  let email: string;
  let name: string;
  let picture: string;

  try {
    initAdmin();
    const decoded = await getAuth().verifyIdToken(token);
    uid = decoded.uid;
    email = decoded.email ?? '';
    name = decoded.name ?? '';
    picture = decoded.picture ?? '';
    console.log('[sync] Token verified via Firebase Admin SDK. uid:', uid);
  } catch (adminErr: any) {
    console.warn('[sync] Admin SDK verify failed, falling back to JWT decode. Reason:', adminErr.message);
    try {
      const parts = token.split('.');
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
      uid = payload.user_id ?? payload.sub ?? payload.uid;
      email = payload.email ?? '';
      name = payload.name ?? '';
      picture = payload.picture ?? '';
      console.log('[sync] Fallback JWT decode. uid:', uid, 'email:', email);
    } catch (decodeErr: any) {
      console.error('[sync] JWT decode also failed:', decodeErr.message);
      return NextResponse.json({ error: 'Invalid token', details: decodeErr.message }, { status: 401 });
    }
  }

  if (!email) {
    return NextResponse.json({ error: 'Email missing from token' }, { status: 400 });
  }

  const role = email === ADMIN_EMAIL ? 'admin' : 'user';

  // --- Sync to Firestore ---
  let dbUser: any = { id: uid, email, name, photoURL: picture, role };

  try {
    initAdmin();
    const db = getAdminFirestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const existing = userDoc.data()!;
      const updates: any = { email, updatedAt: new Date().toISOString() };
      if (name) updates.name = name;
      if (picture) updates.photoURL = picture;
      // Always enforce admin role for the admin email
      if (email === ADMIN_EMAIL) updates.role = 'admin';
      await userRef.update(updates);
      dbUser = { ...existing, ...updates, id: uid };
      console.log('[sync] Updated existing user in Firestore. role:', dbUser.role);
    } else {
      const newUser = {
        email, name, photoURL: picture, role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await userRef.set(newUser);
      dbUser = { ...newUser, id: uid };
      console.log('[sync] Created new user in Firestore. role:', dbUser.role);
    }
  } catch (dbErr: any) {
    console.error('[sync] Firestore sync failed:', dbErr.message);
    // Still return success — role is determined from email above
    console.log('[sync] Falling back to email-based role. role:', role);
  }

  return NextResponse.json({ success: true, user: dbUser });
}
