const signUp = document.getElementById("sign-up");
const signIn = document.getElementById("sign-in");
const googleSignInbtn = document.getElementById("google-sign-in");
signUp.addEventListener("click", function () {
  window.location.href = "./signUp.html";
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCLv91NoWJDg14RVehyvMvBWWfYNyCYLxs",
  authDomain: "quiz-app-d7864.firebaseapp.com",
  projectId: "quiz-app-d7864",
  storageBucket: "quiz-app-d7864.appspot.com",
  messagingSenderId: "835267412301",
  appId: "1:835267412301:web:8663ad212fa04d537a7704",
  databaseUrl:
    "https://quiz-app-d7864-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
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
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("SignIn Failed");
      console.error(`${errorCode}: ${errorMessage}`);
    });
  document.getElementById("email").value = "";
});
googleSignInbtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token);
      console.log("User SignedIn. User Info:" + user);
      window.location.href = "./quiz.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
      console.error(`${errorCode}: ${errorMessage}`);
      alert("Google Sign-In Failed");
    });
});