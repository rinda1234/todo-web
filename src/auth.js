import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

export const signInWithGithub = () =>
    signInWithPopup(auth, githubProvider);

export const logout = () => signOut(auth);
