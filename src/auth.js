import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

/* 소셜 로그인 */
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

export const signInWithGithub = () =>
    signInWithPopup(auth, githubProvider);

/* 이메일 / 비밀번호 */
export const signInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

/* 로그아웃 */
export const logout = () => signOut(auth);
