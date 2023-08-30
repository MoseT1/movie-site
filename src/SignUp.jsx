import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const SIGNUP_API =
    "https://moviestates-alternative.codestates-seb.link/auth/register";
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    birth: "",
  });

  const handleInputChange = (event) => {
    let { id, value } = event.target;
    if (id === "birth") {
      value = value.replaceAll("-", "");
    }
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const PasswordCheck = (event) => {
    if (event.target.value === userData.password) {
      setIsPassword(true);
    }
  };

  const EmailCheck = (event) => {
    let email = event.target.value;

    if (email.length >= 8) {
      setIsEmail(true);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    axios
      .post(SIGNUP_API, userData, { "Content-Type": "application/json" }) //axios가 자동으로json으로 감싸주기 때문에, axios 사용할 때는 JSON으로 변환해 줄 필요가 없다.
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        alert("등록을 실패하였습니다.");
      });
  };

  return (
    <section className="signup_page">
      {/* <img src="../static/footer_img.png" /> */}
      <div className="logform">
        <div className="login">
          <div className="login-header">
            <h3>SIGN UP</h3>
            <p>Please enter your imformation for membership registration.</p>
          </div>
        </div>
        <div className="login_form">
          <label htmlFor="email">EMAIL : </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            minLength="8"
            onChange={(e) => {
              handleInputChange(e), EmailCheck(e);
            }}
          ></input>
          <div className="check">{isEmail ? "good" : "다시 입력"}</div>
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            onChange={handleInputChange}
          ></input>

          <label htmlFor="password_check">Password Check : </label>
          <input
            id="password_check"
            type="text"
            placeholder="비밀번호 확인"
            onChange={PasswordCheck}
          ></input>
          <div className="check">
            {isPassword ? "good" : "비밀번호 다시 입력"}
          </div>
          <label htmlFor="name">Name : </label>
          <input
            id="name"
            type="text"
            placeholder="이름"
            onChange={handleInputChange}
          ></input>
          <label htmlFor="birth">Birth : </label>
          <input id="birth" type="date" onChange={handleInputChange}></input>

          <label htmlFor="nickname">Nickname : </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임"
            onChange={handleInputChange}
          ></input>

          <button onClick={handleSignup}>J O I N</button>
        </div>
      </div>
    </section>
  );
}
