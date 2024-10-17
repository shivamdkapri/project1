
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { collection, addDoc,getDoc,doc,setDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const uid = localStorage.getItem('uid');
const userDocRef = doc(db, "users",uid);
const userDoc = await getDoc(userDocRef);

if (userDoc.exists()) {
    const userData = userDoc.data();
    const welcomeMessage = `Welcome ${userData.name}\nEmail ID: ${userData.emailid}`;
    document.getElementById("details").innerText = welcomeMessage;
}



document.getElementById('bookingForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('pname').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;
    const bookingData = {
        Name:name,
        from: from,
        to: to,
        date: date,
      passenger: passengers,
        timestamp: new Date()
    };
    try {
      
        const ticketsRef = collection(db, "users", uid, "tickets");
        const newTicketRef = doc(ticketsRef);
        await setDoc(newTicketRef, bookingData);
        alert("Ride booked successfully!");
        console.log("Document written with ID: ", docRef.id);
       

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
alert("Ride booked succesfully.");
document.getElementById('bookingForm').reset();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log("Booking Details:\nFrom:" + from + "\nTo: " + to + "\nDate:" + date + "\nPassengers:" + passengers);
});
