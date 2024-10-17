// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 

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
const db = getFirestore(app);

// Function to display data on frontend
const displayData = async () => {
    console.log("working");
    const dataContainer = document.getElementById("data-container");
    const uid = localStorage.getItem('uid');
    const querySnapshot = await getDocs(collection(db, "users", uid, "tickets"));

    let htmlContent = "";
    let num = 1;

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(userData);
        htmlContent += `
            <div style="padding: 20px; border-radius: 20px; border: solid black; background-color: rgb(30, 170, 200);" class="user">
                <h3>${num}</h3>
                <p>ID: ${doc.id}</p>
                <p>Time-stamp: ${userData.date}</p>
                <p>Name: ${userData.Name}</p>
                <p>From: ${userData.from}</p>
                <p>To: ${userData.to}</p>
                <p>Date: ${userData.date}</p>
                <p>Passengers: ${userData.passenger}</p>
            </div>
        `;
        num++;
    });

    dataContainer.innerHTML = htmlContent;
};

// Call the displayData function to fetch and display data
displayData();
