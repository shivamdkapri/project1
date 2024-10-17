// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrtJGXwXid1gMCjUXezmETAwG0wpZynKE",
    authDomain: "bus-ticketing-system-14bb8.firebaseapp.com",
    projectId: "bus-ticketing-system-14bb8",
    storageBucket: "bus-ticketing-system-14bb8.appspot.com",
    messagingSenderId: "139634140225",
    appId: "1:139634140225:web:1ccbf4c5fc24f5302ad2c0",
    measurementId: "G-4NQW1XZ1QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-up form submission
document.getElementById("myForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const name = document.getElementById('name').value;
    const userData = {
        emailid: email,
        name: name
    };

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('User signed up successfully!');
            const userDocRef = doc(db, "users", user.uid);
            return setDoc(userDocRef, userData);
        })
        .then(() => {
            console.log("User created and data stored successfully");
        })
        .catch((error) => {
            console.error('Error during sign up:', error.code, error.message);
            alert('Error during sign up: ' + error.message);
        });
});
