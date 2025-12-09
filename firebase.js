// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBtQ2D64GMstIpclfiUxOBM28V1Kmua4I",
  authDomain: "rectification-b3454.firebaseapp.com",
  projectId: "rectification-b3454",
  storageBucket: "rectification-b3454.appspot.com",
  messagingSenderId: "491271257226",
  appId: "1:491271257226:web:36efe5001b57974aca8173"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB
export const db = getFirestore(app);
