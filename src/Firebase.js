import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ1bqaxEDQvtth9PIMYITl__SuQ_J8i3k",
  authDomain: "react-spas-c6c73.firebaseapp.com",
  databaseURL: "https://react-spas-c6c73.firebaseio.com",
  projectId: "react-spas-c6c73",
  storageBucket: "react-spas-c6c73.appspot.com",
  messagingSenderId: "72504117015",
  appId: "1:72504117015:web:4722074a6af5bd09bf1952",
  measurementId: "G-190R7X4CLF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const provider = new firebase.auth.GithubAuthProvider();
export const auth = new firebase.auth();

export default firebase;
