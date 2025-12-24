import { loginWithGoogle, loginWithGithub, logout } from "./auth";

export default function Login() {
    return (
        <div style={{ padding: 24 }}>
            <h1>TODO Web</h1>
            <button onClick={loginWithGoogle}>Google로 로그인</button>
            <button onClick={loginWithGithub}>Github로 로그인</button>
            <button onClick={logout}>로그아웃</button>
        </div>
    );
}
