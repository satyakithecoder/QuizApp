const signUp = document.getElementById("sign-up");
const signIn = document.getElementById("sign-in");
const googleSignInbtn = document.getElementById("google-sign-in");
var email;
signUp.addEventListener("click", function () {
  window.location.href = "./signUp.html";
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const provider = new GoogleAuthProvider();
const googleDB = getFirestore(app);
signIn.addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      window.location.href = "./quiz.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert("Sign-in failed");
      console.error(`${errorMessage}`);
    });
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

googleSignInbtn.addEventListener("click", function () {
  if (auth.currentUser) {
    window.location.href = "./quiz.html";
    return;
  }
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token);
      console.log("User Signed In. User Info:", user);

      let emailCheck = user.email;
      const displayName = user.displayName;
      const photoURL = user.photoURL;

      if (!emailCheck) {
        alert("Your Security Rules are not allowing us to access your email.");
        email = prompt("Enter Your Email:");

        if (!email) {
          alert("Email is required for signing up.");
          return;
        }
      }

      try {
        const docRef = await addDoc(collection(googleDB, "google_accounts"), {
          username: displayName,
          email: email,
          photoURL: photoURL,
        });
        console.log("User added to Firestore with ID: ", docRef.id);
      } catch (e) {
        console.error("Error in sending details", e);
      }

      window.location.href = "./quiz.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
      console.error(`${errorMessage}`);
      alert("Google Sign-In failed");
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
  } else {
    console.log(`${user} signed out`);
  }
});
