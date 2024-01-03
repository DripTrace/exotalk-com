// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC8eGJyMWXaSswMYryIf8jwbKCXVmlMVNc",
	authDomain: "exotalk-com.firebaseapp.com",
	projectId: "exotalk-com",
	storageBucket: "exotalk-com.appspot.com",
	messagingSenderId: "916186708379",
	appId: "1:916186708379:web:6b9264d5ecffd6d478093e",
	measurementId: "G-W3CR2D85FV",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };
