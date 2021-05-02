import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBRaNL0DWd8B5l-BbyjvbaQ3jZiMRR1yfI",
    authDomain: "blogapp-3119e.firebaseapp.com",
    projectId: "blogapp-3119e",
    storageBucket: "blogapp-3119e.appspot.com",
    messagingSenderId: "515499506782",
    appId: "1:515499506782:web:8a898263e57d6d344108cf"
  };
  if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}