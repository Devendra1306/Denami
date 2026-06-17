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

async function createAdmin() {
  const email = 'devendrasagar0988@gmail.com';
  const password = 'AdminPassword123!';
  
  try {
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log('User already exists in Auth. Updating password...');
      await auth.updateUser(userRecord.uid, { password });
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        console.log('Creating new user in Auth...');
        userRecord = await auth.createUser({
          email: email,
          password: password,
          emailVerified: true,
          displayName: 'Admin User'
        });
      } else {
        throw e;
      }
    }

    console.log('User UID:', userRecord.uid);

    // Save to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: email,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    console.log('Successfully created/updated Admin account!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();
