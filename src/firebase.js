import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDXaQLkQbTqKFzZnNPaHvhTtlG8eHcJfX4",
  authDomain: "dummy-linkedin-78862.firebaseapp.com",
  projectId: "dummy-linkedin-78862",
  storageBucket: "dummy-linkedin-78862.appspot.com",
  messagingSenderId: "146470698594",
  appId: "1:146470698594:web:9e2f5ca685efbe44519b3b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };

export default db;
