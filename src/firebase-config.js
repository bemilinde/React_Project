// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 코드 추가
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOEKmMMAkzD1vf9wmgkluLYrN2El_DFuQ",
  authDomain: "negorani-aa22c.firebaseapp.com",
  projectId: "negorani-aa22c",
  storageBucket: "negorani-aa22c.appspot.com",
  messagingSenderId: "565870551651",
  appId: "1:565870551651:web:2ebde45da001b19ec14e56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 코드 추가