import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify token with Firebase Admin
    let decodedToken: any;
    try {
      const adminAuth = getAdminAuth();
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (adminError) {
      console.warn("Firebase Admin failed (missing keys?). Falling back to basic decode.");
      const payload = token.split('.')[1];
      decodedToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    }
    
    const uid = decodedToken.uid || decodedToken.user_id;
    const email = decodedToken.email;
    const name = decodedToken.name;
    const picture = decodedToken.picture;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let dbUser;
    try {
      const db = getAdminFirestore();
      const userRef = db.collection('users').doc(uid);
      const userDoc = await userRef.get();
      
      const adminEmail = 'devendrasagar0988@gmail.com';
      const userRole = email === adminEmail ? 'admin' : 'user';

      if (userDoc.exists) {
        dbUser = userDoc.data();
        
        // Update user fields
        const updates: any = {
          email,
          updatedAt: new Date().toISOString()
        };
        if (name) updates.name = name;
        if (picture) updates.photoURL = picture;
        if (email === adminEmail && dbUser?.role !== 'admin') {
          updates.role = 'admin';
        }
        
        await userRef.update(updates);
        dbUser = { ...dbUser, ...updates, id: uid };
      } else {
        // Create new user
        const newUser = {
          email,
          name: name || '',
          photoURL: picture || '',
          role: userRole,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await userRef.set(newUser);
        dbUser = { ...newUser, id: uid };
      }
    } catch (dbError: any) {
      console.warn("Firestore sync failed (Missing Admin Keys?). Returning memory fallback.", dbError.message);
      const adminEmail = 'devendrasagar0988@gmail.com';
      dbUser = {
        id: uid,
        email,
        name: name || '',
        photoURL: picture || '',
        role: email === adminEmail ? 'admin' : 'user'
      };
    }

    return NextResponse.json({ 
      success: true, 
      user: dbUser 
    });
    
  } catch (error: any) {
    console.error('Auth sync error details:', error);
    return NextResponse.json(
      { error: 'Authentication sync failed', details: error.message || String(error) }, 
      { status: 401 }
    );
  }
}
