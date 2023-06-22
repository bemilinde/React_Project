import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigator = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const register = async () => {
    try {
      if (registerPassword !== confirmPassword) {
        alert("입력하신 비밀번호가 일치하지 않습니다.");
        return;
      }

      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setRegisterError("");
      // Redirect to home screen or desired location after successful registration
      navigator("/login");
    } catch (error) {
      console.log(error.message);
      alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLogoClick = () => {
    navigator("/");
  };

  const handleGoBack = () => {
    navigator(-1);
  };

  return (
    <div className="login-container">
      <img
        src={process.env.PUBLIC_URL + "/img/logo.jpg"}
        alt="Logo"
        className="logo-image"
        onClick={handleLogoClick}
      />
      <div className="login-card">
        <h3 className="login-title">NEGORANI 회원 가입</h3>
        <input
          type="text"
          placeholder="NEGORANI@negorani.com"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호(6자리 이상)"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호 재입력"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="login-input"
        />
        <button onClick={register} className="login-button">
          회원 가입
        </button>
        {registerError && <div className="error-message">{registerError}</div>}
        <button className="back-button" onClick={handleGoBack}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
