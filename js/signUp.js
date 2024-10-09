import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const signUp = document.getElementById("sign-up");

const firebaseConfig = {
  apiKey: "AIzaSyCLv91NoWJDg14RVehyvMvBWWfYNyCYLxs",
  authDomain: "quiz-app-d7864.firebaseapp.com",
  projectId: "quiz-app-d7864",
  storageBucket: "quiz-app-d7864.appspot.com",
  messagingSenderId: "835267412301",
  appId: "1:835267412301:web:8663ad212fa04d537a7704",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
signUp.addEventListener("click", async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  const res = await emailValidate(email);
  if (res === false) {
    console.error("Invalid email");
    alert("Not a valid email");
    return;
    
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

      try {
        const docRef = await addDoc(collection(db, "users"), {
          username: username,
          email: email
        });
        console.log("User added to Firestore with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document to Firestore: ", e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
      alert("An Error Occurred while creating your account. Please retry!");
    });

    emailInput.value = "";
    passwordInput.value = "";
    usernameInput.value = ""; 
     
   setTimeout(() => {
      alert("You will be redirected to signIn page in few seconds")
   }, 6000);
});

async function emailValidate(user) {
  try {
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=b8b945ae1a4842228155a5216491fd3c&email=${user}`);

    if (!response.ok) return false;
    const data = await response.json();

    console.log(data);
    return data.deliverability === "DELIVERABLE";

  } catch (error) {
    console.error("Email validation failed", error);
    return false;
  }
}