import { useState } from "react";
import "./Auth.css";
import {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
} from "../auth";

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async () => {
        setError("");
        try {
            await signInWithEmail(email, password);
        } catch {
            setError("이메일 또는 비밀번호가 올바르지 않습니다");
        }
    };

    const handleSignUp = async () => {
        setError("");
        try {
            await signUpWithEmail(email, password);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }

    };

    return (
        <div className="auth-wrapper">
            <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>

                {/* 로그인 */}
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign In</h1>

                        <div className="social-container">
                            <button
                                type="button"
                                className="social"
                                onClick={signInWithGoogle}
                            >
                                Google
                            </button>

                            <button
                                type="button"
                                className="social"
                                onClick={signInWithGithub}
                            >
                                GitHub
                            </button>
                        </div>


                        <span>or use your account</span>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="button" onClick={handleSignIn}>
                            Sign In
                        </button>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* 회원가입 */}
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>

                        <div className="social-container">
                            <button
                                type="button"
                                className="social"
                                onClick={signInWithGoogle}
                            >
                                Google
                            </button>

                            <button
                                type="button"
                                className="social"
                                onClick={signInWithGithub}
                            >
                                GitHub
                            </button>
                        </div>


                        <span>or use your email</span>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="button" onClick={handleSignUp}>
                            Sign Up
                        </button>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>

                {/* 오버레이 */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back</h1>
                            <p>Login with your personal info</p>
                            <button
                                type="button"
                                className="ghost"
                                onClick={() => setIsSignUp(false)}
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Hello</h1>
                            <p>Create an account to start planning</p>
                            <button
                                type="button"
                                className="ghost"
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
