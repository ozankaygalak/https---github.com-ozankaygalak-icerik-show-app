import { initializeApp } from 'firebase/app';
//import { initializeAuth } from 'firebase/auth';
import { getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjNfKqyvFwKr57yrqY8k7HE8OHiPcDrt8",
  authDomain: "product-content-5e1b7.firebaseapp.com",
  projectId: "product-content-5e1b7",
  storageBucket: "product-content-5e1b7.appspot.com",
  messagingSenderId: "600401324656",
  appId: "1:600401324656:web:11c3f6a2d3faaf662de2b5",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
