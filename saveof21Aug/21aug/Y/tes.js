import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();   

const db = getFirestore();

const   
 handleSignup = (email, password, userData) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userDocRef = doc(db,   
 "users", user.uid);
      setDoc(userDocRef,   
 userData)
        .then(() => {
          console.log("User created and data stored successfully");
        })
        .catch((error) => {
          console.error("Error storing user data:", error);
        });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};