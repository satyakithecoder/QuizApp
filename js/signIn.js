const signUp = document.getElementById("sign-up")
const signIn = document.getElementById("sign-in")
signUp.addEventListener("click", function(){
    window.location.href = "./signUp.html" 
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCLv91NoWJDg14RVehyvMvBWWfYNyCYLxs",
    authDomain: "quiz-app-d7864.firebaseapp.com",
    projectId: "quiz-app-d7864",
    storageBucket: "quiz-app-d7864.appspot.com",
    messagingSenderId: "835267412301",
    appId: "1:835267412301:web:8663ad212fa04d537a7704",
	databaseUrl: "https://quiz-app-d7864-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


