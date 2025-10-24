import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDud-Mep1gVuUDocBJ_Wyy_HDYfEaJIsI4",
  authDomain: "filemgt-bda6c.firebaseapp.com",
  projectId: "filemgt-bda6c",
  storageBucket: "filemgt-bda6c.firebasestorage.app",
  messagingSenderId: "313399856777",
  appId: "1:313399856777:web:016756d91312927e750058"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
