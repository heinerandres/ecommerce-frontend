import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
apiKey: "AIzaSyDiO2qTu17M0oHfQ_8z1GSihhTfRXMWQgo",
authDomain: "ecommerce-e68fa.firebaseapp.com",
projectId: "ecommerce-e68fa",
storageBucket: "ecommerce-e68fa.firebasestorage.app",
messagingSenderId: "271626081859",
appId: "1:271626081859:web:642132176cadb9f1fe66f6",
measurementId: "G-91SJZG5HQ4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();