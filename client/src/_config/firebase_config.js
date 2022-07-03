// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBUL5K9k1v8ADW9IHKW5lm8RnhbFbB7ELI",

  authDomain: "smartsheets-c9b9a.firebaseapp.com",

  projectId: "smartsheets-c9b9a",

  storageBucket: "smartsheets-c9b9a.appspot.com",

  messagingSenderId: "55562700744",

  appId: "1:55562700744:web:84775814cdf6e7670e22fd"

};

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }
// export { firebase } 
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export default auth 