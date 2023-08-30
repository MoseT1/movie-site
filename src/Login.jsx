import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  "email": "kimmose98@naver.com",
//  "password": "1234abcd",
export default function Login() {
  const navigate = useNavigate();
  const LOGIN_API =
    "https://moviestates-alternative.codestates-seb.link/auth/login";
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    let { id, value } = event.target;

    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post(LOGIN_API, userData, { "Content-Type": "application/json" }) //axios가 자동으로json으로 감싸주기 때문에, axios 사용할 때는 JSON으로 변환해 줄 필요가 없다.
      .then((res) => {
        const accessToken = res.data.accessToken;

        // 쿠키에 Access 토큰 설정 (HttpOnly 설정을 통해 JavaScript에서 접근 불가능)
        document.cookie = `accessToken=${accessToken}`; //; HttpOnly; Secure

        navigate("/");
      })
      .catch((err) => {
        alert("로그인을 실패하였습니다.");
      });
  };

  return (
    <body>
      <section className="login_page">
       
        <div className="logform">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <div className="login_form">
            <label htmlFor="email"></label>
            <input
              id="email"
              type="email"
              placeholder="email"
              minLength="8"
              onChange={handleInputChange}
            ></input>
            <label htmlFor="password"> </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              onChange={handleInputChange}
            ></input>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </section>
    </body>
  );
}
