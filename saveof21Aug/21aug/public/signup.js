// Import the functions you need from the SDKs you need
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
   import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
   import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
   
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwLhOf682A-niau-16ugLm_7Z_fUHEkb0",
    authDomain: "sharemyride1-4626a.firebaseapp.com",
    projectId: "sharemyride1-4626a",
    storageBucket: "sharemyride1-4626a.appspot.com",
    messagingSenderId: "93015698035",
    appId: "1:93015698035:web:01d4276ccf69c5d56f1806",
    measurementId: "G-Z8SXZ0Y25R"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore();

// Flag to determine if it's a login action
var isLoginAction = false;


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
            localStorage.setItem('uid', user.uid);
            const userDocRef = doc(db, "users", user.uid);
            return setDoc(userDocRef, userData);
        })
        .then(() => {
            console.log("User data stored successfully");
            // Redirect to login page after successful sign-up and data storage
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('Error during sign up:', error.code, error.message);
            alert('Error during sign up: ' + error.message);
        });
});

// Login form submission
document.getElementById("myForm1").addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('User logged in successfully!');
            localStorage.setItem('uid', user.uid);
            document.getElementById("myForm1").reset();
            isLoginAction = true; // Set flag to indicate login action
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('Error during login:', error.code, error.message);
            alert('Error during login: ' + error.message);
        });
});

// Handle user authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user ) {
        // User is logged in due to login action
        console.log("User is logged in:", user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const welcomeMessage = `Welcome ${userData.name}\nEmail ID: ${userData.emailid}`;
            document.getElementById("userData").innerText = welcomeMessage;
            document.getElementById('bookm').innerHTML = `
                <div class="options">
                    <a href="book.html" class="option">
                        <div class="option-content">
                            <h2>Book Ride</h2>
                            <p>Click here to get a Lift.</p>
                        </div>
                    </a>
                    <a href="gettickets.html" class="option">
                        <div class="option-content">
                            <h2>View Riding History</h2>
                            <p>Click here to view your previous riding details.</p>
                        </div>
                    </a>
                </div>`;
        } else {
            console.log("No such document!");
        }
    } else {
        // User is logged out or it is not a login action
        console.log("No user is logged in or it's not a login action");
        localStorage.removeItem('uid');
        const loginMessage = `
            <div style="text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h2>Welcome to Share My Ride!</h2>
                <p>Please <a href="#" onclick="openModal('loginModal')">login</a> or <a href="#" onclick="openModal('signupModal')">signup</a> to book your Ride.</p>
            </div>`;
        document.getElementById("userData").innerHTML = loginMessage;
    }
});

// Logout function
window.logout = () => {
    signOut(auth).then(() => {
        console.log("User signed out");
        localStorage.removeItem('uid');  // Remove the UID from local storage
        document.getElementById("userData").innerHTML = `
            <div style="text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h2>Welcome to Share My Ride!</h2>
                <p> Together on the Road to a Greener Future</p>
                <p>Please <a href="#" onclick="openModal('loginModal')">login</a> or <a href="#" onclick="openModal('signupModal')">signup</a> to book your tickets.</p>
            </div>`;
        window.location.href = "index.html"; // Redirect to the home page
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
};
