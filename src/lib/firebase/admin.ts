import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export function getAdminAuth() {
  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!process.env.FIREBASE_PROJECT_ID || !privateKey) {
      console.warn("Missing Firebase Admin credentials in environment variables.");
    }
    
    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID || 'dummy-project',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'dummy@email.com',
          privateKey: privateKey || '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC\n-----END PRIVATE KEY-----\n',
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
      throw new Error("Failed to initialize Firebase Admin. Please check your .env.local keys.");
    }
  }
  
  if (!getApps().length) {
    throw new Error("Firebase Admin app not initialized.");
  }
  
  return getAuth();
}

export function getAdminFirestore() {
  // Ensure the app is initialized by calling getAdminAuth first, which handles the logic
  getAdminAuth();
  return getFirestore();
}
