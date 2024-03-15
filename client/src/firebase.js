// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf5Xg9HAqUn1VueD-AVzb-D_pOexuYZos",
  authDomain: "aysemployee.firebaseapp.com",
  projectId: "aysemployee",
  storageBucket: "aysemployee.appspot.com",
  messagingSenderId: "679148125996",
  appId: "1:679148125996:web:38932a481347d20d3ef689",
  measurementId: "G-90MXBC2HGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);