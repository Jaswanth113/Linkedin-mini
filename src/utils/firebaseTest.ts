import { db, auth, storage } from '../firebase/config.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function testFirebaseConnection() {
  const results = {
    firestore: false,
    auth: false,
    storage: false,
    errors: [] as string[]
  };

  try {
    // Test Firestore
    console.log('Testing Firestore connection...');
    const testCollection = collection(db, 'test');
    const testDoc = await addDoc(testCollection, {
      test: true,
      timestamp: new Date()
    });
    console.log('✅ Firestore write successful:', testDoc.id);
    results.firestore = true;

    // Test reading from Firestore
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firestore read successful:', snapshot.size, 'documents');
  } catch (error) {
    console.error('❌ Firestore test failed:', error);
    results.errors.push(`Firestore: ${error}`);
  }

  try {
    // Test Authentication
    console.log('Testing Authentication...');
    const userCredential = await signInAnonymously(auth);
    console.log('✅ Authentication successful:', userCredential.user.uid);
    results.auth = true;
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
    results.errors.push(`Auth: ${error}`);
  }

  try {
    // Test Storage
    console.log('Testing Storage...');
    const testBlob = new Blob(['test'], { type: 'text/plain' });
    const storageRef = ref(storage, 'test/test.txt');
    const snapshot = await uploadBytes(storageRef, testBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('✅ Storage upload successful:', downloadURL);
    results.storage = true;
  } catch (error) {
    console.error('❌ Storage test failed:', error);
    results.errors.push(`Storage: ${error}`);
  }

  return results;
} 