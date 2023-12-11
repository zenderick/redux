import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCJkkS2fwcKwz4vGCLiCRypY6gmMXorsOo",
    authDomain: "redux-6f217.firebaseapp.com",
    projectId: "redux-6f217",
    storageBucket: "redux-6f217.appspot.com",
    messagingSenderId: "1084162796676",
    appId: "1:1084162796676:web:50948cd79e0be48d99e6d1"
  };

 firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth()
 const db = firebase.firestore()
 const storage = firebase.storage()
 
 export {auth, firebase, db, storage}