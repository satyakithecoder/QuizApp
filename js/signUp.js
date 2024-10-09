const signUp = document.getElementById("sign-up")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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
const db = getDatabase(app)
const auth = getAuth(app)
const usersinDB = ref(db, "username")
signUp.addEventListener("click", function(e){
e.preventDefault()	
const email = document.getElementById("email").value
const password = document.getElementById("password").value
const username = document.getElementById("username").value	
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
	console.log(user)  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	console.log(`${errorCode}: ${errorMessage}`) 
	alert("An Error Occured while creating your account. Retrty !")  
  });
push(usersinDB, username)
username.value = " "	
})
