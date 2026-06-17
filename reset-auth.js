const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
});

const auth = getAuth();
const db = getFirestore();

async function resetAuth() {
  console.log('Starting Firebase Auth Reset...');
  try {
    // 1. Delete all users from Firebase Auth
    const listUsersResult = await auth.listUsers(1000);
    const uids = listUsersResult.users.map((userRecord) => userRecord.uid);
    if (uids.length > 0) {
      await auth.deleteUsers(uids);
      console.log(`Successfully deleted ${uids.length} users from Firebase Auth.`);
    } else {
      console.log('No users found in Firebase Auth.');
    }

    // 2. Delete all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    const batch = db.batch();
    usersSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    if (usersSnapshot.size > 0) {
      await batch.commit();
      console.log(`Successfully deleted ${usersSnapshot.size} user documents from Firestore.`);
    } else {
      console.log('No users found in Firestore.');
    }

    console.log('Reset complete!');
  } catch (error) {
    console.error('Error resetting auth:', error);
  }
}

resetAuth();
