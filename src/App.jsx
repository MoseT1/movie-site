import "./App.css";
import { useState, useEffect } from "react";
import MainPage from "./MainPage.jsx";
import MovieDetails from "./MovieDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:movieID" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
//:movieid ; 경로매개변수/  ".../movie/값" 형태로 들어오면, 해당 값을 path의 ':movieid' 에 매핑해준다.
//Router : url을 설정해주기 위해 사용하는 라이브러리(도구의모음)
