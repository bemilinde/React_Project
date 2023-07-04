import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";
import './authentication.css/login.css';

function Login() {

  const navigator = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState(null);

  const [googleLoginError, setGoogleLoginError] = useState("");
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);

  function handleGoogleLogin() {

    const provider = new GoogleAuthProvider();     
    setIsGoogleLoginLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserData(user); 
        navigator("/");
      })
      .catch((error) => {
        console.log(error);
        alert("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      })
      .finally(() => {
        setIsGoogleLoginLoading(false); 
      });
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoginError("");
      navigator("/");
    } catch (error) {
      console.log(error.message);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLogoClick = () => {
    navigator("/");
  };

  const handleGoBack = () => {
    navigator(-1);
  };

  return (
    <>
      <div className="login-container">
        <img
          src={process.env.PUBLIC_URL + "/img/logo.jpg"}
          alt="Logo"
          className="logo-image"
          onClick={handleLogoClick}
        />
        <div className="login-card">
          <h3 className="login-title">NEGORANI 로그인</h3>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            className="login-input"
          />

          <div className="user-info">
            <button onClick={login} className="login-button">
              로그인
            </button>
            <button
              onClick={handleGoogleLogin}
              className="google-login-button"
            >
              <FcGoogle size="22"/>  구글 로그인
            </button>
            {isGoogleLoginLoading}
            {googleLoginError && <span>{googleLoginError}</span>}
            <button
              onClick={() => navigator("/login/signup")}
              className="signup-button"
            >
              회원가입
            </button>
            <button className="back-button" onClick={handleGoBack}>
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
