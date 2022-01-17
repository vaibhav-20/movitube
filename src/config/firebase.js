import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDpU0xKrp6OMmI4vPAgXU3cU2nSAm3W3vc',
  authDomain: 'movies-db-6edee.firebaseapp.com',
  projectId: 'movies-db-6edee',
  storageBucket: 'movies-db-6edee.appspot.com',
  messagingSenderId: '723080950804',
  appId: '1:723080950804:web:c6c9210fec869775586301',
};

initializeApp(firebaseConfig);

const authInstance = getAuth();
const firestoreInstance = getFirestore();
const storageInstance = getStorage();

export { authInstance, firestoreInstance, storageInstance };
