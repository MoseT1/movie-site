import "./App.css";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import { useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "./CookieUtils.jsx";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const searchButton = document.getElementById("search_button");
      console.log("hello");
      if (searchButton) {
        searchButton.click();
      }
    }
  };

  return (
    <header className="header">
      <div>
        <Link to="/">
          <img className="headerlogo" src="../static/movielistlogo.png"></img>
        </Link>
        <div className="header_search">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleInput}
          ></input>
          <Link to="/search" state={{ search: searchValue }}>
            <button id="search_button">검색</button>
          </Link>
        </div>
      </div>
      <div className="header_button">
        {getCookie("accessToken") ? (
          <button
            className="logout-button"
            onClick={() => {
              deleteCookie("accessToken");
              location.reload();
            }}
          >
            로그아웃
          </button>
        ) : (
          <div>
            <Link to="/login">
              <button className="login-button">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="signup-button">회원가입</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
