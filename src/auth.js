// src/auth.js
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

/* =========================
   Providers
========================= */
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/* =========================
   Login Functions
========================= */

// Google 로그인
export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

// GitHub 로그인
export const loginWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
};

// 로그아웃
export const logout = () => {
    return signOut(auth);
};
