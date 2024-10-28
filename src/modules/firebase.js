import { 
    getFirestore, 
    collection, 
  } from 'firebase/firestore';

  import { getAuth } from 'firebase/auth';




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEb2nEe-6JWAmCIv2Q3qaoW3aZMPsS3qk",
  authDomain: "project-management-tool-9f541.firebaseapp.com",
  projectId: "project-management-tool-9f541",
  storageBucket: "project-management-tool-9f541.appspot.com",
  messagingSenderId: "404164494263",
  appId: "1:404164494263:web:d1a181c2638ba7e0445e32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app)

// step 3.5 : Create a reference to the movies collection in Firebase
const tasksFirebaseCollectionRef = 'tasks';

const tasksCollection = collection(db, tasksFirebaseCollectionRef);


export { auth, db, tasksCollection, tasksFirebaseCollectionRef };