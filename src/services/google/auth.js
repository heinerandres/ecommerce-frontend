import { auth, provider } from "./GoogleAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";


// Registro
export const registerUser = async(email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login correo - contraseña
export const loginUser = async(email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Login google
export const loginGoogle = async() => {
  return await signInWithPopup(auth, provider);
}

// Login facebook

// Logout
export const logoutUser = async() => {
  return await signOut(auth);
};